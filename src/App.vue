<template>
  <div class="container">
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

export default {
  name: "App",
  components: { Navbar, Header },
};
</script>

<style>
@import "./assets/css/main.css";
</style>
