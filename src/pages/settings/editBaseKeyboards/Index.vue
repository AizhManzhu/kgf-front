<template>
  <q-page class="q-page-container">
    <div class="row q-pa-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Базовые кнопки</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-6">
                <q-input outlined v-model="ether" label="Эфир"/>
              </div>
              <div class="col-6" style="padding-left: 10px">
                <q-input outlined v-model="program" label="Программа"/>
              </div>
              <div class="col-6" style="margin-top: 10px">
                <q-input outlined v-model="cent" label="Cent"/>
              </div>
              <div class="col-6" style="padding-left: 10px; margin-top: 10px">
                <q-input outlined v-model="findMember" label="Найти участника"/>
              </div>
            </div>
          </q-card-section>
          <q-card-actions>

            <q-space/>

            <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
  name: 'Index',
  data() {
    return {
      ether: ref(''),
      program: ref(''),
      cent: ref(''),
      findMember: ref(''),
    };
  },
  methods: {
    save() {
      const data = {
        ether: this.ether,
        program: this.program,
        cent: this.cent,
        findMember: this.findMember,
      };
      this.$store.dispatch('baseKeyboards/saveBaseKeyboards', data);
    },
  },
  created() {
    this.$store.dispatch('baseKeyboards/getBaseKeyboards')
      .then((res) => {
        res.data.data.forEach((element) => {
          if (element.type === 'ether') {
            this.ether = element.name;
          } else if (element.type === 'program') {
            this.program = element.name;
          } else if (element.type === 'cent') {
            this.cent = element.name;
          } else if (element.type === 'findMember') {
            this.findMember = element.name;
          }
        });
      });
  },
};
</script>

<style scoped>

</style>
