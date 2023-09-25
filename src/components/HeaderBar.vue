<template>
  <b-navbar type="light" class="navbar">
    <b-container>
      <b-link id="logo" class="text-white" href="/">
        <b-row>
          <b-col>
            <b-icon-people-fill class="h2"></b-icon-people-fill>
          </b-col>
          <b-col>
            <span class="h3">CRM</span>
          </b-col>
        </b-row>
      </b-link>
      <b-nav pills>
        <b-nav-item href="/">Customers</b-nav-item>
        <b-nav-item>Transactions</b-nav-item>
        <b-nav-item>Tasks</b-nav-item>
        <b-nav-item>Analytics</b-nav-item>
        <b-nav-item>Settings</b-nav-item>
      </b-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "HeaderBar",
  methods: {},
};
</script>

<style>
#logo {
  text-decoration: none;
}

span {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.navbar {
  background-color: rgb(70, 133, 233);
}

a.nav-link {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: rgb(255, 255, 255);
  font-size: large;
  font-weight: 500;
}

a.nav-link:hover {
  color: rgb(255, 255, 255);
}

a.nav-link:active {
  color: rgb(194, 214, 251);
}
</style>
