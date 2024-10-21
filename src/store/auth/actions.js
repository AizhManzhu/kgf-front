/* eslint-disable */
import { api } from 'boot/axios';

export function login(state, user) {
  // localStorage.removeItem('token');
    return new Promise((resolve, reject) => {
      // commit(this.AUTH_REQUEST);
      api.post('/api/login', user).then((response) => {
          localStorage.setItem('token', response.data.data.token);
          if (response.data.data.role) {
            localStorage.setItem('role', response.data.data.role);
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
  });
}
