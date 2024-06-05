<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="category-container" v-if="isVisible">
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
              <th>Kategori Adı</th>
              <th>Aksiyon</th>
            </tr>
            <tr v-for="(category, index) in categories" :key="index">
              <td data-cell="Kategori Adı">{{ category.name }}</td>
              <td data-cell="Aksiyon">
                <ConfirmPopup
                  :pt="{
                    root: { class: 'confirmPopup' },
                  }"
                ></ConfirmPopup>
                <i
                  class="bx bx-trash"
                  @click="confirmDeleteCategory($event, category.id)"
                ></i>
                <i
                  @click="openUpdateEventModal(category.id)"
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
              <span>Kategori Bilgisi</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="category.name"
                  required="true"
                />
                <label class="input" for="Kategori Adı*">Kategori Adı*</label>
              </span>
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>Alt Kategori Bilgisi</span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Alt Kategori Ekle"
                size="small"
                class="button"
                icon="pi pi-plus"
                @click="addSubCategory"
              />
            </div>
            <div
              class="modal-content-row"
              v-for="(subCategory, index) in category.subCategories"
              :key="index"
            >
              <span class="p-float-label">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="category.subCategories[index].name"
                  required="true"
                />
                <label class="input" for="Alt Kategori Adı*"
                  >Alt Kategori Adı*</label
                >
                <i
                  class="bx bx-trash"
                  style="margin-left: 15px"
                  @click="deleteSubCategory(index)"
                ></i>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :loading="loading"
                label="Kaydet"
                size="small"
                class="button"
                @click="create"
              />
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
              <span>Kategori Bilgisi</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="category.name"
                  required="true"
                />
                <label class="input" for="Kategori Adı*">Kategori Adı*</label>
              </span>
            </div>
          </div>
          <div class="modal-right-content">
            <div class="modal-content-header">
              <span>Alt Kategori Bilgisi</span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Alt Kategori Ekle"
                size="small"
                class="button"
                icon="pi pi-plus"
                @click="addSubCategory"
              />
            </div>
            <div
              class="modal-content-row"
              v-for="(subCategory, index) in category.subCategories"
              :key="index"
            >
              <span class="p-float-label">
                <InputText
                  class="input p-invalid"
                  size="small"
                  v-model="category.subCategories[index].name"
                  required="true"
                />
                <label class="input" for="Alt Kategori Adı*"
                  >Alt Kategori Adı*</label
                >
                <i
                  class="bx bx-trash"
                  style="margin-left: 15px"
                  @click="deleteSubCategory(index)"
                ></i>
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :loading="loading"
                label="Güncelle"
                size="small"
                class="button"
                @click="update"
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
  name: "CategoryView",
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
      createModalIsVisible: false,
      updateModalIsVisible: false,
      categories: [],
      category: {
        name: "",
        subCategories: [],
      },
      loading: false,
      searchTerm: "",
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    getCategories() {
      if (this.searchTerm === "") {
        gysClient
          .get(
            `categories?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
          )
          .then((response) => {
            this.categories = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.search();
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getCategories();
    },
    toggleCreateModal() {
      this.createModalIsVisible = this.createModalIsVisible ? false : true;
    },
    toggleUpdateModal() {
      this.updateModalIsVisible = this.updateModalIsVisible ? false : true;
    },
    openAddEventModal() {
      this.category = {
        name: "",
        subCategories: [],
      };

      this.toggleCreateModal();
    },
    openUpdateEventModal(id) {
      gysClient
        .get(`categories/${id}`)
        .then((response) => {
          this.category = response.data;

          this.toggleUpdateModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    create() {
      this.loading = true;

      gysClient
        .post("categories", this.category)
        .then(() => {
          this.toggleCreateModal();
          this.getCategories();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Kategori oluşturuldu.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });

      this.loading = false;
    },
    update() {
      this.loading = true;

      gysClient
        .put(`categories/${this.category.id}`, this.category)
        .then(() => {
          this.toggleUpdateModal();
          this.getCategories();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Kategori güncellendi.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });

      this.loading = false;
    },
    addSubCategory() {
      this.category.subCategories.push({ name: "" });
    },
    deleteSubCategory(index) {
      this.category.subCategories.splice(index, 1);
    },
    deleteCategory(categoryId) {
      gysClient
        .delete(`categories/${categoryId}`)
        .then(() => {
          this.getCategories();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    confirmDeleteCategory(event, categoryId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteCategory(categoryId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
            life: 3000,
          });
        },
      });
    },
    search() {
      if (this.searchTerm !== "") {
        gysClient
          .get(
            `categories/search?search=${this.searchTerm}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}`
          )
          .then((response) => {
            this.categories = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else this.getCategories();
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getCategories();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.category-container .modal {
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

.category-container .modal-left-content {
  width: 350px;
  height: 180px;
  background: #fafafa;
  position: relative;
  float: left;
  border-radius: 10px;
}

.category-container .modal-right-content {
  width: 100%;
  height: 500px;
  background: #fafafa;
  position: relative;
  border-radius: 10px;
  margin-left: 40px;
  overflow: scroll;
  padding-bottom: 20px;
}

.category-container .modal .exit {
  position: absolute;
  right: 45px;
  top: 30px;
  font-size: 2.5rem;
  cursor: pointer;
}

.category-container .modal-content-row {
  margin-top: 40px;
}

.category-container .modal-right-content .modal-content-row {
  display: flex;
}

.category-container .modal-content-row i {
  font-size: 1.4rem;
}

.category-container .modal-content-row .input {
  margin-left: 20px;
  font-size: 0.85rem;
}

.category-container .modal-content-row .chips {
  width: 90%;
  margin-left: 20px;
}

.category-container .modal-content-row .button {
  width: 150px;
  margin-left: 20px;
  font-size: 0.85rem;
}

.category-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.category-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}
</style>