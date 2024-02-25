<template>
  <div class="register-container" v-if="numberOfDeedOwner === 0">
    <RegisterView />
  </div>
  <div class="login-container" v-else-if="!tokenIsValid">
    <LoginView />
  </div>
  <div class="container" v-else>
    <Navbar />
    <div class="main-content">
      <Header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Header from "./components/Header.vue";
import LoginView from './views/LoginView.vue';
import RegisterView from "./views/RegisterView.vue";

import { tokenIsExist, isTokenExpired, removeToken } from "./service/TokenService";
import { gysClient } from "./assets/js/client";

export default {
  name: "App",
  components: { Navbar, Header, LoginView, RegisterView },
  data() {
    return {
      numberOfDeedOwner: null,
      tokenIsValid: null
    }
  },
  methods: {
    countDeedOwner() {
      gysClient.get("staffs/count-deed-owner")
      .then((response) => {
        this.numberOfDeedOwner = response.data;
      })
    }
  },
  mounted() {
    this.countDeedOwner();

    if (tokenIsExist())
      this.tokenIsValid = !isTokenExpired();
    else
      this.tokenIsValid = false;
  }
};
</script>

<style>
@import "./assets/css/main.css";

.login-container, .register-container {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #eff3f8;
}
</style>
