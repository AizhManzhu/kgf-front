<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h6" style="padding-left:15px">Создать Мероприятие: {{name}}</div>
        </q-card-section>
        <q-card-section class="column">
          <div class="row">
            <div class="col-6">
              <q-input outlined v-model="name" label="Название" />
            </div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-12">
              <q-editor
                v-model="text"
                :toolbar="[
                ['bold', 'italic', 'underline']
              ]"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="warning" label="Назад" :href="'#/templates'"/>

          <q-space/>

          <q-btn flat color="primary" label="Сохранить" v-if="$can('create-template')" v-on:click="save()"/>
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
      name: '',
      text: '',
    };
  },
  methods: {
    save() {
      const data = {
        name: this.name,
        text: this.text,
        type: 'inline',
      };
      this.$store.dispatch('templates/store', data);
    },
  },
  created() {
  },
};
</script>

<style scoped>

</style>
