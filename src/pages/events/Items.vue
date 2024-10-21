<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-table
        title="Мероприятия"
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
            href="#/events/create"
          />
        </template>
        <template v-slot:no-data>
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied"/>
            <span>Нет данных...</span>
          </div>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-if="$can('read-event')"
              color="primary"
              icon-right="create"
              no-caps
              flat
              dense
              @click="onRowClick(props)"
            />
            <q-btn
              v-if="$can('delete-event')"
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
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';
import { destroy } from 'src/store/events/actions';

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
        sortable: false,
      },
      {
        name: 'title',
        align: 'left',
        label: 'Название',
        field: 'title',
      },
      {
        name: 'description',
        align: 'left',
        label: 'Описание',
        field: 'description',
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
      let url = '/api/events';
      if (page !== initialPagination.value.page) {
        url = `/api/events?page=${page}`;
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
                event: element.event,
                title: element.title,
                description: `${element.description.slice(0, 75)}...`,
              });
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
      role: ref(''),
    };
  },
  methods: {
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#/events/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      this.$store.dispatch('events/destroy', { id: evt.row.id }).then((res) => {
        this.rows.splice(evt.rowIndex, 1);
      });
    },
  },
  created() {
    this.role = localStorage.getItem('role');
    this.listOfData();
  },
};
</script>

<style scoped>

</style>
