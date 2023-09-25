<template>
  <b-container>
    <b-container>
      <b-container class="mt-4 mb-4">
        <b-row>
          <b-col md="auto">
            <h2>Customers</h2>
          </b-col>
          <b-col md="auto">
            <b-button variant="success" @click="showAddCustomer"
              >+ Add Customer</b-button
            >
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-form-group>
          <b-input-group>
            <b-form-input
              id="filter-input"
              autocomplete="off"
              v-on:input="getFilteredData"
              v-model="filter"
              placeholder="Type to search"
              class="md-auto"
            >
            </b-form-input>
            <b-button
              :disabled="!filter"
              @click="(filter = ''), getCustomerData()"
              >Clear</b-button
            >
          </b-input-group>
        </b-form-group>
      </b-container>
      <b-container>
        <b-row align-v="baseline">
          <b-col md="auto">
            <b-pagination
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="this.items.length"
              aria-controls="customersTable"
            ></b-pagination>
          </b-col>
          <b-col md="auto">
            <div>Customers: {{ this.items.length }}</div>
          </b-col>
        </b-row>
      </b-container>
      <b-overlay id="noResultsOverlay" :show="noSearchResults" opacity="1.0">
        <template #overlay>
          <div>No results</div>
        </template>
        <b-container class="mt-3 mx-4">
          <b-table
            id="customersTable"
            hover
            :items="items"
            :fields="fields"
            fixed
            sticky-header
            stacked="md"
            :per-page="perPage"
            :currentPage="currentPage"
          >
            <template #cell(company_name)="data">
              {{ data.item.company_name }}
            </template>
            <template #cell(contact_name)="data">
              {{ data.item.contact_lastname }}
              {{ data.item.contact_firstname }}
            </template>
            <template #cell(contact_email)="data">
              {{ data.item.contact_email }}
            </template>
            <template #cell(acquired_on)="data">
              {{ data.item.acquired_on }}
            </template>
            <template #cell(customer_status)="data">
              <b-icon
                class="icon__status_active"
                icon="circle-fill"
                v-if="data.item.customer_status === 'active'"
              ></b-icon>
              <b-icon
                class="icon__status_inactive"
                icon="circle-fill"
                v-else
              ></b-icon>
            </template>
            <template #cell(actions)="data">
              <b-row class="text-center" align-h="center">
                <b-col md="auto">
                  <b-icon
                    class="action"
                    icon="pencil-fill"
                    @click="showEditCustomer(data.item.id)"
                  ></b-icon>
                </b-col>
                <b-col md="auto">
                  <b-icon
                    class="action"
                    icon="trash-fill"
                    variant="danger"
                    @click="showDeleteCustomerConfirmation(data.item.id)"
                  ></b-icon>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-container>
      </b-overlay>
      <b-container>
        <b-row align-v="baseline">
          <b-col md="auto">
            <b-pagination
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="this.items.length"
              aria-controls="customersTable"
            ></b-pagination>
          </b-col>
          <b-col md="auto">
            <div>Customers: {{ this.items.length }}</div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>

    <b-modal ref="addcustomer" size="lg" title="New Customer" hide-footer>
      <add-customer-form
        @hideAddCustomer="hideAddCustomer"
        @getCustomerData="getCustomerData"
      ></add-customer-form>
    </b-modal>

    <b-modal ref="editcustomer" size="lg" title="Edit Customer" hide-footer>
      <edit-customer-form
        @getCustomerData="getCustomerData"
        @hideEditCustomer="hideEditCustomer"
        :customerId="customerId"
      ></edit-customer-form>
    </b-modal>

    <b-modal id="deleteCustomerConfirmation">
      <div>Are you sure you want to delete the customer from your CRM?</div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";
import AddCustomerForm from "@/components/AddCustomerForm.vue";
import EditCustomerForm from "@/components/EditCustomerForm.vue";

export default {
  components: {
    AddCustomerForm,
    EditCustomerForm,
  },
  data() {
    return {
      fields: [
        { key: "company_name", label: "Company Name", sortable: true },
        { key: "contact_name", label: "Contact Name", sortable: true },
        { key: "contact_email", label: "Contact E-mail", sortable: true },
        { key: "acquired_on", label: "Acquired On", sortable: true },
        { key: "customer_status", label: "Customer Status", sortable: true },
        "actions",
      ],
      items: [],
      customerId: 0,
      value: "",
      currentPage: 1,
      perPage: 20,
      filter: "",
      noSearchResults: true,
    };
  },
  computed: {},
  mounted() {
    this.getCustomerData();
    this.getFilteredData();
  },
  methods: {
    getCustomerData() {
      axios
        .get("http://localhost:3000/customers/")
        .then(
          (response) => (
            (this.items = response.data), (this.noSearchResults = false)
          )
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getFilteredData() {
      axios
        .get(`http://localhost:3000/customers/?q=${this.filter.toLowerCase()}`)
        .then(
          (response) => (
            (this.items = response.data),
            this.items.length == 0
              ? (this.noSearchResults = true)
              : (this.noSearchResults = false)
          )
        )
        .catch((error) => {
          console.log(error);
        });
    },
    showAddCustomer() {
      this.$refs["addcustomer"].show();
    },
    hideAddCustomer() {
      this.$refs["addcustomer"].hide();
    },
    showEditCustomer(id) {
      this.$refs["editcustomer"].show();
      this.customerId = id;
    },
    hideEditCustomer() {
      this.$refs["editcustomer"].hide();
    },
    showDeleteCustomerConfirmation(id) {
      this.value = "";
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want to delete the customer from your CRM?",
          {
            title: "Delete the customer",
            okVariant: "danger",
            okTitle: "Yes",
            cancelTitle: "No",
          }
        )
        .then((v) => {
          this.value = v;
          if (this.value == true) {
            this.deleteCustomer(id);
            this.confirmingMessageDeleteCustomer();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCustomer(id) {
      this.customerId = id;
      axios
        .delete(`http://localhost:3000/customers/${this.customerId}`)
        .then((response) => {
          console.log(response);
          setTimeout(
            function () {
              this.getCustomerData();
            }.bind(this),
            1000
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    confirmingMessageDeleteCustomer() {
      this.$bvToast.toast("The customer has been deleted", {
        autoHideDelay: 5000,
        noCloseButton: true,
        variant: "info",
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
      console.log();
    },
  },
};
</script>

<style>
.action:hover {
  cursor: pointer;
}

.icon__status_active {
  color: green;
}

.icon__status_inactive {
  color: grey;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
