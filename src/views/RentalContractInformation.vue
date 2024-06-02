<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="rental-contract-information-container" v-if="isVisible">
        <div class="modal-left-content">
          <div class="modal-content-header">
            <span class="text">Sözleşme Listesi</span>
            <Button
              icon="pi pi-plus"
              style="background-color: #3b82f6; position: absolute; right: 20px"
              size="large"
              :disabled="createModalIsVisible"
              rounded
              @click="openCreateEventModal()"
            />
          </div>
          <div class="table-container">
            <table>
              <tr>
                <th>Kiracının Adı Soyadı</th>
                <th>Sözleşme Başlangıç T.</th>
                <th>Sözleşme Bitiş T.</th>
                <th>Sözleşme</th>
                <th>Durumu</th>
                <th>Aksiyon</th>
              </tr>
              <tr
                v-for="(rentalContract, index) in rentalContracts"
                :key="index"
              >
                <td>{{ rentalContract.tenantFullName }}</td>
                <td>{{ rentalContract.startDate }}</td>
                <td>{{ rentalContract.endDate }}</td>
                <td>
                  <div
                    v-if="rentalContract.rentalContractFileRelativeUrl != null"
                  >
                    <a
                      :href="rentalContract.rentalContractFileRelativeUrl"
                      target="_blank"
                    >
                      <i class="bx bx-file"></i>
                    </a>
                  </div>
                </td>
                <td v-if="rentalContract.isPublished">
                  <Tag severity="success" value="Yayında"></Tag>
                </td>
                <td v-else>
                  <Tag severity="danger" value="Yayında Değil"></Tag>
                </td>
                <td>
                  <ConfirmPopup
                    :pt="{
                      root: { class: 'confirmPopup' },
                    }"
                  ></ConfirmPopup>
                  <i
                    @click="openUpdateEventModal(rentalContract.id)"
                    v-tooltip.top="'Düzenle'"
                    class="bx bx-edit-alt"
                  ></i>
                  <i
                    @click="openRentPaymentInvoiceModal(rentalContract.id)"
                    v-tooltip.top="'Kira Ödeme Planı'"
                    class="bx bx-receipt"
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
        </div>

        <!-- Sözleşme Bilgisi Oluşturma -->

        <form
          @submit.prevent="create"
          class="modal-right-content"
          v-if="createModalIsVisible"
        >
          <div>
            <div class="modal-content-header">
              <span>Sözleşme Oluştur</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="rentalContract.tenantId"
                  :options="availableTenants"
                  optionLabel="user.fullName"
                  optionValue="id"
                  class="w-full md:w-14rem input"
                  inputId="inputType"
                />
                <label for="inputType" class="input">Kiracı*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="rentalContract.startDate"
                  class="input"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                />
                <label for="inputType" class="input"
                  >Sözleşme Başlangıç Tarihi*</label
                >
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="rentalContract.endDate"
                  class="input"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                />
                <label for="inputType" class="input"
                  >Sözleşme Bitiş Tarihi*</label
                >
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputNumber
                  v-model="rentalContract.rentalPaymentDay"
                  :useGrouping="false"
                  :max="31"
                  :min="1"
                  class="input"
                />
                <label for="inputType" class="input">Kira Günü*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputNumber
                  v-model="rentalContract.monthlyRentFee"
                  locale="en-US"
                  :minFractionDigits="2"
                  mode="currency"
                  currency="USD"
                  class="input"
                />
                <label for="inputType" class="input">Aylık Kira Bedeli*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="rentalContract.isPublished"
                  :options="rentalContractStatusOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full md:w-14rem input"
                />
                <label for="inputType" class="input">Durumu*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <FileUpload
                  class="input"
                  chooseLabel="Kira Sözleşmesi Ekle"
                  mode="basic"
                  @select="onSelectRentalContractFile($event)"
                />
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Kaydet"
                type="submit"
                size="small"
                class="button"
              />
            </div>
          </div>
        </form>

        <!-- Sözleşme Bilgisi Güncelleme -->

        <form
          @submit.prevent="update(rentalContract.id)"
          class="modal-right-content"
          v-if="updateModalIsVisible"
        >
          <div>
            <div class="modal-content-header">
              <span>Sözleşme Güncelle</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputText
                  v-model="rentalContract.tenantFullName"
                  class="input"
                  :disabled="true"
                />
                <label for="inputType" class="input">Kiracı*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="rentalContract.startDate"
                  class="input"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                  :disabled="!rentalContract.isUpdatable"
                />
                <label for="inputType" class="input"
                  >Sözleşme Başlangıç Tarihi*</label
                >
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="rentalContract.endDate"
                  class="input"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                  :disabled="!rentalContract.isUpdatable"
                />
                <label for="inputType" class="input"
                  >Sözleşme Bitiş Tarihi*</label
                >
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputNumber
                  v-model="rentalContract.rentalPaymentDay"
                  :useGrouping="false"
                  :max="31"
                  :min="1"
                  class="input"
                  :disabled="!rentalContract.isUpdatable"
                />
                <label for="inputType" class="input">Kira Günü*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputNumber
                  v-model="rentalContract.monthlyRentFee"
                  locale="en-US"
                  :minFractionDigits="2"
                  mode="currency"
                  currency="USD"
                  class="input"
                  :disabled="!rentalContract.isUpdatable"
                />
                <label for="inputType" class="input">Aylık Kira Bedeli*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="rentalContract.isPublished"
                  :options="rentalContractStatusOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full md:w-14rem input"
                  :disabled="!rentalContract.isUpdatable"
                />
                <label for="inputType" class="input">Durumu*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto; display: flex">
                <Button
                  label="Kira Sözleşmesini Görüntüle"
                  icon="pi pi-eye"
                  class="button"
                  @click="openRentalContractInNewTab"
                  v-if="rentalContract.rentalContractFileRelativeUrl != null"
                />
                <FileUpload
                  class="input"
                  chooseLabel="Kira Sözleşmesini Güncelle"
                  mode="basic"
                  @select="onSelectRentalContractFile($event)"
                  :disabled="!rentalContract.isUpdatable"
                />
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                label="Kaydet"
                type="submit"
                size="small"
                class="button"
                :disabled="!rentalContract.isUpdatable"
              />
            </div>
          </div>
        </form>
      </div>
      <div
        class="modal"
        v-if="selectedRentalContractId != null"
        @click.self="closeRentPaymentPlanInformationModal"
      >
        <RentPaymentPlanInformation
          :rentalContractId="selectedRentalContractId"
        />
      </div>
    </template>
  </ViewUsedByStaff>
