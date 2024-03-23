<template>
  <div class="header">
    <div class="right">
      <i class="bx bx-bell"></i>
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
                <span class="text-sm" v-if="staff.user.roleLabel != null">{{ staff.user.roleLabel }}</span>
                <span class="text-sm" v-else>Tapu Sahibi</span>
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
import { transformToTitle } from '@/util/StringUtil'
import { gysClient } from "@/assets/js/client";

export default {
  name: "Header",
  data() {
    return {
      items: [
        {
          label: "Çıkış",
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
    };
  },
  methods: {
    toggleUserOverlayPanel(event) {
      this.$refs.userOverlayPanel.toggle(event);
    },
    getUserInformation() {
      var decodedToken = parseToken();

      gysClient.get(`staffs?userId=${decodedToken.sub}`).then((response) => {
        this.staff = response.data;
      });
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
  },
  mounted() {
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