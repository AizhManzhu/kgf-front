<template>
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
</template>

<script>
import { ref } from '@vue/reactivity';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'Step3',
  data() {
    return {
      image_name: ref(null),
      thumbnail: `${window.location.origin}/storage/thumbnail/`,
    };
  },
  methods: {
    uploadFile(file) {
      if (!this.$ability.can('upload-event-program')) {
        Notify.create({
          message: 'У вас нет прав на загрузку программу',
          color: 'negative',
        });
        return 0;
      }
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
    getProgram() {
      this.$store.dispatch('events/getProgram', this.$route.params.id).then((res) => {
        this.image_name = res.data.data.path;
      });
    },
  },
  created() {
    this.getProgram();
  },
};
</script>

<style scoped>

</style>
