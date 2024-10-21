const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        path: '/promocodes',
        component: () => import('pages/promocdes/Items.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/events',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/events/Items.vue'),
      },
      {
        path: 'create',
        component: () => import('pages/events/Create.vue'),
      },
      {
        path: ':id/createCompetition',
        component: () => import('src/pages/events/competitions/CreateCompetition.vue'),
      },
      {
        path: ':id/competition/:idOfCompetition',
        component: () => import('src/pages/events/competitions/Item.vue'),
      },
       {
        path: ':id/competition/:idOfCompetition/task/:idOfTask',
        component: () => import('src/pages/events/tasks/Item.vue'),
      },
      {
        path: 'add-member/:id',
        component: () => import('pages/events/AddMember.vue'),
      },
      {
        path: ':id',
        component: () => import('pages/events/ItemNew.vue'),
      },
      {
        path: 'member/:id',
        component: () => import('pages/events/member/Item.vue'),
      },
      {
        path: ':id/import-member',
        component: () => import('pages/events/Import.vue'),
      },
    ],
  },
  {
    path: '/members',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/members/Items.vue'),
      },
      {
        path: 'create',
        component: () => import('pages/members/Create.vue'),
      },
      {
        path: ':id',
        component: () => import('pages/members/Item.vue'),
      },
    ],
  },
  {
    path: '/telegram',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/telegram/Mailing.vue'),
      },
    ],
  },
  {
    path: '/templates',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/template/Items.vue'),
      },
      {
        path: 'create',
        component: () => import('pages/template/Create.vue'),
      },
      {
        path: ':id',
        component: () => import('pages/template/Item.vue'),
      },
    ],
  },
  {
    path: '/fields',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'create',
        component: () => import('pages/fields/Create.vue'),
      },
      {
        path: ':id',
        component: () => import('pages/fields/Item.vue'),
      },
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/settings/fields/Index.vue'),
      },
      {
        path: 'users',
        component: () => import('pages/settings/registration/Users.vue'),
      },
      {
        path: 'user/:id',
        component: () => import('pages/settings/registration/User.vue'),
      },
      {
        path: 'roles',
        component: () => import('pages/settings/role/Index.vue'),
      },
      {
        path: 'roles/create',
        component: () => import('pages/settings/role/Create.vue'),
      },
      {
        path: 'roles/:id',
        component: () => import('pages/settings/role/Item.vue'),
      },
    ],
  },
  {
    path: '/manager',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/manager/Members.vue'),
      },
    ],
  },
  {
    path: '/round',
    component: () => import('pages/Round.vue'),
  },
  {
    path: '/round-2',
    component: () => import('pages/Round2.vue'),
  },
  {
    path: '/round-3',
    component: () => import('pages/Round3.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },

];

export default routes;
