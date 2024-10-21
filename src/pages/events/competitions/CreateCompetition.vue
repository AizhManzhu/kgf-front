<template>
  <q-page class="q-page-container">
    <div class="q-pa-md row">
      <div class="col-12" style="padding-right: 10px">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6" style="padding-left:15px">Этап :</div>
          </q-card-section>
          <q-card-section class="column">
            <div class="row">
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="stageName" label="Название" />
              </div>
              <div class="col-6 q-pa-md">
                <q-input outlined v-model="description" label="Описание" />
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
      </div>
    </div>
  </q-page>
</template>
<script>

export default {
  name: 'Item',
  data() {
    return {
      stageName: '',
      description: '',
      messageAfterCorrectAnswer: '',
    };
  },
  methods: {
    save() {
      const data = {
        stage_name: this.stageName,
        description: this.description,
        event_id: this.$route.params.id,
        after_corr_answer: this.messageAfterCorrectAnswer,
      };
      this.$store.dispatch('competitions/store', data).then((res) => {
         window.location.href = `${window.location.origin}#/events/${this.$route.params.id}/competition/${res.data.id}`;
      });
    },
  },
  created() {
  },
};
</script>

<style scoped>

</style>
