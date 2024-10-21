<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
    <q-table
      title="Участники"
      :rows="rowsRole"
      :columns="columnsRole"
      dense
      row-key="id"
      :filter="filter"
      table-class="no-border"
      bordered
    >

      <template v-slot:top-right>
        <q-btn color="primary" icon-right="add" v-on:click='add'/>
      </template>
      <template v-slot:body-cell-permissions="props">
        <q-td :auto-width="false">
          <q-badge v-for="val in props.row.permissions" rounded v-bind:key="val.id"
                   :label="val.name"
                   use-chips
                   use-input
                   @new-value="createValue"
                   color="green"
          />
        </q-td>
      </template>
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
    </q-table>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { columnsRole } from 'boot/columns';
import { ref } from 'vue';

export default {
  name: 'Index',
  data() {
    return {
      columnsRole,
      rowsRole: ref([]),
    };
  },
  methods: {
    getData() {
      api.get('/api/v1/roles')
        .then((res) => {
          this.rowsRole = res.data.data;
        })
        .catch();
    },
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#/settings/roles/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      // this.$store.dispatch('members/destroy', { id: evt.row.id }).then((res) => {
      //   this.rows.splice(evt.rowIndex, 1);
      // });
    },
    add() {
      window.location.href = `${window.location.origin}#/settings/roles/create`;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>

</style>
