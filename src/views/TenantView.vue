<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="tenant-container" v-if="isVisible">
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
              placeholder="Ara"
              @input="search"
            />
          </span>
        </div>
        <div class="table-container">
          <table>
            <tr>
              <th>Adı Soyadı</th>
              <th>E-Posta</th>
              <th>Bağlı Gayrimenkul No</th>
              <th>Aksiyon</th>
            </tr>
            <tr v-for="(tenant, index) in tenants" :key="index">
              <td>
                {{ formatNameSurname(tenant.user.name, tenant.user.surname) }}
              </td>
              <td>{{ tenant.user.email }}</td>
              <td>{{ tenant.realEstateNo }}</td>
              <td>
                <ConfirmPopup
                  :pt="{
                    root: { class: 'confirmPopup' },
                  }"
                ></ConfirmPopup>
                <i
                  class="bx bx-trash"
                  @click="confirmDeleteTenant($event, tenant.id)"
                ></i>
                <i
                  @click="openUpdateEventModal(tenant.id)"
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

        <form
          @submit.prevent="create()"
          class="modal"
          v-if="createModalIsVisible"
          @click.self="toggleCreateModal"
        >
          <i class="bx bx-x exit" @click="toggleCreateModal"></i>
          <div class="modal-content">
            <div class="modal-content-header">
              <span>Yeni Ekle</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.name"
                  size="small"
                  required="true"
                />
                <label class="input">Ad*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.surname"
                  size="small"
                  required="true"
                />
                <label class="input">Soyad*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.email"
                  size="small"
                  required="true"
                />
                <label class="input">E-posta*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Kaydet"
                size="small"
                class="button"
                type="submit"
              />
            </div>
          </div>
        </form>

        <!-- Update Modal -->

        <form
          @submit.prevent="update()"
          class="modal"
          v-if="updateModalIsVisible"
          @click.self="toggleUpdateModal"
        >
          <i class="bx bx-x exit" @click="toggleUpdateModal"></i>
          <div class="modal-content">
            <div class="modal-content-header">
              <span>Güncelle</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.name"
                  size="small"
                  required="true"
                />
                <label class="input">Ad*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.surname"
                  size="small"
                  required="true"
                />
                <label class="input">Soyad*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  v-model="tenant.email"
                  size="small"
                  required="true"
                />
                <label class="input">E-posta*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Kaydet"
                size="small"
                class="button"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </template>
  </ViewUsedByStaff>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";
import { canSeeComponent } from "@/service/RbacService";
import { transformToTitle } from "@/util/StringUtil";
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";

export default {
  name: "TenantsView",
  components: { Pagination, Notification, ViewUsedByStaff },
  data() {
    return {
      isVisible: null,
      createModalIsVisible: false,
      updateModalIsVisible: false,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      searchTerm: "",
      tenants: [],
      tenant: {
        id: null,
        name: null,
        surname: null,
        email: null,
      },
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getCategories();
    },
    formatNameSurname(name, surname) {
      var surnameIsNotNull = surname != null;

      var formattedNameSurname = name + " " + (surnameIsNotNull ? surname : "");

      return transformToTitle(formattedNameSurname);
    },
    openAddEventModal() {
      this.tenant = {};

      this.toggleCreateModal();
    },
    toggleCreateModal() {
      if (this.createModalIsVisible) {
        this.createModalIsVisible = false;
      } else {
        this.createModalIsVisible = true;
      }
    },
    openUpdateEventModal(id) {
      gysClient
        .get(`tenants/${id}`)
        .then((response) => {
          const data = response.data;

          this.tenant.id = data.id;
          this.tenant.name = data.user.name;
          this.tenant.surname = data.user.surname;
          this.tenant.email = data.user.email;

          this.toggleUpdateModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    toggleUpdateModal() {
      this.updateModalIsVisible = this.updateModalIsVisible ? false : true;
    },
    confirmDeleteTenant(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteTenant(id);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
            life: 3000,
          });
        },
      });
    },
    deleteTenant(id) {
      gysClient
        .delete(`tenants/${id}`)
        .then(() => {
          this.getTenants();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    getTenants() {
      if (this.searchTerm === "") {
        gysClient
          .get(
            `tenants/as-page?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
          )
          .then((response) => {
            this.tenants = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.search();
    },
    formIsValid() {
      if (!this.tenant.name) {
        return false;
      }

      if (!this.tenant.surname) {
        return false;
      }

      if (!this.tenant.email) {
        return false;
      }

      return true;
    },  
    create() {
      if (this.formIsValid()) {
        const payload = {
          user: {
            name: this.tenant.name,
            surname: this.tenant.surname,
            email: this.tenant.email,
          },
        };

        gysClient
          .post("tenants", payload)
          .then(() => {
            this.toggleCreateModal();
            this.getTenants();

            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
            this.notification.messageContent = "Kiraci oluşturuldu.";
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
          const payload = {
          user: {
            name: this.tenant.name,
            surname: this.tenant.surname,
            email: this.tenant.email,
          },
        };

        gysClient
          .put(`tenants/${this.tenant.id}`, payload)
          .then(() => {
            this.toggleUpdateModal();
            this.getTenants();

            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
            this.notification.messageContent = "Alt kullanıcı güncellendi.";
          })
          .catch((error) => {
            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_ERROR;
            this.notification.messageContent = error.response.data.message;
          });
        }
    },
    search() {
      gysClient
        .get(
          `tenants/search?searchTerm=${this.searchTerm}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.tenants = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getTenants();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.tenant-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  display: table;
}

.tenant-container .modal-content {
  width: 350px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  padding-bottom: 20px;
}

.tenant-container .modal-content-row {
  margin-top: 30px;
}

.tenant-container .modal-content .modal-content-row:nth-child(2) {
  margin-top: 40px;
}

.tenant-container .modal-content-row .input,
.tenant-container .modal-content-row .button {
  margin-left: 20px;
  font-size: 0.85rem;
}

.tenant-container .modal-content-row .button {
  width: 100px;
}

.tenant-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.tenant-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.tenant-container .modal .exit {
  position: absolute;
  right: 150px;
  top: 70px;
  font-size: 2.5rem;
  cursor: pointer;
}

@media (max-width: 650px) {
  .tenant-container .modal .exit {
    right: 30px;
  }
}
</style>