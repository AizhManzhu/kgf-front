<template>
  <q-page class="q-page-container q-pa-md">
    <div class="row">
      <div class="col-12">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6"><b>Telegram</b> Рассылка</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="q-gutter-sm">
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <q-select v-model="row" :options="rows" label="Шаблон"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-select v-model="filter" :options="filters" label="Фильтр"/>
              </div>
              <div class="col-xs-12 col-md-6" style="margin-top: 10px; margin-bottom: 10px">
                <q-select
                  v-model="memberGroup"
                  multiple
                  :options="memberGroups"
                  input-debounce="0"
                  @filter="filterFn"
                  use-input
                  label="Участники"
                />
                <q-toggle
                  v-model="getIn"
                  label="Отправить с кнопкой участвую"
                />
<!--                <q-select-->

<!--                  outlined-->
<!--                  v-model="competition"-->
<!--                  :options="competitions"-->
<!--                  input-debounce="0"-->
<!--                  @filter="filterFn"-->
<!--                  use-input-->
<!--                  label="Конкурс"-->
<!--                />-->
              </div>
              <div class="col-xs-12 col-md-6" style="margin-bottom: 10px">
                <q-uploader
                  extensions=".jpg, .jpeg"
                  :factory="uploadFile"
                  ref="uploader"
                  auto-upload
                  max-files="1"
                  auto-expand
                  stack-label="upload image"
                  style="width: 100%; margin-top: 10px"
                />
              </div>
              <div class="col-12">
                <q-editor
                  v-model="text"
                  :toolbar="[
                    ['bold', 'italic', 'underline', 'link'],
                    ['quote', 'unordered', 'ordered']
                  ]"
                  :paragraph-tag="'p'"
                />
              </div>
            </div>
            <q-btn flat color="primary" v-on:click="send" :disabled="isLoading">Отправить</q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export default {
  name: 'Index',
  data() {
    const button = ref(null);
    const buttons = ref([]);
    const row = ref(null);
    const filter = ref(null);
    const rows = ref([]);
    const event = ref(null);
    const events = ref([]);
    const filters = ref([{
        value: '0:All',
        label: 'Всем',
    },
      {
        value: 'online',
        label: 'Онлайн',
      },
      {
        value: 'offline',
        label: 'Оффлайн',
      },
      {
        value: 'need_mentor',
        label: 'Нужен Ментор',
      },
      {
        value: 'dont_need_mentor',
        label: 'Не Нужен Ментор',
      },
      {
        value: 'sponsor',
        label: 'Спонсор',
      },
      {
        value: 'no_sponsor',
        label: 'Не Спонсор',
      },
    ]);
    const memberGroup = ref([]);
    const memberGroups = ref([]);
    const options = ref([]);
    const competition = ref();
    const competitions = ref([]);
    async function listOfTemplate() {
      const url = '/api/templates';
      await api.get(url)
        .then((res) => {
          if (res.data.success) {
            res.data.data.data.forEach((element) => {
              rows.value.push({
                value: element.id,
                label: element.name.slice(0, 30),
                description: element.text,
              });
            });
          }
        });
    }
    async function listOfFilters() {
      const url = '/api/fields/filter';
      await api.post(url)
        .then((res) => {
          if (res.data.success) {
            res.data.data.forEach((element) => {
              element.buttons.forEach((element2) => {
                filters.value.push({
                  value: `${element.id}:${element2.text}`,
                  label: `${element.name}:${element2.text}`,
                  description: element.text,
                });
              });
            });
          }
        });
    }
    async function listOfGroups() {
      const url = '/api/event-telegram-members';
      await api.get(url)
        .then((res) => {
          if (res.data.success) {
            res.data.data.forEach((element) => {
              memberGroups.value.push({
                value: element.telegram_id,
                label: `${element.first_name} ${element.last_name}`,
                description: element.text,
              });
              options.value = memberGroups.value;
            });
          }
        });
    }
    async function listOfCompetition() {
      const url = '/api/event-competitions';
      await api.get(url)
        .then((res) => {
        if (res.data.success) {
            res.data.data.forEach((element) => {
                competitions.value.push({
                  value: element.id,
                  label: element.stage_name,
                  description: element.description,
                });
                // options.value = competitions.value;
            });
        }
        });
    }
    return {
      buttons,
      button,
      rows,
      row,
      events,
      event,
      filters,
      filter,
      listOfTemplate,
      // listOfFilters,
      listOfGroups,
      listOfCompetition,
      radio: ref('standard'),
      text: ref(''),
      inlineButtons: ref(null),
      options,
      memberGroup,
      memberGroups,
      competition: ref(''),
      competitions,
      image: null,
      isLoading: ref(false),
      getIn: ref(false),
      sendToAll: ref(false),
      templateId: ref(null),
    };
  },
  created() {
    this.listOfTemplate();
    // this.listOfFilters();
    this.listOfGroups();
    this.listOfCompetition();
  },
  methods: {
    uploadFile(file) {
      [this.image] = file;
    },
    send() {
      this.isLoading = true;
      const fd = new FormData();
      if (this.getIn || this.sendToAll) {
        fd.append('image', this.image);
        fd.append('text', this.text);
        fd.append('send_to_all', this.sendToAll);
        api.post('/api/mailing-to-not-event-members', fd)
          .then((res) => {
            Notify.create({
              message: 'Сообщение отправлено',
            });
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
          });
      } else {
        let fieldId = null;
        let buttonValue = null;
        if (this.filter != null) {
          [fieldId, buttonValue] = this.filter.value.split(':');
        }
        if ((fieldId == null && buttonValue == null) && this.memberGroup.length === 0) {
          Notify.create({
            color: 'negative',
            message: 'Выберите участников или фильтр',
          });
          return;
        }
        const members = this.memberGroup.map((element) => element.value);
        fd.append('image', this.image);
        fd.append('text', this.text);
        fd.append('members', members);
        fd.append('field_id', fieldId);
        fd.append('template_id', this.templateId);
        fd.append('button_value', buttonValue);
        fd.append('competition', this.competition.value);
        api.post('/api/mailing', fd)
          .then((res) => {
            Notify.create({
              message: 'Сообщение отправлено',
            });
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
          });
      }
    },

    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.memberGroups = this.options;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.memberGroups = this.options.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },
  },
  watch: {
    row() {
      this.text = this.row.description;
      this.templateId = this.row.value;
    },
  },
};
</script>

<style scoped>

</style>
