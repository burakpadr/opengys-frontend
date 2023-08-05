<template>
  <Paginator
    :rows="10"
    :totalRecords="this.totalRecords"
    :rowsPerPageOptions="[10, 20, 30]"
    @page="getPageState($event)"
    :pt="{
      root: () => ({
        class: 'root',
      }),
    }"
  ></Paginator>
</template>

<script>
export default {
  name: "Pagination",
  props: ["totalRecords"],
  methods: {
    getPageState(pageState) {
      this.$emit("pageState", pageState);
    },
  },
};
</script>

<style>
.p-paginator.root {
  background-color: transparent;
  margin-left: 0px;
}
</style>