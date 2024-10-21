<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h6" style="padding-left:15px">Создать Мероприятие: {{event}}</div>
        </q-card-section>
        <q-card-section class="column">
          <div class="row">
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="title" label="Title" />
            </div>
            <div class="col-6 q-pa-md">
              <q-input outlined v-model="address" label="Address" />
            </div>
            <div class="col-6 q-pa-md">
              <q-toggle
                v-model="is_current"
                label="Текущее событие"
              />
            </div>
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="description" label="Description" type="textarea"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="warning" label="Назад" :href="'#/events'"/>

          <q-space/>

          <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Item',
  data() {
    return {
      event: '',
      title: '',
      description: '',
      event_date: '',
      address: '',
      is_current: 0,
    };
  },
  methods: {
    save() {
      const data = {
        event: this.event,
        title: this.title,
        description: this.description,
        event_date: this.event_date,
        address: this.address,
        is_current: this.is_current ? 1 : 0,
      };
      // eslint-disable-next-line no-console
      console.log(data);
      this.$store.dispatch('events/store', data);
    },
  },
  created() {
  },
};
</script>

<style scoped>

</style>
