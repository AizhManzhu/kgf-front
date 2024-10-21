<template>
  <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6">Этап :</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="stageName" label="Название" />
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="description" label="Описание"/>
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="messageAfterCorrectAnswer" label="Сообщение после правильного ответа" />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-btn flat color="warning" label="Назад" :href="'#/events/'+$route.params.id"/>

            <q-space/>

            <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
          </q-card-section>
        </q-card>
        <q-card class="my-card" flat bordered style="margin-top: 10px" v-if="rowsTasks.length !== 0">
      <q-table
        title="Задания"
        :rows="rowsTasks"
        :columns="columsTasks"
        row-key="event"
        v-model:pagination="initialPagination"
        @request="onRequest"
      >
        <template v-slot:top-left>
                <div style="font-size: 1.2rem; color:red" class="text-h6">Варианты</div>
        </template>
        <template v-slot:no-data>
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied"/>
            <span>Нет данных...</span>
          </div>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="create"
              no-caps
              flat
              dense
              @click="onRowTaskClick(props)"
            />
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteTask(props)"
            />
          </q-td>
        </template>
      </q-table>
        </q-card>
        <q-card class="my-card" style="margin-top: 10px" flat bordered>
          <q-card-section>
            <div class="text-h6">Создать задание</div>
          </q-card-section>
           <q-card-section class="column">
            <div class="row">
              <div class="q-pa-md">
                <q-input outlined v-model="input_task_number" label="Номер варианта"/>
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="input_question" label="Вопрос" type="textarea"/>
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="input_answer" label="Ответ" type="textarea"/>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-between">
            <q-space/>
            <q-btn flat color="primary" label="Создать" v-on:click="createTask()"/>
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
   const columsTasks = [
      {
        name: 'task_number',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'task_number',
      },
      {
        name: 'question',
        required: true,
        label: 'Вопрос',
        align: 'left',
        field: 'question',
      },
      {
        name: 'answer',
        required: true,
        label: 'Ответ',
        align: 'left',
        field: 'answer',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Действия',
        field: 'action',
      },
    ];
    return {
      id: ref(0),
      stageName: ref(''),
      messageAfterCorrectAnswer: ref(''),
      description: ref(''),
      columsTasks,
      rowsTasks: ref([]),
      input_question: ref(''),
      input_answer: ref(''),
      input_task_number: ref(),
    };
  },
  methods: {
   deleteTask(evt) {
     this.$store.dispatch('tasks/destroy', { id: evt.row.id }).then(() => {
        this.rowsTasks.splice(evt.rowIndex, 1);
      });
   },
   onRowTaskClick(evt) {
     window.location.href = `${window.location.origin}#/events/${this.$route.params.id}/competition/${this.$route.params.idOfCompetition}/task/${evt.row.id}`;
   },
   createTask() {
       const data = {
        question: this.input_question,
        answer: this.input_answer,
        competition_id: this.$route.params.idOfCompetition,
        task_number: this.input_task_number,
      };
      this.$store.dispatch('tasks/store', data).then((res) => {
        this.rowsTasks.push({
           id: res.data.id,
           question: res.data.question,
           answer: res.data.answer,
           task_number: res.data.task_number,
        });
        this.input_question = '';
        this.input_answer = '';
        this.input_task_number = '';
      });
   },
    save() {
      const data = {
        id: this.$route.params.idOfCompetition,
        stage_name: this.stageName,
        description: this.description,
        after_corr_answer: this.messageAfterCorrectAnswer,
        event_id: this.$route.params.id,
      };
      this.$store.dispatch('competitions/save', data);
    },
  },
  created() {
    this.$store.dispatch('competitions/getItemById', { id: this.$route.params.idOfCompetition })
      .then((res) => {
        this.id = this.$route.params.idOfCompetition;
        this.stageName = res.data.data.stage_name;
        this.description = res.data.data.description;
        this.messageAfterCorrectAnswer = res.data.data.after_corr_answer;
        if (res.data.data.tasks) {
          res.data.data.tasks.forEach((element) => {
            this.rowsTasks.push({
               id: element.id,
               question: element.question,
               answer: element.answer,
               task_number: element.task_number,
            });
          });
        }
      });
  },
};
</script>

<style scoped>

</style>
