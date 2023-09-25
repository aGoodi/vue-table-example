<template>
  <b-container>
    <form @submit.prevent="submit()">
      <b-row class="mb-4 pr-2">
        <label><b>Company Name</b></label>
        <b-input-group>
          <b-form-input
            label="Company Name"
            v-model="customer.company_name"
            :state="companyNameState"
            placeholder="Dunder Mifflin"
          >
          </b-form-input>
        </b-input-group>
        <b-row>
          <span class="validation_error" v-if="$v.customer.company_name.$error">
            Field is required
          </span>
        </b-row>
      </b-row>
      <b-row class="mb-4 pr-2">
        <b>Customer Name</b>
        <label>First Name</label>
        <b-input-group>
          <b-form-input
            aria-label="First Name"
            placeholder="Jim"
            v-model="customer.contact_firstname"
          ></b-form-input>
        </b-input-group>
        <label>Last Name</label>
        <b-input-group>
          <b-form-input
            v-model="customer.contact_lastname"
            :state="lastNameState"
            placeholder="Halpert"
          ></b-form-input>
        </b-input-group>
        <b-row>
          <span
            class="validation_error"
            v-if="$v.customer.contact_lastname.$error"
          >
            Field is required
          </span>
        </b-row>
      </b-row>
      <b-row class="mb-4 pr-2">
        <label><b>Contact E-mail</b></label>
        <b-input-group>
          <b-form-input
            v-model="customer.contact_email"
            :state="emailState"
            placeholder="name@example.com"
          ></b-form-input>
        </b-input-group>
        <b-row>
          <span
            class="validation_error"
            v-if="$v.customer.contact_email.$error"
          >
            Field is required
          </span>
        </b-row>
      </b-row>
      <b-row class="mb-4 pr-4">
        <label><b>Acquired On</b></label>
        <b-input-group>
          <b-form-input
            type="date"
            v-model="customer.acquired_on"
          ></b-form-input>
        </b-input-group>
      </b-row>
      <b-row class="mb-4 pr-2">
        <b-form-group>
          <label><b>Customer status</b></label>
          <b-form-checkbox
            value="active"
            unchecked-value="inactive"
            v-model="customer.customer_status"
          >
            Set status as active
          </b-form-checkbox>
        </b-form-group>
      </b-row>
      <b-row>
        <b-button class="mr-2" type="submit" variant="success">Add</b-button>
        <b-button @click="hideModal">Cancel</b-button>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  computed: {
    companyNameState() {
      return !this.$v.customer.company_name.$invalid ? true : false;
    },
    lastNameState() {
      return !this.$v.customer.contact_lastname.$invalid ? true : false;
    },
    emailState() {
      return !this.$v.customer.contact_email.$invalid ? true : false;
    },
  },
  data() {
    return {
      submitStatus: null,
      customer: {
        company_name: "",
        contact_firstname: "",
        contact_lastname: "",
        contact_email: "",
        acquired_on: "",
        customer_status: "",
      },
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
    submit() {
      this.$v.customer.$touch();
      if (this.$v.customer.$error) {
        this.submitStatus = "ERROR";
      } else {
        this.addCustomer();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    addCustomer() {
      axios
        .post("http://localhost:3000/customers/", this.customer)
        .then((response) => {
          this.$emit("hideAddCustomer");
          this.$emit("getCustomerData");
          this.confirmingMessageAddCustomer();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    hideModal() {
      this.$emit("hideAddCustomer");
    },
    confirmingMessageAddCustomer() {
      this.$root.$bvToast.toast(`New customer has been added`, {
        autoHideDelay: 5000,
        noCloseButton: true,
        variant: "info",
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
  },
};
</script>

<style>
.validation_error {
  color: red;
}
</style>
