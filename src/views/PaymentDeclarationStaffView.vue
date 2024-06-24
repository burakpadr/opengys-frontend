<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="payment-declaration-staff-container" v-if="isVisible">
        <Notification
          :isActive="notification.isActive"
          :severity="notification.severity"
          :messageContent="notification.messageContent"
          @isActive="setVisibilityOfNotification"
        />
        <div class="header-container">
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
              <th>{{ $t('paymentManagement.paymentDeclaration.list.realEstateNo') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.invoiceType') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.invoiceDate') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.tenant') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.receipt') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.approvementStatus') }}</th>
              <th>{{ $t('paymentManagement.paymentDeclaration.list.action') }}</th>
            </tr>
            <tr
              v-for="(paymentDeclaration, index) in paymentDeclarations"
              :key="index"
            >
              <td>{{ paymentDeclaration.realEstateNo }}</td>
              <td>{{ paymentDeclaration.invoiceTypeValue }}</td>
              <td>{{ paymentDeclaration.dateOfInvoicePaid }}</td>
              <td>{{ paymentDeclaration.declarationOwnerFullName }}</td>
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
              <td data-cell="Aksiyon">
                <div
                  v-if="paymentDeclaration.approvementStatusAlias === 'WAITING'"
                >
                  <ConfirmPopup
                    :pt="{
                      root: { class: 'confirmPopup' },
                    }"
                  ></ConfirmPopup>
                  <i
                    class="pi pi-check"
                    v-tooltip.top="$t('common.approve')"
                    @click="
                      confirmToApprovePaymentDeclaration(
                        $event,
                        paymentDeclaration.id
                      )
                    "
                  ></i>
                  <i
                    @click="
                      confirmToRejectPaymentDeclaration(
                        $event,
                        paymentDeclaration.id
                      )
                    "
                    v-tooltip.top="$t('common.reject')"
                    class="pi pi-times"
                  ></i>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="paginator">
        <Pagination
          :totalRecords="pagination.totalRecords"
          @pageState="getPageState"
        />
      </div>
      <Filter
        v-if="filterIsVisible"
        @click.self="toggleFilterModal"
        :fields="filterFields"
        @filterData="filterFieldDataEmitter"
      />
    </template>
  </ViewUsedByStaff>
</template>

<script>
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";
import { gysClient } from "@/assets/js/client.js";
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { canSeeComponent } from "@/service/RbacService";
import Filter from "@/components/Filter.vue";
import { InputType } from "@/constants/InputType";

export default {
  name: "PaymentDeclarationStaffView",
  components: { Pagination, Notification, ViewUsedByStaff, Filter },
  data() {
    return {
      isVisible: true,
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
      filterIsVisible: false,
      filterFields: [
        {
          type: InputType.DROPDOWN.name,
          fieldLabel: this.$t('paymentManagement.paymentDeclaration.filter.invoiceType'),
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
          fieldLabel: this.$t('paymentManagement.paymentDeclaration.filter.approvementStatus'),
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
    confirmToRejectPaymentDeclaration(event, paymentDeclarationId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t('paymentManagement.paymentDeclaration.list.sureToReject'),
        rejectLabel: this.$t('common.no'),
        acceptLabel:this.$t('common.yes'),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.rejectPaymentDeclaration(paymentDeclarationId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: this.$t('common.rejected'),
            life: 3000,
          });
        },
      });
    },
    confirmToApprovePaymentDeclaration(event, paymentDeclarationId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t('paymentManagement.paymentDeclaration.list.sureToApprove'),
        rejectLabel: this.$t('common.no'),
        acceptLabel:this.$t('common.yes'),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.approvePaymentDeclaration(paymentDeclarationId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: this.$t('common.approved'),
            life: 3000,
          });
        },
      });
    },
    rejectPaymentDeclaration(paymentDeclarationId) {
      gysClient
        .put(`payment-declarations/${paymentDeclarationId}/reject`)
        .then(() => {
          this.getPaymentDeclarations();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    approvePaymentDeclaration(paymentDeclarationId) {
      gysClient
        .put(`payment-declarations/${paymentDeclarationId}/approve`)
        .then(() => {
          this.getPaymentDeclarations();
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
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getPaymentDeclarations();
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );
    
    this.getPaymentDeclarations();
  },
};
</script>

<style>
@import "../assets/css/table.css";
@import "../assets/css/crudHeader.css";
</style>