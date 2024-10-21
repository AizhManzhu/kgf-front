<template>
  <q-table
    title="Мероприятия"
    :rows="rows"
    :columns="eventColumns"
    row-key="events"
  />
</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export default {
  name: 'MemberEvents',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    const eventColumns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: false,
      },
      {
        name: 'title',
        align: 'left',
        label: 'Название',
        field: 'title',
      },
    ];
    return {
      eventColumns,
      rows: ref([]),
    };
  },
  methods: {
    async getMemberEvents() {
      api.get(`api/members/get-events/${this.id}`)
        .then((res) => {
          res.data.data.forEach((el) => {
            this.rows.push({
              id: el.id,
              title: el.title,
            });
          });
        })
        .catch((er) => {
          Notify.create({
            message: er.message,
            color: 'negative',
          });
        });
    },
  },
  created() {
    this.getMemberEvents();
  },
};
</script>

<style scoped>

</style>
