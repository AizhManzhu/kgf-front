<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          KGF
        </q-toolbar-title>

        <div>KGF v0.0.1</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginLayout',

  setup() {
    return {
    };
  },
});
</script>
