import { api } from 'boot/axios';
import { Notify } from 'quasar';

export function getItemById(state, param) {
  return new Promise((resolve, reject) => {
      api.get(`/api/users/${param.id}`).then((response) => {
          resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative',
        });
      });
  });
}

export function store(state, param) {
 return new Promise((resolve, reject) => {
     api.post('/api/users', param).then((res) => {
         Notify.create({
             message: 'Пользователь создан',
             color: 'positive',
         });
         resolve(res);
     }).catch((error) => {
       Notify.create({
         message: 'Что-то пошло не так!',
         color: 'negative',
       });
       reject(error);
     });
 });
}

export function save(state, param) {
  return new Promise(() => {
      api.put(`/api/users/${param.id}`, param).then((res) => {
          Notify.create({
              message: 'Данные сохранены',
              color: 'positive',
          });
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative',
        });
      });
  });
}

export function destroy(state, param) {
  return new Promise((resolve, reject) => {
    api.delete(`api/users/${param.id}`).then((res) => {
      Notify.create( {
        message: 'Пользователь удален',
        color: 'positive',
      });
      resolve(res);
    }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative',
      });
    });
  });
}