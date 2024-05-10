<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="rent-payment-plan-information-container" v-if="isVisible">
        <div class="modal-content">
          <div class="modal-content-header">
            <span class="text">Kira Ödeme Planı</span>
          </div>
          <div class="table-container">
            <table>
              <tr>
                <th>Kira Sayısı</th>
                <th>Kira Tarihi</th>
                <th>Döviz Cinsi</th>
                <th>Kira Tutarı</th>
                <th>Dekont</th>
                <th>Durumu</th>
              </tr>
              <tr v-for="(rentInvoice, index) in rentInvoices" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ rentInvoice.dateOfInvoicePaid }}</td>
                <td>{{ rentInvoice.currencyCode }}</td>
                <td>
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: rentInvoice.currencyCode,
                    }).format(rentInvoice.amount)
                  }}
                </td>
                <td>
                  <div v-if="rentInvoice.receiptRelativeUrl != null">
                    <a :href="rentInvoice.receiptRelativeUrl" target="_blank">
                      <i class="bx bx-file"></i>
                    </a>
                  </div>
                </td>
                <td v-if="rentInvoice.isPaid">
                  <Tag severity="success" value="Ödendi"></Tag>
                </td>
                <td v-else>
                  <Tag severity="danger" value="Ödenmedi"></Tag>
                </td>
              </tr>
            </table>
          </div>
        </div>
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

export default {
  name: "RentPaymentPlanInformation",
  props: {
    rentalContractId: null,
  },
  components: {
    Pagination,
    ViewUsedByStaff,
  },
  data() {
    return {
      isVisible: true,
      rentInvoices: [],
    };
  },
  methods: {
    getRentInvoices() {
      const payload = {
        type: "RENT_PAYMENT",
        entityId: this.rentalContractId,
      };

      gysClient
        .post("invoices/find-by-filter-as-list", payload)
        .then((response) => {
          this.rentInvoices = response.data;

          this.rentInvoices.forEach((rentInvoice) => {
            if (rentInvoice.receiptRelativeUrl) {
              rentInvoice.receiptRelativeUrl =
                process.env.VUE_APP_GYS_API_BASE_URL +
                rentInvoice.receiptRelativeUrl;
            }
          });
        });
    },
  },
  mounted() {
    // canSeeComponent(this.$options.name).then(
    //   (response) => (this.isVisible = response.data)
    // );
    this.getRentInvoices();
  },
};
</script>

<style>
@import "../assets/css/table.css";

.rent-payment-plan-information-container .modal-content {
  width: 50%;
  height: 500px;
  background: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10px;
}

.rent-payment-plan-information-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.rent-payment-plan-information-container .modal-content-header .text {
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