/* eslint-disable */
import { api } from 'boot/axios';
import { Notify } from 'quasar'

export function deleteMember(state, param) {
  return new Promise((resolve, reject) => {
    api.post(`api/events/${param.id}/delete-member/${param.member_id}`).then((res) => {
      Notify.create( {
        message: 'Участник удален',
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

export function deleteEventMember(state, param) {
  return new Promise((resolve, reject) => {
    api.post(`api/v1/events/delete-member/${param.id}`).then((res) => {
      Notify.create( {
        message: 'Участник удален',
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

export function exportEventMembers(state, param) {
    return new Promise((resolve, reject) => {
      api.get('api/events/export/eventMembers/'+ param.id,{ responseType: 'blob' }).then((response) => {
        resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        });
      });
    });
}

export function exportCompetitionMembers(state, param) {
    return new Promise((resolve, reject) => {
      api.get('api/events/export/competitionMembers/'+ param.id, {responseType: 'blob'}).then((response) =>{
        resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        });
      })
    })
}

export function exportlogCompetition(state, param){
  return new Promise((resolve, reject) => {
      api.get('api/events/export/logCompetition/'+ param.id, {responseType: 'blob'}).then((response) =>{
        resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        });
      })
    })
}

export function exportResultOfCompetition(state, param){
  return new Promise((resolve, reject) => {
      api.get('api/events/export/exportResultOfCompetition/'+ param.id, {responseType: 'blob'}).then((response) =>{
        resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        });
      })
    })
}

export function exportReport(state, param) {
  return new Promise((resolve, reject) => {
    api.get('api/export/report',{ responseType: 'blob' }).then((response) => {
      resolve(response);
    }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      });
    });
  });
}

export function getItemById(state, param) {
  return new Promise((resolve, reject) => {
    api.get('/api/events/' + param.id).then((response) => {
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

export function getEventById(state, param) {
  return new Promise((resolve, reject) => {
    api.get('/api/v1/events/' + param.id).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
      Notify.create({
        message: 'Что-то пошло не так!',
        color: 'negative'
      })
    })
  })
}

export function save(state, param) {
  return new Promise(() => {
    api.put('/api/events/' + param.id, param).then((res) =>{
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
    api.post('/api/events', param).then((res) =>{
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
    api.delete('api/events/' + param.id).then((res) => {
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

export function addMember(state, param) {
  return new Promise((resolve, reject) => {
    api.post('api/events/' + param.id + '/add-member/' + param.member_id).then((response) => {
      Notify.create({
        message: 'Участник добавлен',
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

export function activateMembers(state, param){
    return new Promise((resolve, reject) => {
      api.post('api/events/' + param.id + '/activate-member', param).then((response) => {

        if(param.members.length === 1){
          Notify.create({
            message: 'Участник активирован',
            color: 'positive'
          });
        } else {
          Notify.create({
            message: 'Участники активированы',
            color: 'positive'
          });
        }
        resolve(response);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        })
      })
    })
}

export function deleteSpeaker(state, param) {
  return new Promise((resolve) => {
    api.delete('/api/speakers/'+param).then((res) => {
      Notify.create({
        message: 'Данные удалены',
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

export function getMemberFieldValue(state, param) {
    return new Promise((resolve) => {
      api.get('/api/events/member/' + param.member_id).then((res) => {
        resolve(res);
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        })
      });
    });
}

export function editMemberFieldValues(state, param){
    return new Promise((resolve) => {
      api.post(`/api/events/member/${param.member_id}/editMemberFieldValues`, param.data).then((res) => {
        Notify.create({
          message: 'Данные сохранены',
          color: 'positive'
        })
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так!',
          color: 'negative'
        })
      });
    });
}

export function getProgram(state, param){
  return new Promise((resolve) => {
    api.post(`/api/v1/events/get-program/${param}`)
      .then((res) => {
        resolve(res)
      }).catch((error) => {
        Notify.create({
          message: 'Что-то пошло не так, при загрузке программы!',
          color: 'negative'
        })
    });
  });
}

export function getSpeakers(state, param) {
  return new Promise((resolve) => {
    api.post(`/api/v1/events/get-speakers/${param}`)
      .then((res) => {
        resolve(res)
      }).catch((error) => {
      Notify.create({
        message: 'Что-то пошло не так, при загрузке программы!',
        color: 'negative'
      })
    });
  })
}
