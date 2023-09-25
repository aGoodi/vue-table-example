<template>
  <b-container>
    <b-table :fields="fields" :items="items"
      ><template #cell(task_title)="data">
        {{ data.item.task_title }}
      </template>
      <template #cell(contact_name)="data">
        {{ data.item.contact_lastname }}
        {{ data.item.contact_firstname }}
      </template>
      <template #cell(contact_email)="data">
        {{ data.item.contact_email }}
      </template>
      <template #cell(task_deadline)="data">
        {{ data.item.task_deadline }}
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
        </b-row> </template
    ></b-table>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        { key: "task_title", label: "Title task", sortable: true },
        { key: "company_name", label: "Company Name", sortable: true },
        { key: "contact_email", label: "Contact E-mail", sortable: true },
        { key: "task_deadline", label: "Сompletion date", sortable: true },
        { key: "task_status", label: "Task Status", sortable: true },
        "actions",
      ],
      items: [],
    };
  },
  mounted() {
    this.getCustomerData();
  },
  methods: {
    getCustomerData() {
      axios
        .get(
          "https://my-json-server.typicode.com/agoodi/vue-table-example/customers/"
        )
        .then((response) => (this.items = response.data))
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
