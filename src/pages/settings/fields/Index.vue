<template>
  <q-page class="q-page-container">
    <div class="row q-pa-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Базовые поля регистрации</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-6">
                <q-input outlined v-model="last_name" label="Фамилия"/>
              </div>
              <div class="col-6" style="padding-left: 10px">
                <q-input outlined v-model="first_name" label="Имя"/>
              </div>
              <div class="col-6" style="margin-top: 10px">
                <q-input outlined v-model="phone" label="Номер телефона"/>
              </div>
              <div class="col-6" style="padding-left: 10px; margin-top: 10px">
                <q-input outlined v-model="email" label="e-mail"/>
              </div>
              <div class="col-6" style="margin-top: 10px">
                <q-input outlined v-model="company" label="Компания"/>
              </div>
              <div class="col-6" style="padding-left: 10px; margin-top: 10px">
                <q-input outlined v-model="position" label="Должность"/>
              </div>
            </div>
          </q-card-section>
          <q-card-actions>

            <q-space/>

            <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
  name: 'Index',
  data() {
    return {
      first_name: ref(''),
      last_name: ref(''),
      phone: ref(''),
      email: ref(''),
      company: ref(''),
      position: ref(''),
    };
  },
  methods: {
    save() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        email: this.email,
        company: this.company,
        position: this.position,
      };
      this.$store.dispatch('fields/saveBaseFields', data);
    },
  },
  created() {
    this.$store.dispatch('fields/getBaseFields')
      .then((res) => {
        res.data.data.forEach((element) => {
          if (element.member_field === 'first_name') {
            this.first_name = element.text;
          } else if (element.member_field === 'last_name') {
            this.last_name = element.text;
          } else if (element.member_field === 'phone') {
            this.phone = element.text;
          } else if (element.member_field === 'email') {
            this.email = element.text;
          } else if (element.member_field === 'company') {
            this.company = element.text;
          } else if (element.member_field === 'position') {
            this.position = element.text;
          }
        });
      });
  },
};
</script>

<style scoped>

</style>
