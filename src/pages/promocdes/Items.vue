<template>
    <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-table
        title="Промокоды"
        :rows="rows"
        :columns="columns"
        row-key="promocode"
        v-model:pagination="initialPagination"
        @request="onRequest"
      >
        <template v-slot:top-left>
          <div style="font-size: 1.2rem">Промокоды</div>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon="add_circle"
            label="Выгрузить"
            no-caps
            v-on:click="exportPromocode()"
          />
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
        name: 'code',
        required: true,
        label: 'Code',
        align: 'left',
        field: 'code',
      },
      {
        name: 'used',
        align: 'left',
        label: 'активирован',
        field: 'used',
      },
      {
        name: 'type_front',
        align: 'left',
        label: 'Тип',
        field: 'type_front',
      },
      {
        name: 'has_access',
        align: 'left',
        label: 'Промокод активен',
        field: 'has_access',
      },
      {
        name: 'created_at',
        align: 'left',
        label: 'дата и время создания',
        field: 'created_at',
      },
      {
        name: 'updated_at',
        align: 'left',
        label: 'дата и время обновления',
        field: 'updated_at',
      },
    ];
    const promocodeType = {
      multi: 'мульти',
      single: 'одноразовый',
    };
    const rows = ref([]);
    const initialPagination = ref({});
    async function listOfData(page) {
      let url = '/api/promocodes';
      if (page !== initialPagination.value.page) {
        url = `/api/promocodes?page=${page}`;
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
                code: element.code,
                max_try: element.max_try,
                is_activated: element.is_activated,
                has_access: element.has_access,
                type_front: promocodeType[element.type],
                type: element.type,
                used: element.used,
                created_at: element.created_at,
                updated_at: element.updated_at,
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
    };
  },
  methods: {
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#/promocodes/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      this.$store.dispatch('members/destroy', { id: evt.row.id }).then((res) => {
        this.rows.splice(evt.rowIndex, 1);
      });
    },
    exportPromocode() {
      api.get('api/export/promocode').then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'promocodes.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
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
