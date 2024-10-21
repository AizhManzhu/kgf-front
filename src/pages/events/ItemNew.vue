<template>
  <q-page class="q-page-container">
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      style="margin: 10px"
    >
      <q-step
        :name="1"
        :title="'Мероприятие'"
        icon="settings"
      >
        <Step1/>
      </q-step>
      <q-step
        :name="2"
        title="Участники"
        icon="groups"
      >
        <Step2/>
      </q-step>
      <q-step
        :name="3"
        title="Программа"
        icon="wysiwyg">
        <Step3/>
      </q-step>
      <q-step
        :name="4"
        title="Cпикеры"
        icon="person"
      >
        <Step4/>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { ref } from '@vue/reactivity';
import Step1 from 'pages/events/Steps/Step1';
import Step2 from 'pages/events/Steps/Step2';
import Step3 from 'pages/events/Steps/Step3';
import Step4 from 'pages/events/Steps/Step4';

export default {
  name: 'ItemNew',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  data() {
    return {
      step: ref(1),
    };
  },
};
</script>

<style scoped>

</style>
