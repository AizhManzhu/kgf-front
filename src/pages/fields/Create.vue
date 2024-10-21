<template>
  <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Редактировать поле</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="name" label="Название" />
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="text" label="Текст" />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-btn flat color="warning" label="Назад" v-on:click="prevPage()"/>

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

export default {
  name: 'Item',
  data() {
    return {
      id: ref(0),
      name: ref(''),
      text: ref(''),
    };
  },
  methods: {
    prevPage() {
      window.history.back();
    },
    save() {
      const data = {
        text: this.text,
        name: this.name,
        type: 'button',
        is_base: 0,
      };
      this.$store.dispatch('fields/store', data).then((res) => {
        window.location.href = `${window.location.origin}#/fields/${res.data.data.id}`;
      });
    },
  },
};
</script>

<style scoped>

</style>
