/* eslint-disable */
import { api } from 'boot/axios';
import { Notify } from 'quasar'

export function getItemById(state, param) {
    return new Promise((resolve, reject) => {
        api.get('/api/members/' + param.id).then((response) => {
            resolve(response);
        }).catch((error) => {
          Notify.create({
            message: 'Что-то пошло не так!',
            color: 'negative'
          })
        })
    })
}

export function exportMembers() {
    return new Promise((resolve) => {
        api.get('/api/members/export/members',{ responseType: 'blob' }).then((response) => {
            resolve(response);
        }).catch((error) => {
          Notify.create({
            message: 'Что-то пошло не так!',
            color: 'negative'
          });
        });
    });
}

export function save(state, param) {
    return new Promise(() => {
        api.put('/api/members/' + param.id, param).then((res) => {
            Notify.create({
                message: 'Данные сохранены'
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
        api.post('/api/members', param).then((res) => {
            Notify.create({
                message: 'Данные сохранены'
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
    api.delete('api/members/' + param.id).then((res) => {
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

export function getEventMember(state, param) {
  return new Promise((resolve, reject) => {
    api.get('api/v1/events/members/' + param.id)
      .then((res) => {
        resolve(res);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        })
        reject(error)
      })
  })
}