</template>

<script>
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";
import { gysClient } from "@/assets/js/client.js";
import Pagination from "@/components/Pagination.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { canSeeComponent } from "@/service/RbacService";
import RentPaymentPlanInformation from "./RentPaymentPlanInformation.vue";

export default {
  name: "RentalContractInformation",
  props: {
    realEstateId: null,
  },
  components: {
    Pagination,
    RentPaymentPlanInformation,
    ViewUsedByStaff,
  },
  data() {
    return {
      isVisible: null,
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      createModalIsVisible: true,
      updateModalIsVisible: false,
      rentalContracts: [],
      availableTenants: [],
      rentalContract: {
        id: null,
        tenantId: null,
        realEstateId: null,
        isPublished: false,
        monthlyRentFee: null,
        currencyCodeOfRentFee: null,
        rentalPaymentDay: null,
        startDate: null,
        endDate: null,
        rentalContractFile: null,
      },
      selectedRentalContractId: null,
      rentalContractStatusOptions: [
        {
          value: true,
          label: "Yayında",
        },
        {
          value: false,
          label: "Yayında Değil",
        },
      ],
    };
  },
  methods: {
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getRentalContracts();
    },
    getRentalContracts() {
      gysClient
        .get(
          `rental-contracts?realEstateId=${this.realEstateId}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.rentalContracts = response.data.content;

          this.rentalContracts.forEach((rentalContract) => {
            rentalContract.rentalContractFileRelativeUrl =
              process.env.VUE_APP_GYS_API_BASE_URL +
              rentalContract.rentalContractFileRelativeUrl;
          });

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
    getAvailableTenants() {
      gysClient.get("tenants/does-not-have-contract").then((response) => {
        this.availableTenants = response.data;
      });
    },
    onSelectRentalContractFile(event) {
      this.rentalContract.rentalContractFile = event.files[0];
    },
    create() {
      let startDate = new Date(this.rentalContract.startDate.toISOString());
      let endDate = new Date(this.rentalContract.endDate.toISOString());

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

      const payload = {
        monthlyRentFee: this.rentalContract.monthlyRentFee,
        rentalPaymentDay: this.rentalContract.rentalPaymentDay,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        isPublished: this.rentalContract.isPublished,
        realEstateId: this.realEstateId,
        tenantId: this.rentalContract.tenantId,
        rentalContractFile: this.rentalContract.rentalContractFile,
      };

      gysClient
        .post("rental-contracts", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          const result = {
            success: true,
            message: "Sözleşme oluşturuldu.",
          };

          this.getRentalContracts();
          this.getAvailableTenants();
          this.resetRentalContract();

          this.$emit("updateResult", result);
        })
        .catch((error) => {
          const result = {
            success: false,
            message: error.response.data.message,
          };

          this.$emit("updateResult", result);
        });
    },
    resetRentalContract() {
      this.rentalContract = {
        id: null,
        tenantId: null,
        realEstateId: null,
        isPublished: false,
        monthlyRentFee: null,
        rentalPaymentDay: null,
        startDate: null,
        endDate: null,
        rentalContractFile: null,
      };
    },
    openCreateEventModal() {
      this.resetRentalContract();

      this.updateModalIsVisible = false;
      this.createModalIsVisible = true;
    },
    openUpdateEventModal(id) {
      this.resetRentalContract();

      this.createModalIsVisible = false;
      this.updateModalIsVisible = true;

      this.getRentalContract(id);
    },
    openRentPaymentInvoiceModal(id) {
      this.selectedRentalContractId = id;
    },
    getRentalContract(id) {
      gysClient.get(`rental-contracts/${id}`).then((response) => {
        this.rentalContract = response.data;

        this.rentalContract.rentalContractFileRelativeUrl =
          process.env.VUE_APP_GYS_API_BASE_URL +
          this.rentalContract.rentalContractFileRelativeUrl;
      });
    },
    openRentalContractInNewTab() {
      window.open(this.rentalContract.rentalContractFileRelativeUrl, "_blank");
    },
    update(id) {
      let startDate = this.rentalContract.startDate;
      let endDate = this.rentalContract.endDate;

      if (!(typeof this.rentalContract.startDate === "string")) {
        startDate = new Date(startDate.toISOString());
        startDate.setDate(startDate.getDate() + 1);
      } else {
        var startDateStrSplitted = startDate.split("-");

        startDate = new Date(
          startDateStrSplitted[2],
          startDateStrSplitted[1] - 1,
          startDateStrSplitted[0]
        );

        startDate.setDate(startDate.getDate() + 1);
      }

      if (!(typeof this.rentalContract.endDate === "string")) {
        endDate = new Date(endDate.toISOString());
        endDate.setDate(endDate.getDate() + 1);
      } else {
        var endDateDateStrSplitted = endDate.split("-");

        endDate = new Date(
          endDateDateStrSplitted[2],
          endDateDateStrSplitted[1] - 1,
          endDateDateStrSplitted[0]
        );

        endDate.setDate(endDate.getDate() + 1);
      }
      const payload = {
        monthlyRentFee: this.rentalContract.monthlyRentFee,
        rentalPaymentDay: this.rentalContract.rentalPaymentDay,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        isPublished: this.rentalContract.isPublished,
        rentalContractFile: this.rentalContract.rentalContractFile,
      };

      gysClient
        .put(`rental-contracts/${id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          const result = {
            success: true,
            message: "Kira sözleşmesi kaydı güncellendi.",
          };

          this.getRentalContracts();
          this.getAvailableTenants();
          this.getRentalContract(id);

          this.$emit("updateResult", result);
        })
        .catch((error) => {
          const result = {
            success: false,
            message: error.response.data.message,
          };

          this.$emit("updateResult", result);
        });
    },
    closeRentPaymentPlanInformationModal() {
      this.selectedRentalContractId = null;
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getRentalContracts();
    this.getAvailableTenants();
  },
};
</script>

