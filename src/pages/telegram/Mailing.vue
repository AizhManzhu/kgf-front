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
                <q-select v-model="templateRow" :options="templateRows" label="Шаблон"/>
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
            <q-btn v-if="$can('can-mailing')" flat color="primary" v-on:click="send" :disabled="isLoading">Отправить</q-btn>
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
  name: 'Mailing',
  data() {
    const filters = ref([{
      value: 'All',
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
    return {
      filters,
      filter: ref(null),
      templateRows: ref([]),
      templateRow: ref(null),
      memberGroups: ref([]),
      memberGroup: ref([]),
      options: ref([]),
      isLoading: ref(false),
      templateId: ref(null),
      text: ref(''),
    };
  },
  methods: {
    async listOfGroups() {
      const url = '/api/event-telegram-members';
      await api.get(url)
        .then((res) => {
          if (res.data.success) {
            res.data.data.forEach((element) => {
              this.memberGroups.push({
                value: element.telegram_id,
                label: `${element.first_name} ${element.last_name}`,
                description: element.text,
              });
              this.options = this.memberGroups;
              console.log(this.memberGroups);
            });
          }
        });
    },
    async listOfTemplate() {
      const url = '/api/templates';
      await api.get(url)
        .then((res) => {
          if (res.data.success) {
            res.data.data.data.forEach((element) => {
              this.templateRows.push({
                value: element.id,
                label: element.name.slice(0, 30),
                description: element.text,
              });
            });
          }
        });
    },
    uploadFile(file) {
      [this.image] = file;
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
        this.memberGroups = this.options.filter((v) => v.label.toLowerCase()
          .indexOf(needle) > -1);
      });
    },
    send() {
      this.isLoading = true;
      const fd = new FormData();
      if ((this.filter) && (this.filter.value.toString().length === 0) && this.memberGroup.length === 0) {
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
      if (this.filter) {
        fd.append('filter', this.filter.value);
      }
      api.post('/api/v1/mailing', fd)
        .then((res) => {
          Notify.create({
            message: 'Сообщение отправлено',
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.listOfTemplate();
    this.listOfGroups();
  },
  watch: {
    templateRow() {
      this.text = this.templateRow.description;
    },
  },
};
</script>

<style scoped>

</style>
