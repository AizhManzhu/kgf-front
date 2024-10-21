/* eslint-disable */
import { api } from 'boot/axios';
import { Notify } from 'quasar'

export function getItemById(state, param) {
  return new Promise((resolve, reject) => {
    api.get('/api/buttons/' + param.id).then((response) => {
      resolve(response);
    }).catch((error) => {
      console.error(error.message)
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}

export function save(state, param) {
  return new Promise(() => {
    api.put('/api/buttons/' + param.id, param).then((res) =>{
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

export function store(state, param) {
  return new Promise(() => {
    api.post('/api/buttons', param).then((res) =>{
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

export function destroy(state, param) {
  return new Promise((resolve, reject) => {
    api.delete('api/buttons/' + param.id).then((res) => {
      Notify.create( {
        message: "Данные удалены",
        color: 'positive'
      })
      resolve(res);
    }).catch((error) => {
      console.error(error.message)
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}
