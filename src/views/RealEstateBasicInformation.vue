<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="real-estate-basic-information-container" v-if="isVisible">
        <!-- Temel Bilgiler -->

        <div class="modal-left-content">
          <div class="modal-content-header">
            <span>Temel Bilgiler</span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.mainStatus"
                :options="mainStatusList"
                optionValue="alias"
                optionLabel="value"
                class="w-full md:w-14rem input"
                :disabled="isUpdateAction ? true : false"
              />
              <label class="input">Ana Statü*</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <InputText
                class="input"
                size="small"
                required="true"
                v-model="realEstate.no"
              />
              <label class="input">Gayrimenkul No*</label>
            </span>
          </div>
        </div>

        <!-- Adres Bilgisi -->

        <div class="modal-right-content">
          <div class="modal-content-header">
            <span>Adres Bilgisi</span>
          </div>
          <div class="modal-content-row"></div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.address.cityName"
                :options="cities"
                optionLabel="name"
                optionValue="name"
                class="w-full md:w-14rem input"
                inputId="inputType"
                @change="getDistricts"
              />
              <label for="inputType" class="input">İl*</label>
            </span>
          </div>
          <div class="modal-content-row" v-if="districts != null">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.address.districtName"
                :options="districts"
                optionLabel="name"
                optionValue="name"
                class="w-full md:w-14rem input"
                inputId="inputType"
                @change="getNeighborhoods"
              />
              <label for="inputType" class="input">İlçe*</label>
            </span>
          </div>
          <div class="modal-content-row" v-if="neighborhoods != null">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.address.neighborhoodName"
                :options="neighborhoods"
                optionLabel="name"
                optionValue="name"
                class="w-full md:w-14rem input"
                inputId="inputType"
              />
              <label for="inputType" class="input">Mahalle*</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label">
              <InputText
                class="input"
                size="small"
                required="true"
                v-model="realEstate.address.postCode"
              />
              <label class="input">Posta Kodu</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label">
              <InputText
                class="input"
                size="small"
                required="true"
                v-model="realEstate.address.latitude"
              />
              <label class="input">Enlem</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label">
              <InputText
                class="input"
                size="small"
                required="true"
                v-model="realEstate.address.longitude"
              />
              <label class="input">Boylam</label>
            </span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label">
              <Textarea
                v-model="realEstate.address.openAddress"
                class="input"
                rows="5"
                cols="30"
                required="true"
                autoResize
              />
              <label class="input">Açık Adres</label>
            </span>
          </div>
        </div>

        <!-- Ek Özellikler -->

        <div class="modal-right-content">
          <div class="modal-content-header">
            <span>Ek Özellikler</span>
          </div>
          <div class="modal-content-row">
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.categoryId"
                :options="categories"
                optionLabel="name"
                optionValue="id"
                class="w-full md:w-14rem input"
                inputId="inputType"
                @change="getSubCategories"
              />
              <label for="inputType" class="input">Kategori*</label>
            </span>
          </div>
          <div
            class="modal-content-row"
            v-if="subCategories != null && subCategories.length"
          >
            <span class="p-float-label" style="margin: 0 auto">
              <Dropdown
                v-model="realEstate.subCategoryId"
                :options="subCategories"
                optionLabel="name"
                optionValue="id"
                class="w-full md:w-14rem input"
                inputId="inputType"
              />
              <label for="inputType" class="input">Alt Kategori*</label>
            </span>
          </div>
          <div class="modal-content-row" v-if="isInsertAction">
            <Button
              label="Kaydet"
              size="small"
              class="button"
              @click="create"
              :loading="loading"
            />
          </div>
          <div class="modal-content-row" v-if="isUpdateAction">
            <Button
              label="Kaydet"
              size="small"
              class="button"
              @click="update"
              :loading="loading"
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
import { canSeeComponent } from "@/service/RbacService";

