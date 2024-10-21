<template>
    <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Участник: {{id}}</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="first_name" label="Фамилия" />
              </div>
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="last_name" label="Имя" />
              </div>
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="telegram_id" label="Telegram ID" disable/>
              </div>
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="username" label="Telegram Username" disable/>
              </div>
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="email" label="e-mail"/>
              </div>
              <div class="col-4 q-pa-md">
                <q-input outlined v-model="phone" label="Номер телефона"/>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-btn flat color="warning" label="Назад" v-on:click="back"/>

            <q-space/>

            <q-btn v-if="$can('edit-member')" flat color="primary" label="Сохранить" v-on:click="save()"/>
          </q-card-section>
        </q-card>
        <div style="margin-top: 1rem; width: 100%" >
          <MemberEvents v-if="id !== 0" :id="id"/>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from '@vue/reactivity';
import MemberEvents from 'pages/members/MemberEvents';

export default {
  name: 'Item',
  components: {
    MemberEvents,
  },
  data() {
    return {
      id: ref(0),
      first_name: ref(''),
      last_name: ref(''),
      telegram_id: ref(''),
      phone: ref(''),
      email: ref(''),
      username: ref(''),
    };
  },
  methods: {
    save() {
      const data = {
        id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        phone: this.phone,
        telegram_id: this.telegram_id,
      };
      this.$store.dispatch('members/save', data);
    },
    back() {
      window.history.back();
    },
  },
  created() {
    this.$store.dispatch('members/getItemById', { id: this.$route.params.id })
      .then((res) => {
        this.first_name = res.data.data.first_name;
        this.last_name = res.data.data.last_name;
        this.username = res.data.data.username;
        this.email = res.data.data.email;
        this.phone = res.data.data.phone;
        this.id = res.data.data.id;
        this.telegram_id = res.data.data.telegram_id;
      });
  },
};
</script>

<style scoped>

</style>
