<template>
  <div>

    <div class="row">
      <div class="col-12">
        <q-table
          title="Поля регистрации"
          :rows="field"
          :columns="fields"
          row-key="field"
        >
          <template v-slot:top-right>
            <q-btn
              color="primary"
              icon="add_circle"
              label="Создать"
              no-caps
              href="#/events/create"
            />
          </template>
          <template v-slot:no-data>
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied"/>
              <span>Нет данных...</span>
            </div>
          </template>
<!--                      <template v-slot:body-cell-action="props">-->
<!--                        <q-td :props="props">-->
<!--                          <q-btn-->
<!--                            color="primary"-->
<!--                            icon-right="create"-->
<!--                            no-caps-->
<!--                            flat-->
<!--                            dense-->
<!--                            @click="onRowClick(props)"-->
<!--                          />-->
<!--                          <q-btn-->
<!--                            color="negative"-->
<!--                            icon-right="delete"-->
<!--                            no-caps-->
<!--                            flat-->
<!--                            dense-->
<!--                            @click="deleteItem(props)"-->
<!--                          />-->
<!--                        </q-td>-->
<!--                      </template>-->
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  name: 'Step1',
  data() {
    const columns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: false,
      },
      {
        name: 'name',
        align: 'left',
        label: 'Название',
        field: 'name',
      },
      {
        name: 'text',
        align: 'left',
        label: 'Текст',
        field: 'text',
      },
    ];
    const rows = ref([]);
    async function listOfData(){
      await api.get('/api/')
        .then((res) => {
          if (res.data.success) {
            initialPagination.value.page = res.data.data.current_page;
            initialPagination.value.rowsPerPage = res.data.data.per_page;
            initialPagination.value.rowsNumber = res.data.data.total;
            res.data.data.data.forEach((element) => {
              rows.value.push({
                id: element.id,
                event: element.event,
                title: element.title,
                description: `${element.description.slice(0, 75)}...`,
              });
            });
          }
        });
    }
  },
  created() {

  },
};
</script>

<style scoped>

</style>
