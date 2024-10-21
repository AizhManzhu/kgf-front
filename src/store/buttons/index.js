import state from './state';
import * as getters from './getters';
// eslint-disable-next-line import/namespace
import * as mutations from './mutations';
import * as actions from './actions';

export const buttons = {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
