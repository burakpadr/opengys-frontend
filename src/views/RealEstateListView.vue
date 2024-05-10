<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="real-estate-list-container" v-if="isVisible">
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
            @click="toggleCreateModal"
            rounded
          />
          <span class="p-input-icon-left search-bar-container">
            <i class="pi pi-search" />
            <InputText size="small" class="search-bar" placeholder="Ara" />
          </span>
          <div class="card flex justify-content-center">
            <div class="card flex justify-content-center">
              <span class="p-float-label">
                <TreeSelect
                  v-model="selectedStatusFilter"
                  :options="statusList"
                  class="md:w-20rem w-full status-filter"
                />
                <label>Statü Filtresi</label>
              </span>
            </div>
          </div>
        </div>
        <div class="card real-estate-list">
          <div>
            <DataView
              :value="realEstates"
              :layout="layout"
              :pt="{
                header: { class: 'header' },
                content: { class: 'body' },
              }"
            >
              <template #header> </template>

              <!-- List view -->
              <template #list="realEstate">
                <div class="col-12">
                  <div
                    class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                  >
                    <img
                      v-if="realEstate.data.coverPhotoPath == null"
                      class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                      src="../assets/img/no-photo.jpeg"
                    />
                    <img
                      v-else
                      class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                      :src="realEstate.data.coverPhotoPath"
                    />
                    <div
                      class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                    >
                      <div
                        class="flex flex-column align-items-center sm:align-items-start gap-3"
                      >
                        <div class="text-xl font-bold text-700">
                          {{ realEstate.data.no }}
                        </div>
                        <div class="flex align-items-center gap-3">
                          <span class="flex align-items-center gap-1">
                            <i class="bx bx-purchase-tag"></i>
                            <span>{{ realEstate.data.mainStatus }}</span>
                          </span>
                        </div>
                        <div class="flex align-items-center gap-3">
                          <span class="flex align-items-center gap-2">
                            <i class="pi pi-map-marker"></i>
                            <span
                              >{{ realEstate.data.cityName }},
                              {{ realEstate.data.districtName }}</span
                            >
                          </span>
                        </div>
                      </div>
                      <div
                        class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                      >
                        <!-- <span class="text-xl font-semibold">₺0</span> -->
                        <Button
                          icon="pi pi-pencil"
                          @click="openUpdateEventModal(realEstate.data.id)"
                          rounded
                        ></Button>
                        <ConfirmPopup
                          :pt="{
                            root: { class: 'confirmPopup' },
                          }"
                        ></ConfirmPopup>
                        <Button
                          icon="pi pi-trash"
                          rounded
                          @click="
                            confirmDeleteRealEstate($event, realEstate.data.id)
                          "
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </DataView>
          </div>
        </div>
        <div class="paginator">
          <Pagination
            :totalRecords="pagination.totalRecords"
            @pageState="getPageState"
          />
        </div>

        <!-- Create Modal -->

        <div
          class="modal"
          v-if="createModalIsVisible"
          @click.self="toggleCreateModal"
        >
          <RealEstateBasicInformation
            :realEstate="basicInformationOfRealEstate"
            :isInsertAction="true"
            @createResult="handleCreateModalAction"
          />
        </div>

        <!-- Update Modal -->

        <div
          class="modal"
          v-if="updateModalIsVisible"
          @click.self="toggleUpdateModal"
        >
          <Stepper
            :options="stepperOptions"
            @stepState="changeTab"
            style="margin-top: 50px"
          />

          <RealEstateBasicInformation
            v-if="selectedTabComponentName === 'RealEstateBasicInformation'"
            :realEstate="basicInformationOfRealEstate"
            :isUpdateAction="true"
            @updateResult="handleUpdateModalAction"
          />

          <RealEstatePhoto
            v-if="selectedTabComponentName === 'RealEstatePhoto'"
            @updateResult="handleUpdateModalAction"
            :realEstateId="selectedRealEstateId"
          />

          <AdvertInformation
            v-if="selectedTabComponentName == 'AdvertInformation'"
            :realEstateId="selectedRealEstateId"
            @updateResult="handleUpdateModalAction"
          />

          <RentalContractInformation
            v-if="selectedTabComponentName == 'RentalContractInformation'"
            :realEstateId="selectedRealEstateId"
            @updateResult="handleUpdateModalAction"
          />
        </div>
      </div>
    </template>
  </ViewUsedByStaff>
</template>

<script>
import ViewUsedByStaff from "./base/ViewUsedByStaff.vue";
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import Stepper from "@/components/Stepper.vue";
import RealEstateBasicInformation from "@/views/RealEstateBasicInformation.vue";
import RealEstatePhoto from "@/views/RealEstatePhoto.vue";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";
import { FOR_RENT_TABS } from "@/assets/js/realEstateTabs";
import AdvertInformation from "@/views/AdvertInformation.vue";
import { canSeeComponent } from "@/service/RbacService";
import RentalContractInformation from "./RentalContractInformation.vue";

