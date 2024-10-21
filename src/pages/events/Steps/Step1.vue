<template>
  <div class="q-pa-md row">
    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-md">
        <q-input outlined v-model="title" label="Название"/>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-md">
        <q-input outlined v-model="address" label="Адрес"/>
      </div>
      <div class="col-xs-12 col-md-4 q-pa-md">
        <q-input outlined v-model="description" label="Описание" type="textarea"/>
      </div>
      <div class="col-xs-12 col-md-4 q-pa-md">
        <q-input outlined v-model="welcome_message" label="Welcome Message" type="textarea" />
      </div>
      <div class="col-xs-12 col-md-4 q-pa-md">
        <q-input outlined v-model="thank_you_message" label="Thank You Message" type="textarea" />
      </div>
      <div class="col-12 q-pa-md">
        <q-toggle v-model="is_current" label="Текущее событие"/>
        <q-toggle v-model="is_registration_open" label="Открыть/закрыть регистрацию"/>
        <q-toggle v-model="show_format" label="Вкл. выборку формата"></q-toggle>
        <q-toggle v-model="show_mentor" label="Вкл. выборку ментора"></q-toggle>
        <q-toggle v-model="show_sponsor" label="Вкл. выборку спонсора"></q-toggle>
        <q-toggle v-model="auto_accept" label="Вкл. авто активацию"></q-toggle>
        <q-toggle v-model="need_pay" label="Вкл оплату?"/>
        <q-input v-if="need_pay" outlined v-model="price" label="Цена" type="number"/>
      </div>

      <q-btn flat color="warning" label="Назад" :href="'#/events'"/>

      <q-space/>

      <q-btn v-if="$can('get-event-report')" flat color="primary" label="Отчет" v-on:click="exportReport()"/>
      <q-space/>
      <q-btn v-if="$can('update-event')" flat color="primary" label="Сохранить" v-on:click="save()"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Step1',
  data() {
    return {
      title: ref(''),
      address: ref(''),
      is_current: ref(false),
      description: ref(''),
      welcome_message: ref(''),
      thank_you_message: ref(''),
      price: ref(0),
      need_pay: ref(false),
      is_registration_open: ref(false),
      show_format: ref(false),
      show_mentor: ref(false),
      show_sponsor: ref(false),
      auto_accept: ref(false),
    };
  },
  methods: {
    getData() {
      this.$store.dispatch('events/getEventById', { id: this.$route.params.id })
        .then((res) => {
          const { data } = res.data;
          this.event = data.event;
          this.title = data.title;
          this.description = data.description;
          this.event_date = data.event_date;
          this.address = data.address;
          this.is_current = Boolean(data.is_current);
          this.is_registration_open = Boolean(data.is_registration_open);
          this.need_pay = Boolean(data.need_pay);
          this.price = data.price;
          this.id = data.id;
          this.welcome_message = data.welcome_message;
          this.thank_you_message = data.thank_you_message;
          this.show_format = Boolean(data.show_format);
          this.show_mentor = Boolean(data.show_mentor);
          this.show_sponsor = Boolean(data.show_sponsor);
          this.auto_accept = Boolean(data.auto_accept);
        });
    },
    exportReport() {
      this.$store.dispatch('events/exportReport').then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Отчет.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    save() {
      const data = {
        event: this.event,
        title: this.title,
        description: this.description,
        event_date: this.event_date,
        address: this.address,
        is_current: this.is_current ? 1 : 0,
        id: this.id,
        welcome_message: this.welcome_message,
        thank_you_message: this.thank_you_message,
        price: this.price,
        need_pay: this.need_pay,
        is_registration_open: this.is_registration_open,
        show_format: this.show_format,
        show_mentor: this.show_mentor,
        show_sponsor: this.show_sponsor,
        auto_accept: this.auto_accept,
      };
      this.$store.dispatch('events/save', data);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>

</style>
