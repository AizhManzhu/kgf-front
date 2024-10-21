<template>
<q-page class="q-page-container q-pa-md">
<div class="row">
 <div class="col-7">
  <q-page class="q-page-container">
    <div>
      <q-table
        title="Пользователи"
        :rows="rows"
        :columns="columns"
        row-key="event"
        v-model:pagination="initialPagination"
        @request="onRequest"
      >
        <template v-slot:no-data>
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied"/>
            <span>Нет данных...</span>
          </div>
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
 </div>
 <div class="col-5" style="padding-left: 20px">
  <q-page class="q-page-container">
    <div>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h6">Создать нового пользователя</div>
        </q-card-section>
        <q-card-section class="column">
          <div class="row">
            <div class="col-12" style="margin-top: 5px">
              <q-input outlined v-model="name" label="Имя" :rules="rules" />
            </div>
            <div class="col-12" style="margin-top: 5px">
              <q-input outlined v-model="email" label="Email" :rules="[val => !!val || 'Заполните это поле', isValidEmail]"/>
            </div>
            <div class="col-12" style="margin-top: 5px">
              <q-input outlined v-model="password" label="Пароль" type="password" :rules="rules"/>
            </div>
            <div class="col-12" style="margin-top: 5px">
              <q-select outlined v-model="role" label="Role" type="number" :options="roles"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-space/>
          <q-btn  style="margin-right: 10px" flat color="primary" label="Сохранить" v-on:click="save()"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
 </div>
</div>
</q-page>
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';

export default {
  name: 'Users.vue',
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
        name: 'name',
        align: 'left',
        label: 'Имя',
        field: 'name',
      },
      {
        name: 'email',
        align: 'left',
        label: 'email',
        field: 'email',
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
      let url = '/api/users';
      if (page !== initialPagination.value.page) {
        url = `/api/users?page=${page}`;
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
                email: element.email,
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
      name: '',
      email: '',
      password: '',
      role: 0,
      roles: ref([]),
      rules: [
        (val) => (val && val.length > 0) || 'Заполните это поле',
      ],
    };
  },
  methods: {
     isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Адрес электронной почты должен содержать символ @';
    },
    onRowClick(evt, row) {
      window.location.href = `${window.location.origin}#settings/user/${evt.row.id}`;
    },
    deleteItem(evt, row) {
      this.$store.dispatch('users/destroy', { id: evt.row.id }).then((res) => {
        this.rows.splice(evt.rowIndex, 1);
      });
    },
    save() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        role_id: this.role.value,
      };
      // eslint-disable-next-line no-console
      this.$store.dispatch('users/store', data).then((res) => {
              setTimeout(() => {
                this.$router.go(this.$router.currentRoute);
              }, 1000);
      });
    },
  },
  created() {
    this.listOfData();

    api.get('/api/v1/roles').then((res) => {
      res.data.data.forEach((el) => {
        this.roles.push({
          label: el.name,
          value: el.id,
        });
      });
    });
  },
};
</script>
