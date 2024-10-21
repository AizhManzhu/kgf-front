<template>
  <q-page class="q-page-container">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-7">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-h6" style="padding-left:15px">Создать Мероприятие: {{name}}</div>
            </q-card-section>
            <q-card-section class="column">
              <div class="row">
                <div class="col-6">
                  <q-input outlined v-model="name" label="Название" />
                </div>
              </div>
              <div class="row" style="margin-top: 20px">
                <div class="col-12">
                  <q-editor
                    v-model="text"
                    :toolbar="[
                      ['bold', 'italic', 'underline']
                    ]"
                  />
                </div>
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn flat color="warning" label="Назад" :href="'#/templates'"/>

              <q-space/>

              <q-btn flat color="primary" v-if="$can('update-template')" label="Сохранить" v-on:click="save()"/>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-5" style="padding-left: 20px">
          <q-card class="my-card" flat bordered>
            <q-img
              src="telegram_background.png"
            >
              <div class="absolute-top" style="padding-top: 0 !important; padding-bottom: 0 !important; background-color: white !important;">
                <div class="flex">
                  <q-btn icon="arrow_back" flat
                         style="
                          color: grey;
                          padding-left: 10px !important;
                          padding-right: 10px !important;"/>
                  <q-btn icon="hdr_auto" flat color="black" size="20px" style="padding: 0!important;"></q-btn>
                  <div style="padding-left: 20px">
                    <div style="padding-top: 8px; font-size: 14px; color: black"><b>Kazakhstan Growth For...</b></div>
                    <div style="font-size: 11px; color: black">bot</div>
                  </div>
                </div>
              </div>
              <div style="position: absolute; top: 50%; left: 0 !important; right: 0 !important; background-color: transparent!important;">
                <div class="row">
                  <div class="col-11" style="display: flex">
                    <q-btn icon="hdr_auto" flat color="black" size="20px" style="padding: 0!important;"></q-btn>
                    <q-card class="my-card" style="margin-left: 10px!important; padding-left:10px; width: 100%">
                      <q-card-section style="padding-left: 0 !important;">
                        <span style="color: black" v-html="text"></span>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Item',
  data() {
    return {
      name: '',
      text: '',
      id: 0,
    };
  },
  methods: {
    save() {
      const data = {
        name: this.name,
        text: this.text,
        id: this.id,
      };
      this.$store.dispatch('templates/save', data);
    },
  },
  created() {
    this.$store.dispatch('templates/getItemById', { id: this.$route.params.id })
      .then((res) => {
        this.name = res.data.data.name;
        this.text = res.data.data.text;
        this.id = res.data.data.id;
      });
  },
};
</script>

<style scoped>

</style>
