<template>
  <div class="login-container" v-if="!tokenIsValid">
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

import { tokenIsExist, isTokenExpired } from "./service/TokenService";

export default {
  name: "App",
  components: { Navbar, Header, LoginView },
  data() {
    return {
      tokenIsValid: null
    }
  },
  mounted() {
    if (tokenIsExist())
      this.tokenIsValid = !isTokenExpired();
    else
      this.tokenIsValid = false;
  }
};
</script>

<style>
@import "./assets/css/main.css";

.login-container {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #eff3f8;
}
</style>
