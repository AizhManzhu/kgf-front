<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <span style="font-size: 32px">Роль</span>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="name" label="Название"/>
          <q-select v-model="multiple" style="margin-top: 1vh" @add="add" @remove="remove"
                    multiple :options="permissions"/>
        </q-card-section>
        <q-card-section class="flex justify-between">
          <q-btn flat color="warning" label="Назад" v-on:click="prevPage()"/>
          <q-space/>
          <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  name: 'Item',
  data() {
    return {
      name: ref(''),
      permissions: ref([]),
      multiple: ref([]),
    };
  },
  methods: {
    getData() {
      api.get(`/api/v1/roles/${this.$route.params.id}`)
        .then((res) => {
          this.name = res.data.data.name;
          res.data.data.permissions.forEach((el) => {
            this.multiple.push({
              label: el.name,
              value: el.id,
            });
          });
        });
      api.get('/api/v1/permissions')
        .then((res) => {
          res.data.data.forEach((el) => {
            this.permissions.push({
              label: el.name,
              value: el.id,
            });
          });
        });
    },
    remove(evt) {
      api.delete(`/api/v1/permission/${this.$route.params.id}/${evt.value.label}`);
    },

    add(evt) {
      api.put(`/api/v1/permission/${this.$route.params.id}/${evt.value.label}`);
    },

    prevPage() {
      window.history.back();
    },
    save() {
      api.post(`/api/v1/roles/${this.$route.params.id}`, { name: this.name })
        .then((res) => {
          this.name = res.data.data.name;
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>

</style>
