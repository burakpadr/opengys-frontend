<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="advert-information-container" v-if="isVisible">
        <div class="modal-left-content">
          <div class="modal-content-header">
            <span class="text">{{ $t("realEstate.advert.list.header") }}</span>
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
                <th>{{ $t("realEstate.advert.list.advertPlace") }}</th>
                <th>{{ $t("realEstate.advert.list.advertStartDate") }}</th>
                <th>{{ $t("realEstate.advert.list.advertEndDate") }}</th>
                <th>{{ $t("realEstate.advert.list.advertAmount") }}</th>
                <th>{{ $t("realEstate.advert.list.status") }}</th>
                <th>{{ $t("realEstate.advert.list.action") }}</th>
              </tr>
              <tr v-for="(advert, index) in adverts" :key="index">
                <td>{{ advert.advertPlaceName }}</td>
                <td>{{ advert.startDate }}</td>
                <td>{{ advert.endDate }}</td>
                <td>
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(advert.price)
                  }}
                </td>
                <td v-if="advert.isPublished">
                  <Tag severity="success" :value="$t('common.published')"></Tag>
                </td>
                <td v-else>
                  <Tag severity="danger" :value="$t('common.notPublished')"></Tag>
                </td>
                <td>
                  <ConfirmPopup
                    :pt="{
                      root: { class: 'confirmPopup' },
                    }"
                  ></ConfirmPopup>
                  <i
                    class="bx bx-trash"
                    v-tooltip.top="$t('common.delete')"
                    @click="confirmDeleteAdvert($event, advert.id)"
                  ></i>
                  <i
                    @click="openUpdateEventModal(advert.id)"
                    v-tooltip.top="$t('common.edit')"
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
        </div>

        <!-- İlan Bilgisi Oluşturma -->

        <div class="modal-right-content" v-if="createModalIsVisible">
          <div>
            <div class="modal-content-header">
              <span>{{ $t('realEstate.advert.form.createFormHeader') }}</span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="advert.advertPlaceId"
                  :options="advertPlaces"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full md:w-14rem input p-invalid"
                  inputId="inputType"
                />
                <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertPlace') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="advert.startDate"
                  class="input p-invalid"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                />
                <label for="inputType" class="input"
                  >{{ $t('realEstate.advert.form.advertStartDate') }}*</label
                >
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Calendar
                  v-model="advert.endDate"
                  class="input"
                  dateFormat="dd-mm-yy"
                  showIcon
                  iconDisplay="input"
                />
                <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertEndDate') }}</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <InputNumber
                  v-model="advert.price"
                  locale="en-US"
                  :minFractionDigits="2"
                  mode="currency"
                  currency="USD"
                  class="input p-invalid"
                />
                <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertAmount') }}*</label>
              </span>
            </div>
            <div class="modal-content-row">
              <span class="p-float-label" style="margin: 0 auto">
                <Dropdown
                  v-model="advert.isPublished"
                  :options="advertStatusOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full md:w-14rem input p-invalid"
                />
                <label for="inputType" class="input">{{ $t('realEstate.advert.form.status') }}*</label>
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
        </div>

        <!-- İlan Bilgisi Güncelleme -->

        <div class="modal-right-content" v-if="updateModalIsVisible">
          <div class="modal-content-header">
            <span>{{ $t('realEstate.advert.form.updateFormHeader') }}</span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="advert.advertPlaceId"
                :options="advertPlaces"
                optionLabel="name"
                optionValue="id"
                class="w-full md:w-14rem input p-invalid"
                inputId="inputType"
              />
              <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertPlace') }}*</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Calendar
                v-model="advert.startDate"
                class="input p-invalid"
                dateFormat="dd-mm-yy"
                showIcon
                iconDisplay="input"
              />
              <label for="inputType" class="input"
                >{{ $t('realEstate.advert.form.advertStartDate') }}*</label
              >
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Calendar
                v-model="advert.endDate"
                class="input"
                dateFormat="dd-mm-yy"
                showIcon
                iconDisplay="input"
              />
              <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertEndDate') }}</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <InputNumber
                v-model="advert.price"
                locale="en-US"
                :minFractionDigits="2"
                mode="currency"
                currency="USD"
                class="input p-invalid"
              />
              <label for="inputType" class="input">{{ $t('realEstate.advert.form.advertAmount') }}*</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="advert.isPublished"
                :options="advertStatusOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full md:w-14rem input p-invalid"
              />
              <label for="inputType" class="input">{{ $t('realEstate.advert.form.status') }}*</label>
            </span>
          </div>
          <div class="modal-content-row">
            <Button
              :label="$t('common.save')"
              size="small"
              class="button"
              @click="update(advert.id)"
            />
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
  name: "AdvertInformation",
  props: {
    realEstateId: null,
  },
  components: {
    Pagination,
    ViewUsedByStaff,
  },
  data() {
    return {
      isVisible: null,
      adverts: [],
      advertPlaces: null,
      advertStatusOptions: [
        {
          value: true,
          label: this.$t("common.published"),
        },
        {
          value: false,
          label: this.$t("common.notPublished"),
        },
      ],
      advert: {
        realEstateId: null,
        advertPlaceId: null,
        startDate: null,
        endDate: null,
        price: null,
        isPublished: null,
      },
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      createModalIsVisible: true,
      updateModalIsVisible: false,
    };
  },
  methods: {
    getAdverts() {
      gysClient
        .get(
          `adverts?realEstateId=${this.realEstateId}&page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.adverts = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
    getAdvertPlaces() {
      gysClient.get(`advert-places/as-list`).then((response) => {
        this.advertPlaces = response.data;
      });
    },
    getAdvertPlace(id) {
      gysClient.get(`adverts/${id}`).then((response) => {
        this.advert = response.data;
      });
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getAdverts();
    },
    openCreateEventModal() {
      this.resetAdvert();

      this.updateModalIsVisible = false;
      this.createModalIsVisible = true;
    },
    openUpdateEventModal(id) {
      this.resetAdvert();

      this.createModalIsVisible = false;
      this.updateModalIsVisible = true;

      this.getAdvertPlace(id);
    },
    formIsValid() {
      if (!this.advert.advertPlaceId) {
        return false;
      }

      if (!this.advert.startDate) {
        return false;
      }

      if (!this.advert.price) {
        return false;
      }

      if (this.advert.isPublished == null) {
        return false;
      }

      if (this.advert.endDate && (this.advert.startDate > this.advert.endDate)) {
        const result = {
              success: false,
              message: this.$t("realEstate.advert.form.startDateCannotBeGreaterThanEndDate"),
            };

        this.$emit("updateResult", result);

        return false;
      }

      return true;
    },
    create() {
      if (this.formIsValid()) {
        let startDate = null;
        let endDate = null;

        if (this.advert.startDate) {
          startDate = new Date(this.advert.startDate.toISOString());
          startDate.setDate(startDate.getDate() + 1);
        }

        if (this.advert.endDate) {
          endDate = new Date(this.advert.endDate.toISOString());
          endDate.setDate(endDate.getDate() + 1);
        }

        const payload = {
          realEstateId: this.realEstateId,
          advertPlaceId: this.advert.advertPlaceId,
          startDate: startDate,
          endDate: endDate,
          price: this.advert.price,
          isPublished: this.advert.isPublished,
        };

        gysClient
          .post("adverts", payload)
          .then(() => {
            const result = {
              success: true,
              message: this.$t("common.recordCreated"),
            };

            this.getAdverts();
            this.resetAdvert();

            this.$emit("updateResult", result);
          })
          .catch((error) => {
            const result = {
              success: false,
              message: error.response.data.message,
            };

            this.$emit("updateResult", result);
          });
      }
    },
    update(id) {
      if (this.formIsValid()) {
        let startDate = null;
        let endDate = null;

        if (this.advert.startDate) {
          startDate = this.advert.startDate;

          if (!(typeof this.advert.startDate === "string")) {
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
        }

        if (this.advert.endDate) {
          endDate = this.advert.endDate;

          if (!(typeof this.advert.endDate === "string")) {
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
        }

        const payload = {
          advertPlaceId: this.advert.advertPlaceId,
          startDate: startDate,
          endDate: endDate,
          price: this.advert.price,
          isPublished: this.advert.isPublished,
        };

        gysClient
          .put(`adverts/${id}`, payload)
          .then(() => {
            const result = {
              success: true,
              message: this.$t("common.recordUpdated"),
            };

            this.getAdverts();

            this.$emit("updateResult", result);
          })
          .catch((error) => {
            const result = {
              success: false,
              message: error.response.data.message,
            };

            this.$emit("updateResult", result);
          });
      }
    },
    confirmDeleteAdvert(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: this.$t('common.sureToDeleteTheRecord'),
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteAdvert(id);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: this.$t("common.recordDeleted"),
            life: 3000,
          });
        },
      });
    },
    deleteAdvert(id) {
      gysClient
        .delete(`adverts/${id}`)
        .then(() => {
          this.getAdverts();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    resetAdvert() {
      this.advert = {
        realEstateId: null,
        advertPlaceId: null,
        startDate: null,
        endDate: null,
        price: null,
        isPublished: null,
      };
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getAdverts();
    this.getAdvertPlaces();
  },
};
</script>

<style>
@import "../assets/css/table.css";

.advert-information-container {
  display: flex;
  margin-top: 150px;
}

.advert-information-container .modal-left-content {
  width: 80%;
  height: 500px;
  position: relative;
  float: left;
  border-radius: 10px;
  margin-left: auto;
  overflow-y: auto;
  background: #fafafa;
}

.advert-information-container .modal-right-content {
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

.advert-information-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.advert-information-container .modal-content-header .text {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

.advert-information-container .modal-content-row {
  margin-top: 40px;
}

.advert-information-container .modal-content-row i {
  font-size: 1.4rem;
}

.advert-information-container .modal-content-row .input {
  margin-left: 20px;
  font-size: 0.85rem;
}

.advert-information-container .modal-content-row .button {
  width: 150px;
  margin-left: 20px;
  font-size: 0.85rem;
}

@media screen and (max-height: 800px) {
  .advert-information-container .modal-left-content,
  .advert-information-container .modal-right-content {
    height: 400px;
  }

  .advert-information-container {
    margin-top: 100px;
  }
}
</style>