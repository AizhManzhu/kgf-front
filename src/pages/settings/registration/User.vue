<template>
    <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Пользователь: {{id}}</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="col-3 q-pa-md">
                <q-input outlined v-model="name" :rules="rules" label="Имя" />
              </div>
              <div class="col-3 q-pa-md">
                <q-input outlined v-model="email" :rules="[val => !!val || 'Заполните это поле', isValidEmail]" label="e-mail"/>
              </div>
              <div class="col-3 q-pa-md">
                <q-input outlined v-model="password" label="Пароль" type="password"/>
              </div>
              <div class="col-3 q-pa-md">
                <q-select outlined v-model="role" label="Role" :options="roles"/>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-btn flat color="warning" label="Назад" :href="'#/settings/users'"/>

            <q-space/>

            <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from '@vue/reactivity';
import { api } from 'boot/axios';

export default {
  name: 'User',
  data() {
    return {
      id: ref(0),
      name: ref(''),
      email: ref(''),
      password: '',
      role: 0,
      rules: [
        (val) => (val && val.length > 0) || 'Заполните это поле',
      ],
      roles: ref([]),
    };
  },
  methods: {
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Адрес электронной почты должен содержать символ @';
    },
    save() {
      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        role_id: this.role.value,
      };
      this.$store.dispatch('users/save', data);
    },
  },
  created() {
    this.$store.dispatch('users/getItemById', { id: this.$route.params.id })
      .then((res) => {
        this.name = res.data.data.name;
        this.email = res.data.data.email;
        this.id = res.data.data.id;
        this.role = res.data.data.role;
      });
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

<style scoped>

</style>
