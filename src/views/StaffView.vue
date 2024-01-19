<template>
  <div class="staff-container" v-if="isVisible">
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
          <th>Rol</th>
          <!-- <th>Aktif</th> -->
          <th>Aksiyon</th>
        </tr>
        <tr
          v-for="(staff, index) in staffs"
          :key="index"
          :class="{
            disabled: indexOfItIsMe === index,
          }"
        >
          <td>{{ formatNameSurname(staff.user.name, staff.user.surname) }}</td>
          <td>{{ staff.user.email }}</td>
          <td>{{ staff.user.roleLabel }}</td>
          <!-- <td>
            <InputSwitch
              v-model="staff.isActive"
              @change="changeStaffActivity(index)"
            />
          </td> -->
          <td data-cell="Aksiyon">
            <div>
              <ConfirmPopup
                :pt="{
                  root: { class: 'confirmPopup' },
                }"
              ></ConfirmPopup>
              <i
                class="bx bx-trash"
                @click="confirmDeleteStaff($event, staff.id)"
              ></i>
              <i
                @click="openUpdateEventModal(staff.id)"
                class="bx bx-edit-alt"
              ></i>
            </div>
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
              class="input"
              v-model="staff.name"
              size="small"
              required="true"
            />
            <label class="input">Ad*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              v-model="staff.surname"
              size="small"
              required="true"
            />
            <label class="input">Soyad*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              v-model="staff.email"
              size="small"
              required="true"
            />
            <label class="input">E-posta*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Password
              class="input"
              v-model="staff.password"
              :feedback="false"
              :toggle-mask="true"
            />
            <label class="input">Parola*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="staff.roleId"
              :options="roles"
              optionLabel="label"
              optionValue="id"
              class="w-full md:w-14rem input"
              inputId="inputType"
            />
            <label class="input">Rol*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <Button
            :loading="loading"
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
              class="input"
              v-model="staff.name"
              size="small"
              required="true"
              :disabled="true"
            />
            <label class="input">Ad*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              v-model="staff.surname"
              size="small"
              required="true"
              :disabled="true"
            />
            <label class="input">Soyad*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              v-model="staff.email"
              size="small"
              required="true"
              :disabled="true"
            />
            <label class="input">E-posta*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="staff.roleId"
              :options="roles"
              optionLabel="label"
              optionValue="id"
              class="w-full md:w-14rem input"
              inputId="inputType"
            />
            <label class="input">Rol*</label>
          </span>
        </div>
        <div class="modal-content-row">
          <Button
            :loading="loading"
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

<script>
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";
import { canSeeComponent } from "@/service/RbacService";
import { parseToken } from "@/service/TokenService";
import { transformToTitle } from "@/util/StringUtil";

export default {
  name: "StaffView",
  components: { Pagination, Notification },
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
      staffs: [],
      roles: [],
      staff: {
        id: null,
        name: null,
        surname: null,
        email: null,
        password: null,
        roleId: null,
        isDeedOwner: null,
      },
      searchTerm: "",
      indexOfItIsMe: null,
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    openUpdateEventModal(id) {
      this.getRoles();

      gysClient
        .get(`staffs/${id}`)
        .then((response) => {
          const data = response.data;

          this.staff.id = data.id;
          this.staff.name = data.user.name;
          this.staff.surname = data.user.surname;
          this.staff.email = data.user.email;
          this.staff.roleId = data.user.roleId;
          this.staff.isDeedOwner = data.isDeedOwner;

          this.toggleUpdateModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    openAddEventModal() {
      this.staff = {};

      this.toggleCreateModal();
    },
    toggleCreateModal() {
      if (this.createModalIsVisible) {
        this.createModalIsVisible = false;
      } else {
        this.createModalIsVisible = true;

        this.getRoles();
      }
    },
    toggleUpdateModal() {
      this.updateModalIsVisible = this.updateModalIsVisible ? false : true;
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getStaffs();
    },
    getStaffs() {
      if (this.searchTerm === "") {
        return gysClient.get(
          `staffs/as-page?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        );
      } else return this.search();
    },
    getRoles() {
      gysClient.get("roles/as-list").then((response) => {
        this.roles = response.data;
      });
    },
    formatNameSurname(name, surname) {
      var surnameIsNotNull = surname != null;

      var formattedNameSurname = name + " " + (surnameIsNotNull ? surname : "");

      return transformToTitle(formattedNameSurname);
    },
    create() {
      const payload = {
        user: {
          name: this.staff.name,
          surname: this.staff.surname,
          email: this.staff.email,
          password: this.staff.password,
          roleId: this.staff.roleId,
        },
        isDeedOwner: false,
      };

      gysClient
        .post("staffs", payload)
        .then(() => {
          this.toggleCreateModal();
          this.getStaffs();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Alt kullanıcı oluşturuldu.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    update() {
      const payload = {
        user: {
          name: this.staff.name,
          surname: this.staff.surname,
          email: this.staff.email,
          roleId: this.staff.roleId,
        },
        isDeedOwner: false,
      };

      gysClient
        .put(`staffs/${this.staff.id}`, payload)
        .then(() => {
          this.toggleUpdateModal();
          this.getStaffs();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Alt kullanıcı güncellendi.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    confirmDeleteStaff(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteStaff(id);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
            life: 3000,
          });
        },
      });
    },
    deleteStaff(id) {
      gysClient
        .delete(`staffs/${id}`)
        .then(() => {
          this.getStaffs();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    changeStaffActivity(index) {
      gysClient
        .patch(
          `staffs/${this.staffs[index].id}/is-active?value=${this.staffs[index].isActive}`
        )
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    findIndexOfItIsMe(staffs) {
      const decodedToken = parseToken();

      staffs.forEach((staff, index) => {
        if (staff.user.id === Number(decodedToken.sub)) {
          this.indexOfItIsMe = index;

          return;
        }
      });
    },
    search() {
      gysClient
        .get(
          `staffs/search?searchTerm=${this.searchTerm}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.staffs = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;

          this.findIndexOfItIsMe(response.data.content);
        });
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    const staffs = this.getStaffs();

    staffs.then((response) => {
      this.staffs = response.data.content;

      this.pagination.totalRecords = response.data.totalElements;

      this.findIndexOfItIsMe(response.data.content);
    });
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.staff-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  display: table;
}

.staff-container .modal-content {
  width: 350px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  padding-bottom: 20px;
}

.staff-container .modal-content-row {
  margin-top: 30px;
}

.staff-container .modal-content .modal-content-row:nth-child(2) {
  margin-top: 40px;
}

.staff-container .modal-content-row .input,
.staff-container .modal-content-row .button {
  margin-left: 20px;
  font-size: 0.85rem;
}

.staff-container .modal-content-row .button {
  width: 100px;
}

.staff-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.staff-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.staff-container .modal .exit {
  position: absolute;
  right: 150px;
  top: 70px;
  font-size: 2.5rem;
  cursor: pointer;
}

@media (max-width: 650px) {
  .staff-container .modal .exit {
    right: 30px;
  }
}
</style>