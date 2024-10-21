/* eslint-disable */
import { api } from 'boot/axios';
import { Notify } from 'quasar'

export function store(state, param){
    return new Promise((resolve) => {
        api.post(`/api/competitions`, param).then((res) => {
          Notify.create({
            message: 'Данные сохранены',
            color: 'positive'
          });
          resolve(res.data);
        }).catch((error) => {
          Notify.create({
            message: 'Что-то пошло не так!',
            color: 'negative'
          })
        });
    });
}

export function destroy(state, param) {
  return new Promise((resolve, reject) => {
    api.delete('api/competitions/' + param.id).then((res) => {
      Notify.create( {
        message: "Данные удалены",
        color: 'positive'
      })
      resolve(res);
    }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}

export function getItemById(state, param) {
  return new Promise((resolve, reject) => {
    api.get('/api/competitions/' + param.id).then((response) => {
      resolve(response);
    }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}

export function save(state, param) {
  return new Promise(() => {
    api.put('/api/competitions/' + param.id, param).then((res) =>{
      Notify.create({
        message: 'Данные сохранены',
        color: 'positive'
      })
    }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}