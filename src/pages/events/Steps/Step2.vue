<template>
  <div>
    <q-table
      title="Участники"
      :rows="rowsMember"
      :columns="columnsMember"
      row-key="id"
      selection="multiple"
      :filter="filter"
      v-model:pagination="pagination"
      v-model:selected="selected"
      table-class="no-border"
      bordered
      :visible-columns="visibleColumns"
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
      <template v-slot:body-cell-member_id="props">
        <q-td :props="props">
          <a :href="'#/members/'+props.row.member_id">{{props.row.member_id}}</a>
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
      </template>
      <template v-slot:top-right>
        <q-btn
          style="margin-right: 1vw"
          color="primary"
          icon-right="file_upload"
          tool
          no-caps
          v-if="$can('export-event-member')"
          v-on:click="exportMembers()"
        >
          <q-tooltip>
            Выгрузить участников
          </q-tooltip>
        </q-btn>
        <q-btn
          style="margin-right: 1vw"
          color="primary"
          icon-right="file_download"
          no-caps
          v-if="$can('import-event-member-report')"
          :href="'#/events/'+$route.params.id+'/import-member'"
        >
          <q-tooltip>
            Загрузить участников
          </q-tooltip>
        </q-btn>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" v-if="$can('upload-event-member')"
                 style="margin-right: 1vw">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columnsMember"
          option-value="name"
          options-cover
        />
        <q-btn
          v-if="$can('can-activate-event-member')"
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
            v-if="$can('edit-event-member-fields')"
            @click="editFieldsOfMember(props)"
          />
          <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            v-if="$can('delete-event-member')"
            @click="deleteMember(props)"
          />
        </q-td>
      </template>
    </q-table>
    <q-btn v-if="$can('add-event-member')" flat color="primary" :href="'#/events/add-member/'+$route.params.id">Добавить участника +</q-btn>
  </div>
  </template>

<script>
import { columnsMember, pagination } from 'boot/columns';
import { ref } from '@vue/reactivity';

export default {
  name: 'Step2',
  data() {
    return {
      columnsMember,
      pagination,
      filter: ref(''),
      rowsMember: ref([]),
      selected: ref([]),
      activatedOrNot: ref(true),
      visibleColumns: ref(['id', 'member_id', 'name', 'format', 'paid', 'promocode', 'company', 'activatedOrNot', 'action']),
    };
  },
  methods: {
    get() {
      this.$store.dispatch('members/getEventMember', { id: this.$route.params.id })
      .then((res) => {
        const { data } = res.data;
        data.forEach((element) => {
          this.rowsMember.push({
            id: element.id,
            member_id: element.member.id,
            name: `${element.member.last_name} ${element.member.first_name}`,
            utm: element.utm,
            format: element.is_online ? 'Оффлайн' : 'Онлайн',
            is_mentor: element.need_mentor ? 'Да' : 'Нет',
            is_sponsor: element.is_sponsor ? 'Да' : 'Нет',
            paid: element.paid,
            promocode: element.promocode ? element.promocode.code : null,
            email: element.member.email,
            phone: element.member.phone,
            company: element.member.company,
            position: element.member.position,
            is_activated: Boolean(element.is_activated),
          });
        });
      })
      .catch();
    },
    editFieldsOfMember(evt) {
      window.location.href = `${window.location.origin}#/events/member/${evt.row.id}`;
    },
    deleteMember(evt, row) {
      this.$store.dispatch('events/deleteEventMember', { id: evt.row.id }).then((res) => {
        this.rowsMember.splice(evt.rowIndex, 1);
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
  },
  created() {
    this.get();
  },
};
</script>

<style scoped>
  .no-border {
    border: 0 !important;
  }
  .q-table__card {
    box-shadow: none !important;
  }
</style>
