<template>
  <q-page-container class="column items-center">
    <div style="width: 50vh">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">Авторизация</div>
          <div class="text-caption text-grey">
            Для авторизации укажите e-mail и пароль
          </div>

          <q-input bottom-slots v-model="email" :model-value="email" label="e-mail" type="email" style="width: 100%;margin-top: 2vh"
                   dense>
            <template v-slot:before>
              <q-icon name="alternate_email"/>
            </template>
          </q-input>
          <q-input style="margin-top: 2vh" v-model="password" :model-value="password" label="Пароль" :type="isPwd ? 'password' : 'text'" dense>
            <template v-slot:before>
              <q-icon name="lock"/>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions>
          <!--          <q-btn flat color="dark" label="Share"/>-->

          <q-space/>

          <q-btn flat color="primary" label="Войти" v-on:click="doLogin()"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page-container>
</template>

<script>
import { ref } from 'vue';
import { Notify } from 'quasar';
/* eslint-disable */
export default {
  name: 'Login',
  setup() {
    return {
      email: ref(''),
      password: ref(''),
      isPwd: ref(true),
    };
  },
  methods: {
    doLogin() {
      this.$store.dispatch('auth/login', {email: this.email, password: this.password}).then(res=>{
        if(res.data.success) {
          window.location.href = window.location.origin + '#/'
        }
      }).catch((err) => {
        Notify.create({
          message: err.data.message,
          color: 'negative',
        });
      })
    },
  },
};
</script>

<style scoped>

</style>
