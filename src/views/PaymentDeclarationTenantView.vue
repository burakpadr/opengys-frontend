<template>
  <ViewUsedByTenant>
    <template #content>
      <div class="payment-declaration-tenant-container">
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
          <Button
            icon="pi pi-filter"
            style="background-color: #3b82f6"
            size="small"
            class="add-button"
            @click="toggleFilterModal"
            rounded
          />
        </div>
        <div class="table-container">
          <table>
            <tr>
              <th>{{ $t('tenant.paymentDeclaration.list.invoiceType') }}</th>
              <th>{{ $t('tenant.paymentDeclaration.list.invoiceDate') }}</th>
              <th>{{ $t('tenant.paymentDeclaration.list.receipt') }}</th>
              <th>{{ $t('tenant.paymentDeclaration.list.approvementStatus') }}</th>
            </tr>
            <tr
              v-for="(paymentDeclaration, index) in paymentDeclarations"
              :key="index"
            >
              <td>{{ paymentDeclaration.invoiceTypeValue }}</td>
              <td>{{ paymentDeclaration.dateOfInvoicePaid }}</td>
              <td>
                <div v-if="paymentDeclaration.receiptRelativeUrl != null">
                  <a
                    :href="paymentDeclaration.receiptRelativeUrl"
                    target="_blank"
                  >
                    <i class="bx bx-file"></i>
                  </a>
                </div>
              </td>
              <td
                v-if="paymentDeclaration.approvementStatusAlias === 'APPROVED'"
              >
                <Tag
                  severity="success"
                  :value="$t('common.approved')"
                ></Tag>
              </td>
              <td
                v-else-if="
                  paymentDeclaration.approvementStatusAlias === 'REJECTED'
                "
              >
                <Tag
                  severity="danger"
                  :value="$t('common.rejected')"
                ></Tag>
              </td>
              <td v-else>
                <Tag
                  severity="warning"
                  :value="$t('common.waiting')"
                ></Tag>
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
              <span>{{ $t('tenant.paymentDeclaration.form.header') }}</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="createPaymentDeclarationPayload.invoiceType"
                  :options="invoiceTypes"
                  optionLabel="label"
                  optionValue="alias"
                  class="w-full md:w-14rem input"
                  inputId="inputType"
                  @change="getMatchableInvoices"
                />
                <label class="input">{{ $t('tenant.paymentDeclaration.form.invoiceType') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="createPaymentDeclarationPayload.invoiceId"
                  :options="matchableInvoices"
                  optionLabel="dateOfInvoicePaid"
                  optionValue="id"
                  class="w-full md:w-14rem input"
                  inputId="inputType"
                />
                <label class="input">{{ $t('tenant.paymentDeclaration.form.invoiceDate') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <FileUpload
                  class="input"
                  :chooseLabel="$t('tenant.paymentDeclaration.form.addReceipt')"
                  mode="basic"
                  @select="onSelectReceiptFile($event)"
                />
              </span>
            </div>
            <div class="modal-content-row">
              <Button
                :label="$t('common.save')"
                size="small"
                class="button"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <Filter
        v-if="filterIsVisible"
        @click.self="toggleFilterModal"
        :fields="filterFields"
        @filterData="filterFieldDataEmitter"
      />
    </template>
  </ViewUsedByTenant>
</template>

<script>
import ViewUsedByTenant from "./base/ViewUsedByTenant.vue";
import { gysClient } from "@/assets/js/client.js";
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import Filter from "@/components/Filter.vue";
import { InputType } from "@/constants/InputType";
import * as NotificationConstants from "../assets/js/notificationConstants";

export default {
  name: "PaymentDeclarationTenant",
  components: { Pagination, ViewUsedByTenant, Notification, Filter },
  data() {
    return {
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
      paymentDeclarations: [],
      paymentDeclaration: {
        invoiceType: null,
        dateOfInvoicePaid: null,
        receipt: null,
      },
      createPaymentDeclarationPayload: {
        invoiceType: null,
        invoiceId: null,
        receipt: null,
      },
      createModalIsVisible: false,
      invoiceTypes: [{ alias: "RENT_PAYMENT", label: this.$t('enum.invoiceType.rentPayment') }],
      matchableInvoices: [],
      filterIsVisible: false,
      filterFields: [
        {
          type: InputType.DROPDOWN.name,
          fieldLabel: this.$t('tenant.paymentDeclaration.filter.invoiceType'),
          fieldName: "invoiceType",
          fieldValue: null,
          detail: {
            options: [
              {
                label: this.$t('enum.invoiceType.rentPayment'),
                value: "RENT_PAYMENT",
              },
            ],
            optionLabel: "label",
            optionalValue: "value",
          },
        },
        {
          type: InputType.DROPDOWN.name,
          fieldLabel: this.$t('tenant.paymentDeclaration.filter.approvementStatus'),
          fieldName: "approvementStatus",
          fieldValue: null,
          detail: {
            options: [
              {
                label: this.$t('enum.approvementStatus.waiting'),
                value: "WAITING",
              },
              {
                label: this.$t('enum.approvementStatus.approved'),
                value: "APPROVED",
              },
              {
                label: this.$t('enum.approvementStatus.rejected'),
                value: "REJECTED",
              },
            ],
            optionLabel: "label",
            optionalValue: "value",
          },
        },
      ],
      filterData: {},
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getPaymentDeclarations();
    },
    getPaymentDeclarations() {
      gysClient
        .post(
          `payment-declarations/find-by-filter?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`,
          this.filterData
        )
        .then((response) => {
          this.paymentDeclarations = response.data.content;

          this.paymentDeclarations.forEach((paymentDeclaration) => {
            paymentDeclaration.receiptRelativeUrl =
              process.env.VUE_APP_GYS_API_BASE_URL +
              paymentDeclaration.receiptRelativeUrl;
          });

          this.pagination.totalRecords = response.data.totalElements;
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    getMatchableInvoices() {
      const payload = {
        type: this.createPaymentDeclarationPayload.invoiceType,
      };

      gysClient
        .post("invoices/find-matchable-invoices", payload)
        .then((response) => {
          this.matchableInvoices = response.data;
        });
    },
    openAddEventModal() {
      this.createPaymentDeclarationPayload = {};

      this.toggleCreateModal();
    },
    toggleCreateModal() {
      if (this.createModalIsVisible) {
        this.createModalIsVisible = false;
      } else {
        this.createModalIsVisible = true;
      }
    },
    onSelectReceiptFile(event) {
      this.createPaymentDeclarationPayload.receipt = event.files[0];
    },
    create() {
      gysClient
        .post("payment-declarations", this.createPaymentDeclarationPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.toggleCreateModal();
          this.getPaymentDeclarations();

          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
          this.notification.messageContent = this.$t('common.recordCreated');
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    toggleFilterModal() {
      if (this.filterIsVisible) {
        this.filterIsVisible = false;
      } else {
        this.filterIsVisible = true;
      }
    },
    filterFieldDataEmitter(event) {
      this.filterData = event;

      this.toggleFilterModal();

      this.getPaymentDeclarations();
    },
  },
  mounted() {
    this.getPaymentDeclarations();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";

.payment-declaration-tenant-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  display: table;
}

.payment-declaration-tenant-container .modal-content {
  width: 350px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
  padding-bottom: 20px;
}

.payment-declaration-tenant-container .modal-content-row {
  margin-top: 30px;
}

.payment-declaration-tenant-container
  .modal-content
  .modal-content-row:nth-child(2) {
  margin-top: 40px;
}

.payment-declaration-tenant-container .modal-content-row .input,
.payment-declaration-tenant-container .modal-content-row .button {
  margin-left: 20px;
  font-size: 0.85rem;
}

.payment-declaration-tenant-container .modal-content-row .button {
  width: 100px;
}

.payment-declaration-tenant-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.payment-declaration-tenant-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.payment-declaration-tenant-container .modal .exit {
  position: absolute;
  right: 150px;
  top: 70px;
  font-size: 2.5rem;
  cursor: pointer;
}

@media (max-width: 650px) {
  .payment-declaration-tenant-container .modal .exit {
    right: 30px;
  }
}
</style>