export default {
  name: "RealEstateListView",
  components: {
    Pagination,
    Stepper,
    RealEstateBasicInformation,
    RealEstatePhoto,
    AdvertInformation,
    Notification,
    RentalContractInformation,
    ViewUsedByStaff,
  },
  data() {
    return {
      isVisible: null,
      notification: {
        isActive: false,
        severity: "",
        messageContent: "",
      },
      selectedRealEstateId: null,
      selectedStatusFilter: { ALL: true },
      statusList: [
        {
          key: "ALL",
          label: "Tümü",
        },
      ],
      stepperOptions: {
        steps: [],
      },
      mainStatus: null,
      realEstates: [],
      basicInformationOfRealEstate: {
        id: null,
        no: null,
        mainStatus: null,
        address: {
          latitude: null,
          longitude: null,
          cityName: null,
          districtName: null,
          neighborhoodName: null,
          postCode: null,
          openAddress: null,
        },
      },
      layout: "list",
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: null,
      },
      createModalIsVisible: false,
      updateModalIsVisible: false,
      selectedTabComponentName: "RealEstateBasicInformation",
    };
  },
  methods: {
    setVisibilityOfNotification(event) {
      this.notification.isActive = event;
    },
    async getRealEstates() {
      gysClient
        .get(
          `real-estates?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          response.data.content.forEach((realEstate) => {
            if (realEstate.coverPhotoPath)
              realEstate.coverPhotoPath =
                process.env.VUE_APP_GYS_API_BASE_URL +
                realEstate.coverPhotoPath;
          });

          this.realEstates = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
    getStatusList() {
      gysClient.get("status").then((response) => {
        response.data.forEach((status) => {
          this.statusList.push({
            key: status.alias,
            label: status.value,
          });
        });
      });
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;

      this.getRealEstates();
    },
    toggleCreateModal() {
      if (this.createModalIsVisible) {
        this.createModalIsVisible = false;

        this.getRealEstates();
        this.resetModalData();
      } else {
        this.realEstates = [];
        this.createModalIsVisible = true;
      }
    },
    toggleUpdateModal() {
      if (this.updateModalIsVisible) {
        this.updateModalIsVisible = false;
        this.stepperOptions.steps = [];
        this.selectedTabComponentName = "RealEstateBasicInformation";

        this.getRealEstates();
        this.resetModalData();
      } else {
        this.realEstates = [];
        this.updateModalIsVisible = true;
      }
    },
    openUpdateEventModal(id) {
      this.selectedRealEstateId = id;

      gysClient
        .get(`real-estates/${id}`)
        .then((response) => {
          this.basicInformationOfRealEstate = response.data;

          this.setTabs();
          this.toggleUpdateModal();
        })
        .catch((error) => {
          this.notification.isActive = true;
          this.notification.severity = NotificationConstants.SEVERITY_ERROR;
          this.notification.messageContent = error.response.data.message;
        });
    },
    setTabs() {
      let mainStatusAlias = this.basicInformationOfRealEstate.mainStatus;

      if (mainStatusAlias === "FOR_RENT") {
        FOR_RENT_TABS.forEach((tab) => {
          const copyOfTab = JSON.parse(JSON.stringify(tab));

          this.stepperOptions.steps.push(copyOfTab);
        });
      } else if (mainStatusAlias === "FOR_SALE") {
      }
    },
    changeTab(tab) {
      this.selectedTabComponentName = tab.component;
    },
    resetModalData() {
      this.basicInformationOfRealEstate = {
        id: null,
        no: null,
        mainStatus: null,
        address: {
          latitude: null,
          longitude: null,
          cityName: null,
          districtName: null,
          neighborhoodName: null,
          postCode: null,
          openAddress: null,
        },
      };
    },
    handleCreateModalAction(event) {
      if (event.success) {
        this.toggleCreateModal();
        this.getRealEstates();

        this.notification.isActive = true;
        this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
        this.notification.messageContent = event.message;
      } else {
        this.notification.isActive = true;
        this.notification.severity = NotificationConstants.SEVERITY_ERROR;
        this.notification.messageContent = event.message;
      }
    },
    handleUpdateModalAction(event) {
      if (event.success) {
        this.notification.isActive = true;
        this.notification.severity = NotificationConstants.SEVERITY_SUCCESS;
        this.notification.messageContent = event.message;
      } else {
        this.notification.isActive = true;
        this.notification.severity = NotificationConstants.SEVERITY_ERROR;
        this.notification.messageContent = event.message;
      }
    },
    confirmDeleteRealEstate(event, realEstateId) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Kaydı silmek istediğinden emin misin?",
        rejectLabel: "Hayır",
        acceptLabel: "Evet",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteRealEstate(realEstateId);

          this.$toast.add({
            severity: NotificationConstants.SEVERITY_SUCCESS,
            summary: "Bildirim",
            detail: "Kayıt başarılı bir şekilde silindi.",
            life: 3000,
          });
        },
      });
    },
    deleteRealEstate(realEstateId) {
      gysClient
        .delete(`real-estates/${realEstateId}`)
        .then(() => {
          this.getRealEstates();
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

    this.getRealEstates();
    this.getStatusList();
  },
};
</script>

<style>
@import "../assets/css/crudHeader.css";

.real-estate-list-container .status-filter {
  width: 250px;
  height: 40px;
  margin-right: 50px;
}

.real-estate-list-container .p-dataview .p-dataview-header.header,
.real-estate-list-container .p-dataview .p-dataview-content.body {
  background-color: transparent;
}

.real-estate-list-container .real-estate-list {
  margin-top: 40px;
}

.real-estate-list-container .modal {
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(102, 102, 102, 0.775);
  backdrop-filter: blur(10px);
  padding: 0px 100px 100px 100px;
}
</style>