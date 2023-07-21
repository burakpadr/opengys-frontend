<template>
  <div class="container">
    <Navbar/>
    <div class="main-content"></div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: { Navbar }
};
</script>

<style>
@import "./assets/css/main.css";
</style>