export default {
  name: "RealEstateBasicInformation",
  components: { ViewUsedByStaff },
  props: {
    realEstate: {
      type: Object,
    },
    isInsertAction: {
      type: Boolean,
      default: false,
    },
    isUpdateAction: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: null,
      loading: false,
      mainStatusList: null,
      cities: null,
      districts: null,
      neighborhoods: null,
      categories: null,
      subCategories: null,
    };
  },
  methods: {
    getMainStatusList() {
      gysClient.get("status").then((response) => {
        this.mainStatusList = response.data;
      });
    },
    getCities() {
      gysClient.get("location/cities").then((response) => {
        this.cities = response.data;
      });
    },
    getDistricts() {
      if (this.realEstate.address.cityName != null) {
        gysClient
          .get(`location/cities/${this.realEstate.address.cityName}/districts`)
          .then((response) => {
            this.neighborhoods = null;

            this.districts = response.data;
          });
      }
    },
    getNeighborhoods() {
      if (this.realEstate.address.districtName != null) {
        gysClient
          .get(
            `location/cities/${this.realEstate.address.cityName}/districts/${this.realEstate.address.districtName}/neighborhoods`
          )
          .then((response) => {
            this.neighborhoods = response.data;
          });
      }
    },
    getCategories() {
      gysClient.get("categories?size=1000").then((response) => {
        this.categories = response.data.content;
      });
    },
    getSubCategories() {
      if (this.realEstate.categoryId != null) {
        gysClient
          .get(`categories/${this.realEstate.categoryId}`)
          .then((response) => {
            this.subCategories = response.data.subCategories;
          });
      }
    },
    create() {
      this.loading = true;

      gysClient
        .post("real-estates", this.realEstate)
        .then(() => {
          const result = {
            success: true,
            message: "Gayrimenkul oluşturuldu.",
          };

          this.$emit("createResult", result);
        })
        .catch((error) => {
          const result = {
            success: false,
            message: error.response.data.message,
          };

          this.$emit("createResult", result);
        });

      this.loading = false;
    },
    update() {
      this.loading = true;

      gysClient
        .put(`real-estates/${this.realEstate.id}`, this.realEstate)
        .then(() => {
          const result = {
            success: true,
            message: "Gayrimenkul güncellendi.",
          };

          this.$emit("updateResult", result);
        })
        .catch((error) => {
          const result = {
            success: false,
            message: error.response.data.message,
          };

          this.$emit("createResult", result);
        });

      this.loading = false;
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getMainStatusList();
    this.getCities();
    this.getDistricts();
    this.getNeighborhoods();
    this.getCategories();
    this.getSubCategories();
  },
};
</script>

<style>
.real-estate-basic-information-container {
  display: flex;
  margin-top: 150px;
}

.real-estate-basic-information-container .modal-left-content {
  width: 350px;
  height: 270px;
  background: #fafafa;
  position: relative;
  float: left;
  border-radius: 10px;
  padding: 0px 50px 0px 0px;
}

.real-estate-basic-information-container .modal-right-content {
  width: 100%;
  height: 500px;
  background: #fafafa;
  position: relative;
  border-radius: 10px;
  margin-left: 40px;
  overflow: scroll;
  padding-bottom: 20px;
}

.real-estate-basic-information-container .modal-content-row {
  margin-top: 40px;
}

.real-estate-basic-information-container .modal-content-row i {
  font-size: 1.4rem;
}

.real-estate-basic-information-container .modal-content-row .input {
  margin-left: 20px;
  font-size: 0.85rem;
}

.real-estate-basic-information-container .modal-content-row .button {
  width: 150px;
  margin-left: 20px;
  font-size: 0.85rem;
}

.real-estate-basic-information-container .modal-content-header {
  margin-top: 10px;
  margin-left: 20px;
}

.real-estate-basic-information-container .modal-content-header span {
  border-bottom: 2px solid #616161;
  padding-bottom: 5px;
}

@media screen and (max-height: 800px) {
  .real-estate-basic-information-container .modal-right-content {
    height: 400px;
  }

  .real-estate-basic-information-container {
    margin-top: 100px;
  }
}
</style>