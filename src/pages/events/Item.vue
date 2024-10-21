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
        :title="'Мероприятие: ' + title"
        icon="settings"
      >
        <div class="q-pa-md row">
          <div class="row">
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="title" label="Название"/>
            </div>
            <div class="col-6 q-pa-md">
              <q-input outlined v-model="address" label="Адрес"/>
            </div>
            <div class="col-6 q-pa-md">
              <q-toggle
                v-model="is_current"
                label="Текущее событие"
              />
            </div>
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="description" label="Описание" type="textarea"/>
            </div>
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="welcome_message" label="Welcome Message" type="textarea" />
            </div>
            <div class="col-12 q-pa-md">
              <q-input outlined v-model="thank_you_message" label="Thank You Message" type="textarea" />
            </div>
            <q-btn flat color="warning" label="Назад" :href="'#/events'"/>

            <q-space/>

            <q-btn flat color="primary" label="Отчет" v-on:click="exportReport()"/>
            <q-space/>
            <q-btn flat color="primary" label="Сохранить" v-on:click="save()"/>
          </div>
        </div>
      </q-step>
      <q-step
        :name="2"
        title="Участники"
        icon="groups"
      >
          <q-page class="q-page-container">
            <div class="q-pa-md">

              <q-table
                title="Участники"
                :rows="rowsMember"
                :columns="columnsMember"
                row-key="id"
                selection="multiple"
                :filter="filter"
                v-model:pagination="pagination"
                v-model:selected="selected"
              >
              <template v-slot:body-cell-activatedOrNot="props">
                <q-td :props="props">
                <q-toggle
                  v-model="props.row.is_activated"
                  disable
                  checked-icon="check"
                  color="green"
                  unchecked-icon="clear"
                />
                </q-td>
              </template>
                <template v-slot:body-cell-paid="props">
                  <q-td :props="props">
                    <span v-if="props.row.paid===1">Оплачено</span>
                    <span v-else>Не оплачено</span>
                  </q-td>
                </template>
              <template v-slot:top-left>
                <div style="font-size: 1.2rem">Участники</div>
                <div style="margin-top: 5px"><q-btn
                    color="positive"
                    label="Выгрузить участников"
                    no-caps
                    v-on:click="exportMembers()"
                  /></div>

                </template>
                <template v-slot:top-right>
                  <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                  <q-btn
                    style="margin-left: 30px"
                    color="primary"
                    label="Активировать"
                    no-caps
                    v-on:click="activateMembers()"
                  />
                </template>
                <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn
                        color="primary"
                        icon-right="create"
                        no-caps
                        flat
                        dense
                        @click="editFieldsOfMember(props)"
                      />
                      <q-btn
                        color="negative"
                        icon-right="delete"
                        no-caps
                        flat
                        dense
                        @click="deleteMember(props)"
                      />
                    </q-td>
              </template>
              </q-table>
            </div>
          </q-page>
        <q-btn flat color="primary" :href="'#/events/add-member/'+$route.params.id">Добавить участника +</q-btn>
      </q-step>
      <q-step
        :name="3"
        title="Программа"
        icon="wysiwyg"
      >
        <div class="row jutify-center q-gutter-sm">
          <div class="q-ma-sm" style="width: 30%">
            <q-card class="my-card">
              <q-img style="" v-if="image_name!=null" :height="100"
                     :src="thumbnail + image_name">
                <div class="absolute-bottom text-subtitle2 text-center" style="background-color: black">
                  Программа
                </div>
              </q-img>
            </q-card>
            <q-uploader
              extensions=".jpg, .jpeg"
              :factory="uploadFile"
              ref="uploader"
              multiple
              max-files="1"
              auto-expand
              url=""
              stack-label="upload image"
              style="width: 100%; margin-top: 10px"
            />
          </div>
        </div>
      </q-step>
      <q-step
        :name="4"
        title="Cпикеры"
        icon="person"
      >
        <div class="row justify-between q-gutter-sm">
          <div class="col-md-4 q-md-sm">
            <q-checkbox dense v-model="is_current_speaker" label="Текущий спикер" color="primary" />
            <q-input outlined v-model="speaker_description" label="Описание" type="textarea"/>
            <q-input
              filled
              v-model="time"
              label="Время"
              mask="time"
              :hint="validateTime()"
              :error="!validate"
            />
            <q-uploader
              extensions=".jpg, .jpeg"
              :factory="uploadSpeaker"
              ref="uploader"
              auto-expand
              multiple
              max-files="1"
              url=""
              stack-label="upload image"
              style="width: 100%; margin-top: 10px"
            />
          </div>
          <div class="col-md-7 q-md-sm">
            <q-timeline color="secondary">
              <q-timeline-entry v-for="(speaker, index) in speakers" :key="speaker.id" :title="speaker.start_at" >
                <div class="row">
                  <div class="col-md-4">
                    <q-img style=""
                           :src="thumbnail + speaker.image_path">
                      <q-badge color="negative" v-on:click="deleteSpeaker(speaker.id, index)">x</q-badge>
                    </q-img>
                  </div>
                  <div class="col-md-7" style="padding-left: 10px">
                    <q-checkbox :disable="speaker.is_current" dense v-model="speaker.is_current"
                                v-on:click="makeCurrentSpeaker(speaker.id, speaker.event_id)" label="Текущий спикер" color="primary"/>
                    <div>{{speaker.description}}</div>
                  </div>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </div>
      </q-step>
      <q-step
        :name="5"
        title="Кнопки для фильтра"
        icon="keyboard_command_key">
        <div>
          <q-btn color="primary" v-on:click="addField()">+ Создать</q-btn>
          <q-table
            :rows="fields"
            :columns="fieldColumns"
            row-key="name"
          >
            <template v-slot:body-cell-type="props">
              <q-td :props="props">
                <q-badge color="primary" v-if="props.row.type==='button'">
                  Кнопка
                </q-badge>
                <q-badge color="orange" v-else>
                  Текст
                </q-badge>
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  color="primary"
                  icon-right="create"
                  no-caps
                  flat
                  dense
                  @click="onRowClick(props)"
                />
                <q-btn
                  color="negative"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deleteItem(props)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </q-step>
      <q-step
        :name="6"
        title="Конкурс"
        icon="emoji_events">
      <div class="q-pa-md">
      <q-table
        title="Конкурс"
        :rows="rowsCompetition"
        :columns="columsCompetition"
        row-key="event"
        v-model:pagination="initialPagination"
        @request="onRequest"
      >
        <template v-slot:top-left>
                <div style="font-size: 1.2rem">Конкурс</div>
                <div class="row">
                  <div style="margin-top: 5px"><q-btn
                    color="positive"
                    label="Выгрузить участников"
                    no-caps
                    v-on:click="exportCompetitionMembers()"
                  />
                </div>
                <div style="margin-top: 5px; margin-left: 10px"><q-btn
                    color="primary"
                    label="Логи"
                    no-caps
                    v-on:click="exportLogCompetition()"
                  />
                </div>
                <div style="margin-top: 5px; margin-left: 10px"><q-btn
                    color="negative"
                    label="Результаты"
                    no-caps
                    v-on:click="exportResultOfCompetition()"
                  />
                </div>
                </div>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon="add_circle"
            label="Создать"
            no-caps
            v-on:click=addStage()
          />
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
              @click="onRowCompetitionClick(props)"
            />
            <q-btn
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deleteCompetitionItem(props)"
            />
          </q-td>
        </template>
      </q-table>
    </div>

      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { ref } from '@vue/reactivity';
