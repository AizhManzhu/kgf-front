<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <div class="container">
        <div class="row">
          <div class="col-12" style="padding-right: 10px">
            <q-table
              title="Шаблоны"
              :rows="rows"
              :columns="columns"
              row-key="event"
              v-model:pagination="initialPagination"
              @request="onRequest"
            >
              <template v-slot:top-right>
                <q-btn
                  color="primary"
                  icon="add_circle"
                  label="Создать"
                  no-caps
                  href="#/templates/create"
                  v-if="$can('create-template')"
                />
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    v-if="$can('update-template')"
                    color="primary"
                    icon-right="create"
                    no-caps
                    flat
                    dense
                    @click="onRowClick(props)"
                  />
                  <q-btn
                    v-if="$can('delete-template')"
                    color="negative"
                    icon-right="delete"
                    no-caps
                    flat
                    dense
                    @click="deleteItem(props)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </div>
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
        label: 'Название',
        align: 'left',
        field: 'name',
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
      let url = '/api/templates';
      if (page !== initialPagination.value.page) {
        url = `/api/templates?page=${page}`;
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
                name: element.name,
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
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#/templates/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      this.$store.dispatch('templates/destroy', { id: evt.row.id }).then((res) => {
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
