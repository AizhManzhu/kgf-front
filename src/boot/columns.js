import { ref } from 'vue';

export const columnsMember = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'member_id',
    required: true,
    label: 'ID участника',
    align: 'left',
    field: 'member_id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'ФИО',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'utm',
    align: 'left',
    label: 'UTM',
    field: 'utm',
    sortable: true,
  },
  {
    name: 'format',
    align: 'left',
    label: 'Формат',
    field: 'format',
    sortable: true,
  },
  {
    name: 'need_mentor',
    align: 'left',
    label: 'Нужен ментор',
    field: 'need_mentor',
    sortable: true,
  },
  {
    name: 'is_sponsor',
    align: 'left',
    label: 'Спонсор',
    field: 'is_sponsor',
    sortable: true,
  },
  {
    name: 'paid',
    align: 'left',
    label: 'Оплачено',
    field: 'paid',
    sortable: true,
  },
  {
    name: 'promocode',
    align: 'left',
    label: 'Промокод',
    field: 'promocode',
  },
  {
    name: 'email',
    align: 'left',
    label: 'e-mail',
    field: 'email',
    sortable: true,
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Номер телефона',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'company',
    align: 'left',
    label: 'Компания',
    field: 'company',
    sortable: true,
  },
  {
    name: 'position',
    align: 'left',
    label: 'Должность',
    field: 'position',
  },
  {
    name: 'activatedOrNot',
    align: 'center',
    label: 'Активация',
    field: 'action',
  },
  {
    name: 'action',
    align: 'center',
    label: 'Действия',
    field: 'action',
  },
];
export const columnsRole = [
  {
    name: 'id',
    align: 'left',
    label: 'ID',
    field: 'id',
  },
  {
    name: 'name',
    align: 'left',
    label: 'Название',
    field: 'name',
  },
  {
    name: 'permissions',
    align: 'left',
    label: 'Permissions',
    field: 'permissions',
  },
  {
    name: 'action',
    align: 'center',
    label: 'Действия',
    field: 'action',
  },
];
export const pagination = ref({
  rowsPerPage: 10,
});