import { api } from 'boot/axios';

export default {
  name: 'Item',
  data() {
    const columsCompetition = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'stageName',
        required: true,
        label: 'Этап',
        align: 'left',
        field: 'stageName',
        sortable: true,
      },
      {
        name: 'description',
        required: true,
        label: 'Описание',
        align: 'left',
        field: 'description',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Действия',
        field: 'action',
      },
    ];

    const columnsMember = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: 'ФИО',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'utm',
        align: 'left',
        label: 'UTM',
        field: 'utm',
        sortable: true,
      },
      {
        name: 'format',
        align: 'left',
        label: 'Формат',
        field: 'format',
        sortable: true,
      },
      {
        name: 'paid',
        align: 'left',
        label: 'Оплачено',
        field: 'paid',
        sortable: true,
      },
      {
        name: 'promocode',
        align: 'left',
        label: 'Промокод',
        field: 'promocode',
      },
      {
        name: 'email',
        align: 'left',
        label: 'e-mail',
        field: 'email',
        sortable: true,
      },
      {
        name: 'phone',
        align: 'left',
        label: 'Номер телефона',
        field: 'phone',
        sortable: true,
      },
      {
        name: 'company',
        align: 'left',
        label: 'Компания',
        field: 'company',
        sortable: true,
      },
      {
        name: 'position',
        align: 'left',
        label: 'Должность',
        field: 'position',
      },
      {
        name: 'activatedOrNot',
        align: 'center',
        label: 'Активация',
        field: 'action',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Действия',
        field: 'action',
      },
    ];

    const pagination = ref({
      rowsPerPage: 10,
    });
    const fieldColumns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
      },
      {
        name: 'name',
        required: true,
        label: 'Название',
        align: 'left',
        field: 'name',
      },
      {
        name: 'text',
        align: 'left',
        label: 'Отправляемый текст',
        field: 'text',
      },
      {
        name: 'type',
        align: 'left',
        label: 'Тип',
        field: 'type',
      },
      {
        name: 'action',
        align: 'left',
        label: 'Действия',
        field: 'action',
      },
    ];
    return {
      pagination,
      filter: ref(''),
      activatedOrNot: ref(true),
      selected: ref([]),
      columnsMember,
      columsCompetition,
      rowsCompetition: ref([]),
      rowsMember: ref([]),
      fieldColumns,
      event: ref(''),
      title: ref(''),
      description: ref(''),
      id: ref(0),
      event_date: ref(''),
      address: ref(''),
      is_current: ref(0),
      members: ref([]),
      thumbnail: `${window.location.origin}/storage/thumbnail/`,
      token: `Bearer ${localStorage.getItem('token')}`,
      selected_file: '',
      check_if_document_upload: false,
      image_name: ref(null),
      step: ref(1),
      speakers: ref([]),
      time: ref(''),
      validate: ref(true),
      fields: ref(null),
      field_text: ref(''),
      field_name: ref(''),
      thank_you_message: ref(''),
      welcome_message: ref(''),
      speaker_description: ref(''),
      is_current_speaker: ref(false),
    };
  },
  methods: {

    addStage() {
      window.location.href = `${window.location.origin}#/events/${this.$route.params.id}/createCompetition`;
    },
    editFieldsOfMember(evt) {
      window.location.href = `${window.location.origin}#/events/member/${evt.row.id}`;
    },

    deleteMember(evt, row) {
            this.$store.dispatch('events/deleteMember', { id: this.$route.params.id, member_id: evt.row.id }).then((res) => {
              this.rowsMember.splice(evt.rowIndex, 1);
            });
    },

    exportMembers() {
        this.$store.dispatch('events/exportEventMembers', { id: this.$route.params.id }).then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'Участники.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
              });
    },

    exportCompetitionMembers() {
        this.$store.dispatch('events/exportCompetitionMembers', { id: this.$route.params.id }).then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'УчастникиКонкурса.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
              });
    },
    exportLogCompetition() {
          this.$store.dispatch('events/exportlogCompetition', { id: this.$route.params.id }).then((res) => {
                    const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'ЛогКонкурса.xlsx');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                        });
    },
    exportResultOfCompetition() {
          this.$store.dispatch('events/exportResultOfCompetition', { id: this.$route.params.id }).then((res) => {
                    const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'РезультатКонкурса.xlsx');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                        });
    },
    exportReport() {
      this.$store.dispatch('events/exportReport').then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Отчет.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },

    activateMembers() {
      const membersId = [];

      this.selected.forEach((element) => {
          membersId.push(element.id);
      });

      this.$store.dispatch('events/activateMembers', { id: this.$route.params.id, members: membersId }).then((res) => {
          if (res.data.data) {
            this.rowsMember = [];
              res.data.data.forEach((element) => {
                    this.rowsMember.push({
                      id: element.member.id,
                      name: `${element.member.first_name} ${element.member.last_name}`,
                      username: element.member.username,
                      email: element.member.email,
                      phone: element.member.phone,
                      company: element.member.company,
                      position: element.member.position,
                      is_activated: Boolean(element.is_activated),
                      paid: element.paid,
                      utm: element.utm,
                      field_values: element.member.field_values,
                      field_vip_values: element.member.field_vip_values,
                    }); // what to push unto the rows array?
                  });
          }
      });
    },
    save() {
      const data = {
        event: this.event,
        title: this.title,
        description: this.description,
        event_date: this.event_date,
        address: this.address,
        is_current: this.is_current ? 1 : 0,
        id: this.id,
        welcome_message: this.welcome_message,
        thank_you_message: this.thank_you_message,
      };
      this.$store.dispatch('events/save', data);
    },
    uploadFile(file) {
      const fd = new FormData();
      fd.append('program_image', file[0]);
      return new Promise((resolve, reject) => {
        api.post(`/api/events/upload/${this.$route.params.id}`, fd,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            this.image_name = res.data.data.image;
            resolve(file);
          })
          .catch((err) => reject(err));
      });
    },
    deleteSpeaker(id, index) {
      this.$store.dispatch('events/deleteSpeaker', id).then((res) => {
        this.speakers.splice(index, 1);
      });
    },
    validateTime() {
      let maskTime;
      // eslint-disable-next-line prefer-const
      maskTime = this.time.split(':');
      if (maskTime[1] > 59) {
        this.validate = false;
        return 'Укажите минуту до 60';
      }
      if (maskTime[0] > 23) {
        this.validate = false;
        return 'Укажите час до 24';
      }
      this.validate = true;
      return 'Укажите в формате 23:59';
    },
    uploadSpeaker(file) {
      const fd = new FormData();
      fd.append('speaker_image', file[0]);
      fd.append('start_at', this.time);
      fd.append('description', this.speaker_description);
      fd.append('is_current', this.is_current_speaker ? 1 : 0);
      fd.append('event_id', this.$route.params.id);
      return new Promise((resolve, reject) => {
        api.post('/api/speakers', fd,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((res) => {
            res.data.data.speakers.forEach((element) => {
              this.speakers.push({
                id: element.id,
                image_path: element.image_path,
                start_at: element.start_at,
                event_id: element.event_id,
                is_current: Boolean(element.is_current),
                description: element.description,
              });
            });
            resolve(file);
          })
          .catch((err) => reject(err));
      });
    },
    addField() {
      window.location.href = `${window.location.origin}#/fields/create`;
    },

    onRowClick(evt) {
      window.location.href = `${window.location.origin}#/fields/${evt.row.id}`;
    },
    deleteItem(evt) {
      this.$store.dispatch('fields/destroy', { id: evt.row.id }).then(() => {
        this.fields.splice(evt.rowIndex, 1);
      });
    },

    onRowCompetitionClick(evt) {
      window.location.href = `${window.location.origin}#/events/${this.$route.params.id}/competition/${evt.row.id}`;
    },
    deleteCompetitionItem(evt) {
      this.$store.dispatch('competitions/destroy', { id: evt.row.id }).then(() => {
        this.rowsCompetition.splice(evt.rowIndex, 1);
      });
    },
    async makeCurrentSpeaker(id, eventId) {
      const data = {
        id,
        eventId,
      };
      await api.post('api/speakers/make-current', data).then((res) => {
        this.speakers = [];
        res.data.data.forEach((element) => {
          this.speakers.push({
            id: element.id,
            image_path: element.image_path,
            start_at: element.start_at,
            event_id: element.event_id,
            is_current: Boolean(element.is_current),
            description: element.description,
          });
        });
      });
    },
  },
  created() {
    this.$store.dispatch('events/getItemById', { id: this.$route.params.id })
      .then((res) => {
        this.event = res.data.data.event;
        this.title = res.data.data.title;
        this.description = res.data.data.description;
        this.event_date = res.data.data.event_date;
        this.address = res.data.data.address;
        this.is_current = res.data.data.is_current === 1;
        this.id = res.data.data.id;
        this.members = res.data.data.event_members;
        this.image_name = res.data.data.image;
        // eslint-disable-next-line array-callback-return
        res.data.data.speakers.forEach((element) => {
           this.speakers.push({
             id: element.id,
             image_path: element.image_path,
             start_at: element.start_at,
             event_id: element.event_id,
             is_current: Boolean(element.is_current),
             description: element.description,
          });
        });
        this.fields = res.data.data.fields;
        this.welcome_message = res.data.data.welcome_message;
        this.thank_you_message = res.data.data.thank_you_message;
        if (res.data.data.event_members) {
            res.data.data.event_members.forEach((element) => {
              let promocode = null;
              let memberFormat = 'Онлайн';
              if (element.member_promocode != null) {
                promocode = element.member_promocode.code;
              }
              if (element.field_vip_values.length > 0) {
                element.field_vip_values.forEach((subElement) => {
                  console.log(subElement);
                  if (subElement.field_id === 28) {
                    memberFormat = subElement.value;
                  }
                });
              }
              console.log(memberFormat, element.paid);
              if ((memberFormat === 'Оффлайн' && element.paid === 1) || (memberFormat === 'Онлайн' && element.paid === null)) {
                this.rowsMember.push({
                  id: element.id,
                  name: `${element.first_name} ${element.last_name}`,
                  username: element.username,
                  email: element.email,
                  phone: element.phone,
                  company: element.company,
                  position: element.position,
                  is_activated: Boolean(element.is_activated),
                  utm: element.utm,
                  paid: element.paid,
                  field_values: element.field_values,
                  field_vip_values: element.field_vip_values,
                  format: memberFormat,
                  promocode,
                }); // what to push unto the rows array?
              }
            });
        }
        if (res.data.data.competitions) {
          res.data.data.competitions.forEach((element) => {
              this.rowsCompetition.push({
                id: element.id,
                stageName: element.stage_name,
                description: element.description,
              });
          });
        }
      });
  },
};
</script>

<style scoped>

.example-item {
  width: 40%;
}
</style>
