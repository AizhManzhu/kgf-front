<template>
  <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Задание: {{this.task_number}}</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="q-pa-md">
                <q-input outlined v-model="task_number" label="Номер"/>
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="question" label="Вопрос" type="textarea" />
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="answer" label="Ответ" type="textarea"/>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-btn flat color="warning" label="Назад" :href="'#/events/'+$route.params.id+'/competition/'+$route.params.idOfCompetition"/>

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
      question: ref(''),
      answer: ref(''),
      task_number: ref(''),
    };
  },
  methods: {
    save() {
      const data = {
        id: this.$route.params.idOfTask,
        question: this.question,
        answer: this.answer,
        competition_id: this.$route.params.idOfCompetition,
        task_number: this.task_number,
      };
      this.$store.dispatch('tasks/save', data);
    },
  },
  created() {
    this.$store.dispatch('tasks/getItemById', { id: this.$route.params.idOfTask })
      .then((res) => {
        this.question = res.data.data.question;
        this.answer = res.data.data.answer;
        this.task_number = res.data.data.task_number;
      });
    },
};
</script>

<style scoped>

</style>
