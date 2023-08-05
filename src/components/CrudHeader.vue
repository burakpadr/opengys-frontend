<template>
  <div class="header-container">
    <Button
      icon="pi pi-plus"
      style="background-color: #3b82f6"
      size="large"
      class="add-button"
      rounded
      @click="triggerAddButtonClickEvent"
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
  </div>
</template>

<script>
export default {
  name: "CrudHeader",
  methods: {
    triggerAddButtonClickEvent() {
      this.$emit("addButtonClicked", true);
    }
  }
};
</script>

<style>
.header-container {
  width: 100%;
  margin-top: 50px;
  display: flex;
}

.add-button {
  margin-left: 50px;
}

.search-bar-container {
  margin: 0 auto;
}

.search-bar {
  width: 300px;
  background: transparent;
}

@media (max-width: 1220px) {
  .add-button {
    margin-left: 20px;
  }

  @media (max-width: 650px) {
    .search-bar {
        width: 150px;
    }
  }
}
</style>