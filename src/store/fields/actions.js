/* eslint-disable */
import { api } from 'boot/axios';
import { Notify } from 'quasar'

export function getItemById(state, param) {
  return new Promise((resolve, reject) => {
    api.get('/api/fields/' + param.id).then((response) => {
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
    api.put('/api/fields/' + param.id, param).then((res) =>{
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
  return new Promise((resolve) => {
    api.post('/api/fields', param).then((res) =>{
      Notify.create({
        message: 'Данные сохранены',
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

export function destroy(state, param) {
  return new Promise((resolve, reject) => {
    api.delete('api/fields/' + param.id).then((res) => {
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

export function addButton(state, param) {
  return new Promise((resolve) => {
    api.post('api/fields/add-button', param).then((res) => {
      Notify.create( {
        message: "Кнопка добавлен",
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

export function deleteButton(state, param) {
  return new Promise((resolve) => {
    api.post('api/fields/delete-button', {id: param}).then((res) => {
      Notify.create( {
        message: "Кнопка удален",
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

export function getBaseFields(state, param) {
  return new Promise((resolve) => {
    api.post('api/base-fields').then((res) => {
      resolve(res);
    })
  })
}

export function saveBaseFields(state, param) {
  return new Promise((resolve) => {
    api.put('api/base-fields', param).then((res) => {
      Notify.create( {
        message: "Данные сохранены",
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
