<template>
  <div class="about">
    <header-bar></header-bar>
    <transactions-table></transactions-table>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import TransactionsTable from "@/components/TransactionsTable.vue";

export default {
  name: "HomeView",
  components: {
    HeaderBar,
    TransactionsTable,
  },
};
</script>
