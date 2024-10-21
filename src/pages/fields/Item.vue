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
        <q-card class="my-card" flat bordered v-if="buttons.length !== 0" style="margin-top: 10px">
          <q-card-section class="column">
            <div class="row">
              <div class="col-12 q-pa-md">
                <div class="text-h6">Кнопки</div>
                <br>
                <div class="row">
                  <q-card v-for="button in buttons" v-bind:key="button.id" class="col-4" style="margin-bottom: 10px; margin-left: 10px">
                    <q-card-section>{{button.text}}<q-badge color="negative" floating rounded v-on:click="deleteButton(button.id)">x</q-badge></q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="my-card" style="margin-top: 10px" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Добавить кнопку</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="button_text" label="Текст кнопки" />
              </div>
              <div class="col-6 q-pa-md">
                <q-btn flat color="primary" label="Добавить" v-on:click="addButton()"/>
              </div>
            </div>
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
      buttons: ref([]),
      type: ref(''),
      button_text: ref(''),
    };
  },
  methods: {
    save() {
      const data = {
        id: this.id,
        text: this.text,
        name: this.name,
        type: this.type,
      };
      this.$store.dispatch('fields/save', data);
    },
    prevPage() {
      window.history.back();
    },
    deleteButton(id, index) {
      this.$store.dispatch('fields/deleteButton', id).then((res) => {
        this.speakers.splice(index, 1);
      });
    },
    addButton() {
      const data = {
        text: this.button_text,
        field_id: this.id,
      };
      this.$store.dispatch('fields/addButton', data).then((res) => {
        this.button_text = '';
        this.buttons.push({
          id: res.data.data.id,
          text: res.data.data.text,
        });
      });
    },
  },
  created() {
    this.$store.dispatch('fields/getItemById', { id: this.$route.params.id })
      .then((res) => {
        this.id = this.$route.params.id;
        this.text = res.data.data.text;
        this.name = res.data.data.name;
        this.type = res.data.data.type;
        this.buttons = res.data.data.buttons;
      });
  },
};
</script>

<style scoped>

</style>
