<template>
  <div class="row justify-between q-gutter-sm">
    <div class="col-5 q-md-sm">
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
    <div class="col-6 q-md-sm">
      <q-timeline color="secondary">
        <q-timeline-entry v-for="(speaker, index) in speakers" :key="speaker.id" :title="speaker.start_at" >
          <div class="row">
            <div class="col-6">
              <q-img style=""
                     :src="thumbnail + speaker.image_path">
                <q-badge v-if="$can('delete-speaker')" style="cursor: pointer" color="negative" v-on:click="deleteSpeaker(speaker.id, index)">x</q-badge>
              </q-img>
            </div>
            <div class="col-6" style="padding-left: 10px">
              <q-checkbox v-if="$can('set-speaker') || speaker.is_current" :disable="speaker.is_current" dense v-model="speaker.is_current"
                          v-on:click="makeCurrentSpeaker(speaker.id, speaker.event_id)" label="Текущий спикер" color="primary"/>
              <div>{{speaker.description}}</div>
            </div>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'Step4',
  data() {
    return {
      is_current_speaker: ref(false),
      speakers: ref([]),
      thumbnail: `${window.location.origin}/storage/thumbnail/`,
      speaker_description: ref(''),
      time: ref(''),
      validate: ref(true),
    };
  },
  methods: {
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
      if (!this.$route.can('upload-speaker')) {
        Notify.create({
          message: 'У вас нет прав на загрузку спикеров',
          color: 'negative',
        });
        return 0;
      }
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
            this.speakers = [];
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

    deleteSpeaker(id, index) {
      this.$store.dispatch('events/deleteSpeaker', id).then((res) => {
        this.speakers.splice(index, 1);
      });
    },
    getSpeakers() {
      this.$store.dispatch('events/getSpeakers', this.$route.params.id).then((res) => {
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
    this.getSpeakers();
  },
};
</script>

<style scoped>

</style>
