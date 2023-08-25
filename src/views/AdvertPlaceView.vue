<template>
  <div class="advert-place-container">
    <Notification
      :isActive="notification.isActive"
      :severity="notification.severity"
      :messageContent="notification.messageContent"
      @isActive="setVisibilityOfNotification"
    />
    <CrudHeader @addButtonClicked="openAddEventModal" />
    <div class="table-container">
      <table>
        <tr>
          <th>İlan Yeri</th>
          <th>Aksiyon</th>
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
    <form class="modal" v-if="modalIsVisible" @click.self="toggleModal">
      <i class="bx bx-x exit" @click="toggleModal"></i>
      <div class="modal-content">
        <div class="modal-content-header">
          <span>{{ modalHeader }}</span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              v-model="advertPlace.name"
              size="small"
              required="true"
            />
            <label class="input" for="İlan Yeri*">İlan Yeri*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <Button
            :loading="loading"
            label="Kaydet"
            size="small"
            class="button"
            @click="submitForm"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import CrudHeader from "@/components/CrudHeader.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";

export default {
  name: "AdvertPlaceView",
  components: { Pagination, CrudHeader, Notification },
  data() {
    return {
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
      this.modalHeader = "Yeni Ekle";
      this.modalName = "CREATE";

      this.advertPlace = {};

      this.toggleModal();
    },
    openUpdateEventModal(advertPlaceId) {
      this.modalHeader = "Güncelle";
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
      gysClient
        .get(
          `advert-places?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.advertPlaces = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
    submitForm() {
      this.loading = true;

      if (this.modalName === "CREATE") this.create();
      else if (this.modalName === "UPDATE") this.update();

      this.loading = false;
    },
    create() {
      gysClient
        .post("advert-places", this.advertPlace)
        .then(() => {
          this.toggleModal();
          this.getAdvertPlaces();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "İlan yeri oluşturuldu.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    update() {
      gysClient
        .put(`advert-places/${this.advertPlace.id}`, this.advertPlace)
        .then(() => {
          this.toggleModal();
          this.getAdvertPlaces();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "İlan yeri güncellendi.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    confirmDeleteAdvertPlace(event, advertPlaceId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteAdvertPlace(advertPlaceId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
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
  },
  mounted() {
    this.getAdvertPlaces();
  },
};
</script>

<style>
@import "../assets/css/table.css";

.advert-place-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
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