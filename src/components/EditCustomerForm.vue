<template>
  <b-container>
    <form @submit.prevent="submit()">
      <b-form-group
        class="mb-4 pr-2"
        label="Company Name"
        label-class="font-weight-bold"
      >
        <b-form-input v-model="customer.company_name" :state="companyNameState">
        </b-form-input>
      </b-form-group>
      <b-form-group
        class="mb-2 pr-2"
        label="Customer Name"
        label-class="font-weight-bold"
      >
        <b-form-group label="First Name">
          <b-form-input v-model="customer.contact_firstname"></b-form-input>
        </b-form-group>
        <b-form-group label="Last Name">
          <b-form-input
            v-model="customer.contact_lastname"
            :state="lastNameState"
          ></b-form-input>
        </b-form-group>
      </b-form-group>
      <b-form-group
        class="mb-4 pr-2"
        label="Contact E-mail"
        label-class="font-weight-bold"
      >
        <b-form-input v-model="customer.contact_email"></b-form-input>
      </b-form-group>
      <b-form-group
        class="mb-4 pr-4"
        label="Acquired On"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="date"
          v-model="customer.acquired_on"
          :state="emailState"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="mb-4 pr-2"
        label="Customer status"
        label-class="font-weight-bold"
      >
        <b-form-checkbox
          value="active"
          unchecked-value="inactive"
          v-model="customer.customer_status"
          >Set status as active</b-form-checkbox
        >
      </b-form-group>
      <b-form-group>
        <b-button class="mr-2" type="submit" variant="success">Update</b-button>
        <b-button @click="hideModal">Cancel</b-button>
      </b-form-group>
    </form>
  </b-container>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EditCustomerForm",
  props: {
    customerId: Number,
  },
  mounted() {
    this.getCustomerById();
  },
  computed: {
    companyNameState() {
      return !this.$v.customer.company_name.$invalid ? null : false;
    },
    lastNameState() {
      return !this.$v.customer.contact_lastname.$invalid ? null : false;
    },
    emailState() {
      return !this.$v.customer.contact_email.$invalid ? null : false;
    },
  },
  data() {
    return {
      submitStatus: null,
      customer: {},
      status: [{ text: "Set status as active", value: "active" }],
    };
  },
  validations: {
    customer: {
      company_name: {
        required,
      },
      contact_lastname: {
        required,
      },
      contact_email: {
        required,
      },
    },
  },
  methods: {
    getCustomerById() {
      axios
        .get(
          `https://my-json-server.typicode.com/agoodi/vue-table-example/customers/${this.customerId}`
        )
        .then((response) => {
          console.log(response);
          this.customer = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submit() {
      this.$v.customer.$touch();
      if (this.$v.customer.$error) {
        this.submitStatus = "ERROR";
      } else {
        this.updateCustomer();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    updateCustomer() {
      axios
        .put(
          `https://my-json-server.typicode.com/agoodi/vue-table-example/customers/${this.customerId}`,
          this.customer
        )
        .then((response) => {
          this.$emit("hideEditCustomer");
          this.$emit("getCustomerData");
          this.confirmingMessageUpdateCustomer();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    confirmingMessageUpdateCustomer() {
      this.$root.$bvToast.toast(`The customer has been updated`, {
        autoHideDelay: 5000,
        noCloseButton: true,
        variant: "info",
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
    hideModal() {
      this.$emit("hideEditCustomer");
    },
  },
};
</script>

<style>
.validation_error {
  color: red;
}
</style>
