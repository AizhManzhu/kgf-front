<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-table
        title="Участники"
        :rows="rows"
        :columns="columns"
        row-key="member"
        v-model:pagination="initialPagination"
        @request="onRequest"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="create"
              no-caps
              flat
              dense
              @click="onRowClick(props)"
            />
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteItem(props)"
            />
          </q-td>
        </template>
        <template v-slot:top-left>
          <div style="font-size: 1.2rem">Участники</div>
          <div style="margin-top: 5px">
            <q-btn
              v-if="$can('export-member')"
              color="positive"
              label="Выгрузить участников"
              no-caps
              v-on:click="exportMembers()"
            />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';

export default {
  name: 'Items.vue',
  data() {
    const columns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: 'ФИО',
        align: 'left',
        field: 'name',
      },
      {
        name: 'username',
        align: 'left',
        label: 'Username',
        field: 'username',
      },
      {
        name: 'email',
        align: 'left',
        label: 'e-mail',
        field: 'email',
      },
      {
        name: 'phone',
        align: 'left',
        label: 'Номер телефона',
        field: 'phone',
      },
      {
        name: 'company',
        align: 'left',
        label: 'Компания',
        field: 'company',
      },
      {
        name: 'position',
        align: 'left',
        label: 'Должность',
        field: 'position',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Действия',
        field: 'action',
      },
    ];
    const rows = ref([]);
    const initialPagination = ref({});

    async function listOfData(page) {
      let url = '/api/members';
      if (page !== initialPagination.value.page) {
        url = `/api/members?page=${page}`;
        rows.value = [];
      }
      await api.get(url)
        .then((res) => {
          if (res.data.success) {
            initialPagination.value.page = res.data.data.current_page;
            initialPagination.value.rowsPerPage = res.data.data.per_page;
            initialPagination.value.rowsNumber = res.data.data.total;
            res.data.data.data.forEach((element) => {
              rows.value.push({
                id: element.id,
                name: `${element.first_name} ${element.last_name}`,
                username: element.username,
                email: element.email,
                phone: element.phone,
                company: element.company,
                position: element.position,
              }); // what to push unto the rows array?
            });
          }
        });
    }

    function onRequest(props) {
      listOfData(props.pagination.page);
    }

    return {
      columns,
      rows,
      initialPagination,
      onRequest,
      listOfData,
    };
  },
  methods: {
    exportMembers() {
      this.$store.dispatch('members/exportMembers')
        .then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'Участники.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        });
    },
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#/members/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      this.$store.dispatch('members/destroy', { id: evt.row.id })
        .then((res) => {
          this.rows.splice(evt.rowIndex, 1);
        });
    },
  },
  created() {
    this.listOfData();
  },
};
</script>

<style scoped>

</style>
