<template>
  <div class="header">
    <div class="right">
      <i class="bx bx-bell"></i>
      <i class="bx bx-user"></i>
    </div>
  </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style>
.header {
  width: 100%;
  height: 70px;
  position: relative;
  top: 0;
  left: 0;
  display: relative;
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

.header  i {
  font-size: 1.5rem;
  margin-right: 25px;
  color: #616161;
  cursor: pointer;
}
</style>