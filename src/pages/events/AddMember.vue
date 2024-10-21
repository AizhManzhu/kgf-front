<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-table
        title="Добавить участника"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="initialPagination"
        @request="onRequest"
        v-model:selected="selected"
        selection="single"
        :rows-per-page-options="[20]"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon="add_circle"
            label="Добавить"
            no-caps
            v-on:click="addMemberToEvent()"
          />
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_left" color="accent" :href="'#/events/'+$route.params.id"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';

export default {
  name: 'AddMember.vue',
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
      selected: ref([]),
    };
  },
  methods: {
    addMemberToEvent() {
      this.$store.dispatch('events/addMember', { id: this.$route.params.id, member_id: this.selected[0].id });
    },
  },
  created() {
    this.listOfData();
  },
};
</script>

<style scoped>

</style>
