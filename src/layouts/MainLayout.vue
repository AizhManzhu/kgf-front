<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          KGF
        </q-toolbar-title>

        <q-icon style="cursor: pointer" name="logout" v-on:click="logout()"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Меню
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :gate="link.gate"/>
      </q-list>
    </q-drawer>

    <q-page-container style="background-color:#f5f5f5">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Мероприятия',
    caption: '',
    icon: 'local_activity',
    link: '#/events',
    gate: 'read-event',
  },
  {
    title: 'Участники',
    caption: '',
    icon: 'groups',
    link: '#/members',
    gate: 'read-member',
  },
  {
    title: 'Telegram',
    caption: 'Telegram рассылка',
    icon: 'telegram',
    link: '#/telegram',
    gate: 'can-mailing',
  },
  {
    title: 'Шаблоны',
    caption: 'готовые тексты и кнопки для рассылок',
    icon: 'wysiwyg',
    link: '#/templates',
    gate: 'read-template',
  },
  {
    title: 'PromoCode',
    icon: 'code',
    link: '#/promocodes',
    gate: 'read-promocode',
  },
  {
    title: 'Настройки',
    caption: 'Настройки регистрации и так далее.',
    icon: 'settings',
    link: '#/settings',
    gate: 'settings',
  },
];

import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    logout() {
      api.post('/api/v1/logout')
        .then((res) => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          window.location.href = '#/login';
        });
    },
  },
  watch: {
    $route: {
      handler() {
        api.get('/api/v1/abilities')
          .then((res) => {
            this.$ability.update([
              { subject: 'all', action: res.data },
            ]);
            console.log(this.$ability.can('read-member'));
          });
      },
      immediate: true,
    },
  },
});
</script>
