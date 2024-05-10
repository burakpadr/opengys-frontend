<template>
  <ViewUsedByStaff>
    <template #content>
      <div class="real-estate-photo-container" v-if="isVisible">
        <div class="modal-left-content">
          <div class="card">
            <FileUpload
              name="images"
              @before-send="beforeUploadImages($event)"
              @error="onImageUploadError($event)"
              @upload="afterUploadImages($event)"
              :url="baseServiceUrl + `real-estates/${this.realEstateId}/photos`"
              :multiple="true"
              accept="*"
              :maxFileSize="1000000"
              chooseLabel="Ekle"
              uploadLabel="Yükle"
              cancelLabel="İptal"
              :pt="{
                root: { class: 'file-upload' },
              }"
            >
              <template #empty>
                <p>Dosyaları yüklemek için sürükle ve bırak.</p>
              </template>
            </FileUpload>
          </div>
        </div>
        <div class="modal-right-content">
          <div class="card">
            <Galleria
              :value="images"
              :numVisible="5"
              containerStyle="max-width: 640px"
              :showThumbnails="false"
              :showIndicators="true"
              :changeItemOnIndicatorHover="false"
              :showIndicatorsOnItem="inside"
              :indicatorsPosition="position"
              :activeIndex="galleryActiveIndex"
              @update:active-index="changeGalleryActiveIndex($event)"
            >
              <template #item="slotProps">
                <div class="photo-action-container">
                  <Button
                    icon="pi pi-trash"
                    class="button"
                    v-tooltip.top="'Sil'"
                    rounded
                    @click="deletePhoto()"
                  ></Button>
                  <Button
                    icon="pi pi-image"
                    class="button"
                    v-tooltip.top="'Kapak Fotoğrafı Yap'"
                    rounded
                    @click="changeCoverPhoto()"
                  ></Button>
                </div>
                <img
                  :src="slotProps.item.path"
                  style="width: 100%; display: block"
                />
              </template>
            </Galleria>
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
  name: "RealEstatePhoto",
  components: { ViewUsedByStaff },
  props: {
    realEstateId: null,
  },
  data() {
    return {
      isVisible: null,
      images: [],
      inside: false,
      position: "right",
      baseServiceUrl: "",
      galleryActiveIndex: 0,
    };
  },
  methods: {
    getRealEstatePhotos() {
      this.images = [];

      gysClient
        .get(`real-estates/${this.realEstateId}/photos`)
        .then((response) => {
          this.images = response.data;

          this.images.forEach((image) => {
            image.path = process.env.VUE_APP_GYS_API_BASE_URL + image.path;
          });
        });
    },
    beforeUploadImages(event) {
      event.xhr.setRequestHeader(
        "Authorization",
        gysClient.defaults.headers.common["Authorization"]
      );
    },
    onImageUploadError(event) {
      const message = JSON.parse(event.xhr.responseText).message;

      const result = {
        success: false,
        message: message,
      };

      this.$emit("updateResult", result);
    },
    afterUploadImages(event) {
      this.getRealEstatePhotos();

      const result = {
        success: true,
        message: "Fotoğraflar yüklendi.",
      };

      this.$emit("updateResult", result);
    },
    deletePhoto() {
      let realEstatePhotoId = this.images[this.galleryActiveIndex].id;

      gysClient
        .delete(`real-estates/${this.realEstateId}/photos/${realEstatePhotoId}`)
        .then(() => {
          this.galleryActiveIndex = 0;

          this.getRealEstatePhotos();

          const result = {
            success: true,
            message: "Fotoğrafla silindi.",
          };

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
    changeCoverPhoto() {
      let realEstatePhotoId = this.images[this.galleryActiveIndex].id;

      gysClient
        .patch(
          `real-estates/${this.realEstateId}/change-cover-photo?coverPhotoId=${realEstatePhotoId}`
        )
        .then(() => {
          const result = {
            success: true,
            message: "Kapak fotoğrafı güncellendi.",
          };

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
    changeGalleryActiveIndex(event) {
      this.galleryActiveIndex = event;
    },
  },
  mounted() {
    canSeeComponent(this.$options.name).then(
      (response) => (this.isVisible = response.data)
    );

    this.getRealEstatePhotos();

    this.baseServiceUrl = gysClient.getUri();
  },
};
</script>

<style>
.real-estate-photo-container {
  display: flex;
  margin-top: 150px;
}

.real-estate-photo-container .modal-left-content {
  width: 500px;
  height: 400px;
  position: relative;
  float: left;
  border-radius: 10px;
  margin-left: auto;
  overflow-y: auto;
}

.real-estate-photo-container .modal-right-content {
  width: 500px;
  height: 400px;
  position: relative;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.real-estate-photo-container .modal-left-content .file-upload {
  position: absolute;
  width: 100%;
}

.photo-action-container {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(165, 165, 165, 0.485);
}

.photo-action-container .button {
  margin-top: 5px;
  margin-left: 5px;
}

@media (max-width: 1500px) {
  .real-estate-photo-container {
    margin-top: 80px;
  }
}
</style>