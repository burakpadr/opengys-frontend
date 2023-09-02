<template>
  <div class="real-estate-list-container">
    <div class="header-container">
      <Button
        icon="pi pi-plus"
        style="background-color: #3b82f6"
        size="large"
        class="add-button"
        rounded
      />
      <span class="p-input-icon-left search-bar-container">
        <i class="pi pi-search" />
        <InputText
          v-model="value1"
          size="small"
          class="search-bar"
          placeholder="Ara"
        />
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
    <div class="card real-estate-list" v-if="dataIsLoaded">
      <DataView
        :value="realEstates"
        :layout="layout"
        :pt="{
          header: { class: 'header' },
          content: { class: 'body' },
        }"
      >
        <template #header>
          <div class="flex justify-content-end">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

        <!-- List view -->

        <template #list="realEstate">
          <div class="col-12">
            <div
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
            >
              <img
                class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                :src="`https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png`"
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
                      <span
                        >{{ realEstate.data.mainStatus }} >
                        {{ realEstate.data.subStatus }}</span
                      >
                    </span>
                  </div>
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-map-marker"></i>
                      <span
                        >{{ realEstate.data.districtName }},
                        {{ realEstate.data.cityName }}</span
                      >
                    </span>
                  </div>
                </div>
                <div
                  class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                >
                  <span class="text-xl font-semibold">₺0</span>
                  <Button icon="pi pi-pencil" rounded></Button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Grid view -->

        <template #grid="realEstate">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round">
              <div
                class="flex flex-wrap align-items-center justify-content-between gap-2"
              >
                <div class="flex align-items-center gap-2">
                  <i class="bx bx-purchase-tag"></i>
                  <span
                    >{{ realEstate.data.mainStatus }} >
                    {{ realEstate.data.subStatus }}</span
                  >
                </div>
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-map-marker"></i>
                  <span
                    >{{ realEstate.data.districtName }},
                    {{ realEstate.data.cityName }}</span
                  >
                </span>
              </div>
              <div class="flex flex-column align-items-center gap-3 py-5">
                <img
                  class="w-9 shadow-2 border-round"
                  :src="`https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png`"
                />
                <div class="text-xl font-bold">{{ realEstate.data.no }}</div>
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-xl font-semibold">₺0</span>
                <Button icon="pi pi-pencil" rounded></Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>

    <!-- Skeleton view -->

    <div class="card" v-else>
        <DataView :value="realEstates" :layout="layout">
            <template #header>
                <div class="flex justify-content-end">
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>

            <template #list>
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <Skeleton class="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <Skeleton class="w-8rem border-round h-2rem" />
                                <Skeleton class="w-6rem border-round h-1rem" />
                                <div class="flex align-items-center gap-3">
                                    <Skeleton class="w-6rem border-round h-1rem" />
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <Skeleton class="w-4rem border-round h-2rem" />
                                <Skeleton shape="circle" class="w-3rem h-3rem" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid>
                <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <Skeleton class="w-6rem border-round h-2rem" />
                            <Skeleton class="w-3rem border-round h-1rem" />
                        </div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <Skeleton class="w-9 shadow-2 border-round h-10rem" />
                            <Skeleton class="w-8rem border-round h-2rem" />
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <Skeleton class="w-4rem border-round h-2rem" />
                            <Skeleton shape="circle" class="w-3rem h-3rem" />
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
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { RealEstateListService } from "@/service/RealEstateListService";
import * as NotificationConstants from "../assets/js/notificationConstants";
import { gysClient } from "@/assets/js/client.js";

export default {
  name: "RealEstateListView",
  components: { Pagination },
  data() {
    return {
      selectedStatusFilter: { ALL: true },
      statusList: null,
      realEstates: null,
      products: null,
      layout: "list",
      pagination: {
        currentPageIndex: null,
        dataSizePerPage: 10,
        totalRecords: 65,
      },
      dataIsLoaded: false
    };
  },
  methods: {
    getRealEstates() {
      gysClient
        .get(
          `real-estates?page=${this.pagination.currentPageIndex}&size=${this.pagination.dataSizePerPage}&sort=id,asc`
        )
        .then((response) => {
          this.realEstates = response.data.content;

          this.pagination.totalRecords = response.data.totalElements;
        });
    },
    getPageState(pageData) {
      this.pagination.currentPageIndex = pageData.page;
      this.pagination.dataSizePerPage = pageData.rows;
    }
  },
  mounted() {
    this.statusList = RealEstateListService.getStatusFilterData();

    this.getRealEstates();

    this.dataIsLoaded = true;
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
</style>