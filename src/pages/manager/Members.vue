<template>
  <q-page class="q-page-container">
    <div class="q-pa-md row">
      <q-card class="my-card" style="width: 100%;">
        <q-card-section>
          <q-input bottom-slots v-model="searchValue" label="Поиск">
            <template v-slot:hint>
              Введите Фамилию и Имя
            </template>

            <template v-slot:after>
              <q-btn round dense flat icon="search" v-on:click="search"/>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <div v-if="members !== 0" style="width: 100%; margin-top: 1vh">
        <q-card class="my-card" style="margin-bottom: 0.5vh" v-for="member in members" v-bind:key="member.id">
          <q-card-section style="display: flex; justify-content: space-between">
            <span>{{member.event_member_id}}: {{member.first_name}} {{member.last_name}} <span v-if="member.telegram_id === undefined" style="color: red">Участник не авторизован в телеграм боте</span></span>
            <q-btn dense flat v-on:click="heIsHere(member)" v-if="member.here === 0">Отметить</q-btn>
            <q-btn round dense flat icon="qr_code_2" v-on:click="generateQR(member.id)"></q-btn>
            <q-dialog v-model="showDialog" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span v-html="imageSvg">
                  </span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Закрыть" color="primary" v-on:click="closeDialog"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'Members',
  data() {
    return {
      searchValue: ref(''),
      members: ref(0),
      showDialog: ref(false),
      imageSvg: ref(''),
    };
  },
  methods: {
    search() {
      api.get(`/api/search/member?search=${this.searchValue}`)
        .then((res) => {
          this.members = res.data;
        })
        .catch((error) => {
          Notify.create({
            message: 'Что-то пошло не так!',
            color: 'negative',
          });
        });
    },
    heIsHere(member) {
      api.get(`/api/set/member/here?event_member_id=${member.event_member_id}`)
        .then((res) => {
          member.here = 1;
          Notify.create({
            message: 'Сохранено',
            color: 'positive',
          });
        });
    },
    generateQR(id) {
      api.get(`/api/qr/generate?id=${id}`)
      .then((res) => {
        this.showDialog = true;
        this.imageSvg = res.data;
      });
    },
    closeDialog() {
      this.showDialog = false;
      this.imageSvg = '';
    },
  },
};
</script>

<style scoped>

</style>