<style>
@import "../assets/css/table.css";

.rental-contract-information-container {
  display: flex;
  margin-top: 150px;
}

.rental-contract-information-container .modal-left-content {
  width: 80%;
  height: 500px;
  position: relative;
  float: left;
  border-radius: 10px;
  margin-left: auto;
  overflow-y: auto;
  background: #fafafa;
}

.rental-contract-information-container .modal-right-content {
  width: 50%;
  height: 500px;
  position: relative;
  border-radius: 10px;
  margin-left: 80px;
  margin-right: auto;
  overflow-y: auto;
  padding-bottom: 50px;
  background: #fafafa;
}

.rental-contract-information-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.rental-contract-information-container .modal-content-header .text {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.rental-contract-information-container .modal-content-row {
  margin-top: 40px;
}

.rental-contract-information-container .modal-content-row i {
  font-size: 1.4rem;
}

.rental-contract-information-container .modal-content-row .input,
.deneme {
  margin-left: 20px;
  font-size: 0.85rem;
}

.rental-contract-information-container .modal-content-row .button {
  width: 150px;
  margin-left: 20px;
  font-size: 0.85rem;
}

@media screen and (max-height: 800px) {
  .rental-contract-information-container .modal-left-content,
  .rental-contract-information-container .modal-right-content {
    height: 400px;
  }

  .rental-contract-information-container {
    margin-top: 100px;
  }
}
</style>