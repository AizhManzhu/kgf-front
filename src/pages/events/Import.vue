<template>
  <q-page class="q-page-container card">
    <q-page padding>
      <q-btn href="template.xlsx" label="Скачать шаблон" icon-right="archive" color="primary"/>
      <q-uploader
        extensions=".xsl, .csv, .xslx"
        :factory="uploadFile"
        ref="uploader"
        multiple
        max-files="1"
        auto-expand
        url=""
        stack-label="upload excel file"
        style="width: 100%; margin-top: 10px"
      />
    </q-page>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';

export default {
  name: 'Import',
  methods: {
    uploadFile(file) {
      const fd = new FormData();
      fd.append('file', file[0]);
      return new Promise((resolve, reject) => {
        api.post(`/api/v1/event/import-member/${this.$route.params.id}`, fd,
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
  },
};
</script>

<style scoped>

</style>
