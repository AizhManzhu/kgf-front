<template>
    <q-page class="q-page-container">
    <div class="q-pa-md">
      <q-table
        title = "Участник"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="initialPagination"
      >
      <template v-slot:top-left>
                <div style="font-size: 1.2rem">Участник: {{member_name}}</div>
      </template>

      <template v-slot:body-cell-answer="props">
        <q-td :props="props">
          <q-select  borderless color="green" v-model="props.row.answer" :options="props.row.buttons"/>
        </q-td>
      </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              color="primary"
              label="Cохранить"
              @click="save(props)"
            />
          </q-td>
        </template>
      </q-table>
      <q-btn flat color="warning" label="Назад" v-on:click="prevPage()"/>
    </div>
  </q-page>
</template>
<script>
import { ref } from '@vue/reactivity';

export default {
  name: 'Item.vue',
  data() {
    const columns = [
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
        name: 'answer',
        align: 'left',
        label: 'Ответ',
        field: 'answer',
      },
      {
        name: 'action',
        align: 'center',
        label: 'Действие',
        field: 'action',
      },
    ];
    return {
      columns,
      rows: ref([]),
      member_name: ref(''),
      initialPagination: ref([]),
      isVip: ref(false),
    };
  },
  methods: {
        save(evt) {
            const memberData = {
                answer: evt.row.answer,
                field_id: evt.row.id,
                is_vip: this.isVip,
            };
            this.$store.dispatch('events/editMemberFieldValues', { member_id: this.$route.params.id, data: memberData });
        },
        prevPage() {
            window.history.back();
        },
  },
  created() {
     this.$store.dispatch('events/getMemberFieldValue', { member_id: this.$route.params.id }).then((res) => {
        if (res.data.success) {
          res.data.data.forEach((element) => {
            const allButtons = [];
            let memberValue = '';
            if (element.buttons) {
                element.buttons.forEach((button) => {
                    allButtons.push(button.text);
                });
            }
            if (element.members[0] !== undefined) {
              element.members[0].field_values.forEach((fieldValue) => {
                if (fieldValue.field_id === element.id) {
                  memberValue = fieldValue.value;
                }
              });
              this.member_name = ` ${element.members[0].last_name} ${element.members[0].first_name}`;
            } else {
              element.vip_members[0].field_vip_values.forEach((fieldValue) => {
                if (fieldValue.field_id === element.id) {
                  memberValue = fieldValue.value;
                }
              });
              this.member_name = ` ${element.vip_members[0].last_name} ${element.vip_members[0].first_name}`;
              this.isVip = true;
            }

             this.rows.push({
                id: element.id,
                name: element.name,
                text: element.text,
                answer: memberValue,
                buttons: allButtons,
              });
            });
          }
        });
     },
  };
</script>
