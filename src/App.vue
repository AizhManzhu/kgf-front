<template>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'App',
  created() {
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.common.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    api.interceptors.response.use(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      },
      // eslint-disable-next-line consistent-return
      (error) => {
        if (error.response.status) {
          // eslint-disable-next-line default-case
          switch (error.response.status) {
            case 401:
              window.location.href = `${window.location.origin}#/login`;
              break;
            case 403:
              localStorage.clear();
              window.location.href = `${window.location.origin}#/login`;
              break;
          }
          return Promise.reject(error.response);
        }
      },
    );
  },
});
</script>
