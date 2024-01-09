<template>
  <div class="attribute-container" v-if="isVisible">
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
      </span>
      <div class="card flex justify-content-center">
        <div class="card flex justify-content-center">
          <span class="p-float-label">
            <TreeSelect
              v-model="selectedCategorizationFilter"
              :options="categorizationList"
              class="md:w-20rem w-full categorization-filter"
              @change="getAttributes"
            />
            <label>Kategorizasyon Filtresi</label>
          </span>
        </div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <tr>
          <th>Kod</th>
          <th>İsim</th>
          <th>Ekran Sırası</th>
          <th>Aksiyon</th>
        </tr>
        <tr v-for="(attirbute, index) in attributes" :key="index">
          <td data-cell="Kod">{{ attirbute.alias }}</td>
          <td data-cell="İsim">{{ attirbute.label }}</td>
          <td data-cell="Ekran Sırası">{{ attirbute.screenOrder }}</td>
          <td data-cell="Aksiyon">
            <ConfirmPopup
              :pt="{
                root: { class: 'confirmPopup' },
              }"
            ></ConfirmPopup>
            <i
              class="bx bx-trash"
              @click="confirmDeleteAttribute($event, attirbute.id)"
            ></i>
            <i
              @click="openUpdateEventModal(attirbute.id)"
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
          <span>Özellik Bilgisi</span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.alias"
              required="true"
              @input="() => attribute.alias = attribute.alias.toUpperCase()"
              :class="{ 'p-invalid': formFieldsHasError.alias }"/>
            <label class="input">Kod*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.alias"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.label"
              required="true"
              :class="{ 'p-invalid': formFieldsHasError.label }"
            />
            <label class="input">İsim*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.label"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.screenOrder"
              required="true"
              type="number"
              :class="{ 'p-invalid': formFieldsHasError.screenOrder }"
            />
            <label class="input">Ekran Sırası*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.screenOrder"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="attribute.inputType"
              :options="inputTypes"
              optionLabel="alias"
              class="w-full md:w-14rem input"
              inputId="inputType"
              :class="{ 'p-invalid': formFieldsHasError.inputType }"
            />
            <label for="inputType" class="input">Girdi Tipi*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.inputType"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="attribute.category"
              :options="categories"
              optionLabel="name"
              class="w-full md:w-14rem input"
              inputId="category"
              :class="{ 'p-invalid': formFieldsHasError.category }"
            />
            <label for="category" class="input">Kategori*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.category"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
      </div>
      <div class="modal-right-content">
        <div class="modal-content-header">
          <span>Özellik Değerleri</span>
        </div>
        <div class="modal-content-row">
          <Button
            label="Özellik Değeri Ekle"
            class="button"
            icon="pi pi-plus"
            :disabled="attribute.inputType.alias !== 'SELECT'"
            @click="addAttributeValue"
          />
        </div>
        <div
          class="modal-content-row"
          v-for="(attributeValue, index) in attribute.attributeValues"
          :key="index"
        >
          <span class="p-float-label">
            <InputText
              class="input"
              size="small"
              v-model="attribute.attributeValues[index].value"
              required="true"
            />
            <label class="input" >Değer*</label>
            <i
              class="bx bx-trash"
              style="margin-left: 15px"
              @click="deleteAttributeValue(index)"
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
          <span>Özellik Bilgisi</span>
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.alias"
              required="true"
              @input="() => attribute.alias = attribute.alias.toUpperCase()"
              :disabled="true"
              :class="{ 'p-invalid': formFieldsHasError.alias }"
            />
            <label class="input" >Kod*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.alias"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.label"
              required="true"
              :class="{ 'p-invalid': formFieldsHasError.label }"
            />
            <label class="input" >İsim*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.label"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <InputText
              class="input"
              size="small"
              v-model="attribute.screenOrder"
              required="true"
              type="number"
              :class="{ 'p-invalid': formFieldsHasError.screenOrder }"
            />
            <label class="input" >Ekran Sırası*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.screenOrder"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="attribute.inputType"
              :options="inputTypes"
              optionLabel="alias"
              class="w-full md:w-14rem input"
              inputId="inputType"
              :disabled="true"
              :class="{ 'p-invalid': formFieldsHasError.inputType }"
            />
            <label for="inputType" class="input">Girdi Tipi*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.inputType"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
        <div class="modal-content-row">
          <span class="p-float-label" style="margin: 0 auto">
            <Dropdown
              v-model="attribute.category"
              :options="categories"
              optionLabel="name"
              class="w-full md:w-14rem input"
              inputId="category"
              :disabled="true"
              :class="{ 'p-invalid': formFieldsHasError.category }"
            />
            <label for="category" class="input">Kategori*</label>
          </span>
          <small
            class="p-error input"
            id="text-error"
            v-if="formFieldsHasError.category"
            >{{ fieldErrorMessage || "&nbsp;" }}</small
          >
        </div>
      </div>
      <div class="modal-right-content">
        <div class="modal-content-header">
          <span>Özellik Değerleri</span>
        </div>
        <div class="modal-content-row">
          <Button
            label="Özellik Değeri Ekle"
            class="button"
            icon="pi pi-plus"
            :disabled="attribute.inputType.alias !== 'SELECT'"
            @click="addAttributeValue"
          />
        </div>
        <div class="modal-content-row">
          <Button
            :loading="loading"
            label="Kaydet"
            size="small"
            class="button"
            @click="update"
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

