<template>
  <div class="header">
    <div class="right">
      <Dropdown
        v-model="selectedCountry"
        :options="countries"
        optionLabel="name"
        :placeholder="$t('header.selectLanguage')"
        class="w-full md:w-56"
        style="margin-right: 40px"
        @change="changeLocale"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <flag :iso="slotProps.value.flag" />
            <div style="margin-left: 8px">{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <flag :iso="slotProps.option.flag" />
            <div style="margin-left: 8px">{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
      <!-- <i class="bx bx-bell"></i> -->
      <i class="bx bx-user" @click="toggleUserOverlayPanel($event)"></i>
      <OverlayPanel
        ref="userOverlayPanel"
        :pt="{
          content: { class: 'overlay-panel' },
        }"
      >
        <Menu :model="items">
          <template #end>
            <button
              v-ripple
              class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
            >
              <span class="inline-flex flex-column">
                <span class="font-bold"> {{ formatNameSurname() }}</span>
                <span v-if="userHasDynamicRole" class="text-sm">{{
                  userTitle
                }}</span>
                <span class="text-sm" v-else>{{ $t(userTitle) }}</span>
              </span>
            </button>
          </template>
        </Menu>
      </OverlayPanel>
    </div>
  </div>
</template>

<script>
import { parseToken, removeToken } from "@/service/TokenService";
import { transformToTitle } from "@/util/StringUtil";
import { gysClient, refreshAcceptLanguage } from "@/assets/js/client";
import i18n from "@/i18n";

export default {
  name: "Header",
  data() {
    return {
      selectedCountry: localStorage.getItem("locale"),
      countries: [
        { name: "English", flag: "us", language: "en" },
        { name: "Türkçe", flag: "tr", language: "tr" },
      ],
      items: [
        {
          label: this.$t("header.exit"),
          icon: "pi pi-sign-out",
          command: () => {
            this.logout();
          },
        },
        {
          separator: true,
        },
      ],
      staff: null,
      home: {
        icon: "pi pi-home",
      },
      userHasDynamicRole: null,
      userTitle: null,
    };
  },
  methods: {
    toggleUserOverlayPanel(event) {
      this.$refs.userOverlayPanel.toggle(event);
    },
    getUserInformation() {
      var decodedToken = parseToken();

      if (decodedToken.isStaff) {
        gysClient.get(`staffs?userId=${decodedToken.sub}`).then((response) => {
          this.staff = response.data;

          if (response.data.user.roleLabel) {
            this.userHasDynamicRole = true;

            this.userTitle = response.data.user.roleLabel;
          } else {
            this.userHasDynamicRole = false;

            this.userTitle = "header.userTitle.landlord";
          }
        });
      } else if (decodedToken.isTenant) {
        gysClient.get(`tenants?userId=${decodedToken.sub}`).then((response) => {
          this.staff = response.data;

          this.userHasDynamicRole = false;

          this.userTitle = "header.userTitle.tenant";
        });
      }
    },
    formatNameSurname() {
      var surnameIsNotNull = this.staff.user.surname != null;

      var formattedNameSurname =
        this.staff.user.name +
        " " +
        (surnameIsNotNull ? this.staff.user.surname : "");

      return transformToTitle(formattedNameSurname);
    },
    logout() {
      removeToken();

      window.location.href = "/";
    },
    changeLocale() {
      localStorage.setItem("locale", this.selectedCountry.language);

      i18n.global.locale.value = this.selectedCountry.language;

      refreshAcceptLanguage();
    }
  },
  mounted() {
    this.selectedCountry = this.countries.find(c => c.language === localStorage.getItem('locale'))

    this.getUserInformation();
  },
};
</script>

<style>
.header {
  width: 100%;
  height: 70px;
  position: relative;
  top: 0;
  left: 0;
  background-color: #eff3f8;
}

.header .right {
  float: right;
  position: relative;
  top: 0%;
  right: 0;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.header i {
  font-size: 1.5rem;
  margin-right: 25px;
  color: #616161;
  cursor: pointer;
}
</style>