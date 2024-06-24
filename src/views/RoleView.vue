<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="role-container" v-if="isVisible">
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
            @click="toggleCreateModal"
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
              <th>{{ $t('security.role.list.roleName') }}</th>
              <th>{{ $t('common.action') }}</th>
            </tr>
            <tr v-for="(role, index) in roles" :key="index">
              <td>{{ role.label }}</td>
              <td>
                <ConfirmPopup
                  :pt="{
                    root: { class: 'confirmPopup' },
                  }"
                ></ConfirmPopup>
                <i
                  class="bx bx-trash"
                  @click="confirmDeleteRole($event, role.id)"
                ></i>
                <i
                  @click="openUpdateEventModal(role.id)"
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
          class="modal"
          v-if="createModalIsVisible"
          @click.self="toggleCreateModal"
        >
          <i class="bx bx-x exit" @click="toggleCreateModal"></i>
          <div class="modal-left-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.roleInfo.header') }}</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="role.label"
                  required="true"
                />
                <label class="input">{{ $t('security.role.form.roleInfo.name') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :label="$t('common.save')"
                size="small"
                class="button"
                @click="create()"
              />
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.page.header') }}</span>
            </div>
            <div class="table-container">
              <table>
                <tr>
                  <th>{{ $t('security.role.form.page.pageName') }}</th>
                  <th></th>
                </tr>
                <tr v-for="(uiElement, index) in uiElements" :key="index">
                  <td>{{ uiElement.label }}</td>
                  <td>
                    <Checkbox
                      v-model="role.selectedUIElements"
                      name="uiElement"
                      :value="uiElement"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.selectedPage.header') }}</span>
            </div>
            <div class="table-container">
              <table>
                <tr>
                  <th>{{ $t('security.role.form.selectedPage.pageName') }}</th>
                  <th></th>
                </tr>
                <tr
                  v-for="(uiElement, index) in role.selectedUIElements"
                  :key="index"
                >
                  <td>{{ uiElement.label }}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </form>

        <!-- Update Modal -->

        <form
          class="modal"
          v-if="updateModalIsVisible"
          @click.self="toggleUpdateModal"
        >
          <i class="bx bx-x exit" @click="toggleUpdateModal"></i>
          <div class="modal-left-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.roleInfo.header') }}</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="role.label"
                  required="true"
                />
                <label class="input">{{ $t('security.role.form.roleInfo.name') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :label="$t('common.save')"
                size="small"
                class="button"
                @click="update()"
              />
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.page.header') }}</span>
            </div>
            <div class="table-container">
              <table>
                <tr>
                  <th>{{ $t('security.role.form.page.pageName') }}</th>
                  <th></th>
                </tr>
                <tr v-for="(uiElement, index) in uiElements" :key="index">
                  <td>{{ uiElement.label }}</td>
                  <td>
                    <Checkbox
                      v-model="role.selectedUIElements"
                      name="uiElement"
                      :value="uiElement"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>{{ $t('security.role.form.selectedPage.header') }}</span>
            </div>
            <div class="table-container">
              <table>
                <tr>
                  <th>{{ $t('security.role.form.selectedPage.pageName') }}</th>
                  <th></th>
                </tr>
                <tr
                  v-for="(uiElement, index) in role.selectedUIElements"
                  :key="index"
                >
                  <td>{{ uiElement.label }}</td>
                  <td></td>
                </tr>
              </table>
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
  name: "RoleView",
  components: { Pagination, Notification, ViewUsedByStaff },
  data() {
    return {
      isVisible: null,
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
      roles: [],
      uiElements: [],
      role: {
        id: null,
        label: null,
        selectedUIElements: [],
      },
      searchTerm: "",
      createModalIsVisible: false,
      updateModalIsVisible: false,
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    getRoles() {
      if (this.searchTerm === "") {
        gysClient
          .get(
            `roles/as-page?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
          )
          .then((response) => {
            this.roles = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.search();
    },
    getUIElements() {
      gysClient.get(`ui-elements`).then((response) => {
        this.uiElements = response.data;
      });
    },
    search() {
      if (this.searchTerm !== "") {
        gysClient
          .get(
            `roles/search?searchTerm=${this.searchTerm}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}`
          )
          .then((response) => {
            this.roles = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.getRoles();
    },
    confirmDeleteRole(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t('common.sureToDeleteTheRecord'),
        rejectLabel: this.$t('common.no'),
        acceptLabel: this.$t('common.yes'),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteRole(id);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: this.$t('common.recordDeleted'),
            life: 3000,
          });
        },
      });
    },
    toggleCreateModal() {
      this.role = {
        label: null,
        selectedUIElements: [],
      };

      if (this.createModalIsVisible) this.createModalIsVisible = false;
      else {
        this.createModalIsVisible = true;

        this.getUIElements();
      }
    },
    toggleUpdateModal() {
      this.role = {
        label: null,
        selectedUIElements: [],
      };

      if (this.updateModalIsVisible) this.updateModalIsVisible = false;
      else {
        this.updateModalIsVisible = true;

        this.getUIElements();
      }
    },
    openUpdateEventModal(id) {
      gysClient.get(`roles/${id}`).then((response) => {
        this.role.id = response.data.id;
        this.role.label = response.data.label;

        gysClient.get(`role-ui-elements?roleId=${id}`).then((response) => {
          let uiElements = [];

          response.data.forEach((roleUIElement) => {
            uiElements.push(roleUIElement.uiElement);
          });

          this.role.selectedUIElements = uiElements;
        });
      });

      this.toggleUpdateModal();
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getCategories();
    },
    formIsValid() {
      if (!this.role.label) {
        return false;
      }

      return true;
    },
    create() {
      if (this.formIsValid()) {
        let selectedUIElementIds = [];

        this.role.selectedUIElements.forEach((selectedUIElement) => {
          selectedUIElementIds.push(selectedUIElement.id);
        });

        let payload = {
          role: {
            label: this.role.label,
          },
          uiElementIds: selectedUIElementIds,
        };

        gysClient
          .post("role-ui-elements", payload)
          .then(() => {
            this.toggleCreateModal();
            this.getRoles();

            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
            this.notification.messageContent = this.$t('common.recordCreated');
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
        let selectedUIElementIds = [];

        this.role.selectedUIElements.forEach((selectedUIElement) => {
          selectedUIElementIds.push(selectedUIElement.id);
        });

        let payload = {
          role: {
            label: this.role.label,
          },
          uiElementIds: selectedUIElementIds,
        };

        gysClient
          .put(`role-ui-elements?roleId=${this.role.id}`, payload)
          .then(() => {
            this.getRoles();
            this.toggleUpdateModal();

            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
            this.notification.messageContent = this.$t('common.recordUpdated');
          })
          .catch((error) => {
            this.notification.isActive = true;
            this.notification.severity = NotificationConstants.SEVERITY_ERROR;
            this.notification.messageContent = error.response.data.message;
          });
      }
    },
    deleteRole(id) {
      gysClient
        .delete(`roles/${id}`)
        .then(() => {
          this.getRoles();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getRoles();
    this.getUIElements();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.role-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  display: flex;
  padding: 100px;
}

.role-container .modal-left-content {
  width: 350px;
  height: 240px;
  background: #fafafa;
  position: relative;
  float: left;
  border-radius: 10px;
  padding: 0px 50px 0px 0px;
}

.role-container .modal-right-content {
  width: 100%;
  height: 500px;
  background: #fafafa;
  position: relative;
  border-radius: 10px;
  margin-left: 40px;
  overflow: scroll;
  padding-bottom: 20px;
}

.role-container .modal .exit {
  position: absolute;
  right: 45px;
  top: 30px;
  font-size: 2.5rem;
  cursor: pointer;
}

.role-container .modal-content-row {
  margin-top: 40px;
}

.role-container .modal-content-row i {
  font-size: 1.4rem;
}

.role-container .modal-content-row .input {
  margin-left: 20px;
  font-size: 0.85rem;
}

.role-container .modal-content-row .button {
  width: 150px;
  margin-left: 20px;
  font-size: 0.85rem;
}

.role-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.role-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.role-container .modal-right-content table th,
.role-container .modal-right-content table td {
  padding: 0.8rem 0.13rem 0.8rem 0.13rem;
  text-align: left;
  font-size: 0.95rem;
}
</style>