export default {
  name: "AttributeView",
  components: { Pagination, Notification },
  data() {
    return {
      isVisible: null,
      selectedCategorizationFilter: { ALL: true },
      categories: null,
      subCategories: null,
      inputTypes: null,
      categorizationList: [
        {
          key: "ALL",
          label: "Tümü",
        },
      ],
      attributes: null,
      attribute: {
        alias: "",
        label: "",
        screenOrder: null,
        inputType: "",
        category: [],
        attributeValues: [],
      },
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
      formFieldsHasError: {
        alias: false,
        label: false,
        screenOrder: false,
        inputType: false,
        category: false,
      },
      fieldErrorMessage: "Bu alan zorunludur!",
      createModalIsVisible: false,
      updateModalIsVisible: false,
      loading: false,
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    async getAttributes() {
      if (this.selectedCategorizationFilter.ALL) {
        gysClient
          .get(
            `attributes?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
          )
          .then((response) => {
            this.attributes = response.data.content;

            this.pagination.totalRecords = response.data.totalElements;
          });
      } else {
        let selectedCategorizationValues = Object.keys(
          this.selectedCategorizationFilter
        )[0].split(".");

        if (selectedCategorizationValues.length == 1) {
          gysClient
            .get(
              `attributes?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc&categoryId=${selectedCategorizationValues[0]}`
            )
            .then((response) => {
              this.attributes = response.data.content;

              this.pagination.totalRecords = response.data.totalElements;
            });
        }
      }
    },
    async getCategorizationList() {
      gysClient
        .get(`categories?page=0&size=1000&sort=id,asc`)
        .then((response) => {
          this.categories = response.data.content;

          response.data.content.forEach((category) => {
            let categorizationListItem = {
              key: category.id,
              label: category.name,
              children: [],
            };

            this.categorizationList.push(categorizationListItem);
          });
        });
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getAttributes();
    },
    getInputTypes() {
      gysClient.get("frontend/input-types").then((response) => {
        this.inputTypes = response.data;
      });
    },
    openAddEventModal() {
      this.attribute = {
        alias: "",
        label: "",
        screenOrder: null,
        inputType: "",
        category: [],
        attributeValues: [],
      };

      this.toggleCreateModal();
    },
    openUpdateEventModal(attributeId) {
      gysClient
        .get(`attributes/${attributeId}`)
        .then((response) => {
          this.attribute = response.data;

          this.toggleUpdateModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    toggleCreateModal() {
      this.createModalIsVisible = this.createModalIsVisible ? false : true;
    },
    toggleUpdateModal() {
      this.updateModalIsVisible = this.updateModalIsVisible ? false : true;
    },
    addAttributeValue() {
      this.attribute.attributeValues.push({ value: "" });
    },
    deleteAttributeValue(index) {
      this.attribute.attributeValues.splice(index, 1);
    },
    create() {
      if (!this.validateFormFields()) return;

      this.loading = true;

      const payload = {
        alias: this.attribute.alias,
        label: this.attribute.label,
        screenOrder: this.attribute.screenOrder,
        inputType: this.attribute.inputType.alias,
        categoryId: this.attribute.category.id,
        attributeValues: this.attribute.attributeValues,
      };

      gysClient
        .post("attributes", payload)
        .then(() => {
          this.toggleCreateModal();
          this.getAttributes();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Özellik oluşturuldu.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });

      this.loading = false;
    },
    update() {
      if (!this.validateFormFields()) return;

      this.loading = true;

      const payload = {
        label: this.attribute.label,
        screenOrder: this.attribute.screenOrder,
        attributeValues: this.attribute.attributeValues,
      };

      gysClient
        .put(`attributes/${this.attribute.id}`, payload)
        .then(() => {
          this.toggleUpdateModal();
          this.getAttributes();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = "Özellik güncellendi.";
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });

      this.loading = false;
    },
    confirmDeleteAttribute(event, attributeId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteAttribute(attributeId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
            life: 3000,
          });
        },
      });
    },
    deleteAttribute(attributeId) {
      gysClient
        .delete(`attributes/${attributeId}`)
        .then(() => {
          this.getAttributes();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    validateFormFields() {
      if (this.attribute.alias === "") {
        this.formFieldsHasError.alias = true;

        return false;
      } else this.formFieldsHasError.alias = false;

      if (this.attribute.label === "") {
        this.formFieldsHasError.label = true;

        return false;
      } else this.formFieldsHasError.label = false;

      if (
        this.attribute.screenOrder == null ||
        this.attribute.screenOrder === ""
      ) {
        this.formFieldsHasError.screenOrder = true;

        return false;
      } else this.formFieldsHasError.screenOrder = false;

      if (this.attribute.inputType === "") {
        this.formFieldsHasError.inputType = true;

        return false;
      } else this.formFieldsHasError.inputType = false;

      if (!Object.keys(this.attribute.category).length) {
        this.formFieldsHasError.category = true;

        return false;
      } else this.formFieldsHasError.category = false;

      return true;
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(response => this.isVisible = response.data );

    this.getAttributes();
    this.getCategorizationList();
    this.getInputTypes();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.attribute-container .categorization-filter {
  width: 250px;
  height: 40px;
  margin-right: 50px;
}

.attribute-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  display: flex;
  padding: 100px;
  backdrop-filter: blur(10px);
}

.attribute-container .modal-left-content {
  width: 370px;
  height: 570px;
  background: #fafafa;
  position: relative;
  float: left;
  border-radius: 10px;
}

.attribute-container .modal-right-content {
  width: 100%;
  height: 500px;
  background: #fafafa;
  position: relative;
  border-radius: 10px;
  margin-left: 40px;
  overflow: scroll;
  padding-bottom: 20px;
}

.attribute-container .modal .exit {
  position: absolute;
  right: 45px;
  top: 30px;
  font-size: 2.5rem;
  cursor: pointer;
}

.attribute-container .modal-content-row {
  margin-top: 40px;
}

.attribute-container .modal-right-content .modal-content-row {
  display: flex;
}

.attribute-container .modal-content-row i {
  font-size: 1.4rem;
}

.attribute-container .modal-content-row .input {
  margin-left: 20px;
  font-size: 0.85rem;
}

.attribute-container .modal-content-row .button {
  width: 200px;
  margin-left: 20px;
  font-size: 0.85rem;
}

.attribute-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.attribute-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.attribute-container .p-float-label .p-placeholder {
  opacity: 1;
  font-size: 0.88rem;
}
</style>