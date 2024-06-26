<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="advert-place-container" v-if="isVisible">
        <Notification
          :isActive="notification.isActive"
          :severity="notification.severity"
          :messageContent="notification.messageContent"
          @isActive="setVisibilityOfNotification"
        />
        <div class="header-container">
          <Button
            icon="pi pi-plus"
            style="background-color: #3b82f6"
            size="large"
            class="add-button"
            rounded
            @click="openAddEventModal"
          />
          <span class="p-input-icon-left search-bar-container">
            <i class="pi pi-search" />
            <InputText
              v-model="searchTerm"
              size="small"
              class="search-bar"
              :placeholder="$t('common.search')"
              @input="search"
            />
          </span>
        </div>
        <div class="table-container">
          <table>
            <tr>
              <th>{{ $t("systemDefinition.advertPlace.list.name") }}</th>
              <th>{{ $t("systemDefinition.advertPlace.list.action") }}</th>
            </tr>
            <tr v-for="(advertPlace, index) in advertPlaces" :key="index">
              <td data-cell="İlan Yeri">{{ advertPlace.name }}</td>
              <td data-cell="Aksiyon">
                <ConfirmPopup
                  :pt="{
                    root: { class: 'confirmPopup' },
                  }"
                ></ConfirmPopup>
                <i
                  class="bx bx-trash"
                  @click="confirmDeleteAdvertPlace($event, advertPlace.id)"
                ></i>
                <i
                  @click="openUpdateEventModal(advertPlace.id)"
                  class="bx bx-edit-alt"
                ></i>
              </td>
            </tr>
          </table>
        </div>
        <div class="paginator">
          <Pagination
            :totalRecords="pagination.totalRecords"
            @pageState="getPageState"
          />
        </div>

        <!-- Create Modal -->

        <form class="modal" v-if="modalIsVisible" @click.self="toggleModal">
          <i class="bx bx-x exit" @click="toggleModal"></i>
          <div class="modal-content">
            <div class="modal-content-header">
              <span>{{ modalHeader }}</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="advertPlace.name"
                  size="small"
                  required="true"
                />
                <label class="input" for="İlan Yeri*">{{ $t("systemDefinition.advertPlace.form.name") }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :loading="loading"
                :label="$t('common.save')"
                size="small"
                class="button"
                @click="submitForm"
              />
            </div>
          </div>
        </form>
      </div>
    </template>
  </ViewUsedByStaff>
</template>

<script>
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";
import { canSeeComponent } from "@/service/RbacService";

export default {
  name: "AdvertPlaceView",
  components: { Pagination, Notification, ViewUsedByStaff },
  data() {
    return {
      isVisible: null,
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      modalIsVisible: false,
      modalHeader: "",
      modalName: "",
      loading: false,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
      advertPlace: {
        id: null,
        name: null,
      },
      advertPlaces: [],
      searchTerm: "",
    };
  },
  methods: {
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getAdvertPlaces();
    },
    toggleModal() {
      this.modalIsVisible = this.modalIsVisible ? false : true;
    },
    openAddEventModal() {
      this.modalHeader = this.$t("systemDefinition.advertPlace.form.createHeader");
      this.modalName = "CREATE";

      this.advertPlace = {};

      this.toggleModal();
    },
    openUpdateEventModal(advertPlaceId) {
      this.modalHeader = this.$t("systemDefinition.advertPlace.form.updateHeader");
      this.modalName = "UPDATE";

      gysClient
        .get(`advert-places/${advertPlaceId}`)
        .then((response) => {
          this.advertPlace = response.data;

          this.toggleModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    getAdvertPlaces() {
      if (this.searchTerm === "") {
        gysClient
          .get(
            `advert-places?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
          )
          .then((response) => {
            this.advertPlaces = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.search();
    },
    submitForm() {
      this.loading = true;

      if (this.modalName === "CREATE") this.create();
      else if (this.modalName === "UPDATE") this.update();

      this.loading = false;
    },
    formIsValid() {
      if (!this.advertPlace.name) {
        return false;
      }

      return true;
    },
    create() {
      if (this.formIsValid()) {
        gysClient
        .post("advert-places", this.advertPlace)
        .then(() => {
          this.toggleModal();
          this.getAdvertPlaces();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = this.$t("common.recordCreated");
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
      }
    },
    update() {
      if (this.formIsValid()) {
        gysClient
        .put(`advert-places/${this.advertPlace.id}`, this.advertPlace)
        .then(() => {
          this.toggleModal();
          this.getAdvertPlaces();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = this.$t("common.recordUpdated");
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
      }
    },
    confirmDeleteAdvertPlace(event, advertPlaceId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t("common.sureToDeleteTheRecord"),
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteAdvertPlace(advertPlaceId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: this.$t("common.recordDeleted"),
            life: 3000,
          });
        },
      });
    },
    deleteAdvertPlace(advertPlaceId) {
      gysClient
        .delete(`advert-places/${advertPlaceId}`)
        .then(() => {
          this.getAdvertPlaces();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    search() {
      if (this.searchTerm !== "") {
        gysClient
          .get(
            `advert-places/search?search=${this.searchTerm}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}`
          )
          .then((response) => {
            this.advertPlaces = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.getAdvertPlaces();
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getAdvertPlaces();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.advert-place-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  display: table;
}

.advert-place-container .modal-content {
  width: 350px;
  height: 220px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
}

.advert-place-container .modal-content-row {
  margin-top: 30px;
}

.advert-place-container .modal-content .modal-content-row:nth-child(2) {
  margin-top: 40px;
}

.advert-place-container .modal-content-row .input,
.advert-place-container .modal-content-row .button {
  margin-left: 20px;
  font-size: 0.85rem;
}

.advert-place-container .modal-content-row .button {
  width: 100px;
  position: absolute;
  bottom: 20px;
}

.advert-place-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.advert-place-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.advert-place-container .modal .exit {
  position: absolute;
  right: 150px;
  top: 70px;
  font-size: 2.5rem;
  cursor: pointer;
}

@media (max-width: 650px) {
  .advert-place-container .modal .exit {
    right: 30px;
  }
}
</style>