<template>
  <div class="home">
    <header-bar></header-bar>
    <data-table></data-table>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "HomeView",
  components: {
    HeaderBar,
    DataTable,
  },
};
</script>
