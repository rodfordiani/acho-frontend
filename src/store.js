import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
    objectEdit: null,
    coupons: null
  },
  mutations: {
    updateUser: (state, user) => {
      state.user = user;
    },
    updateToken: (state, token) => {
      state.token = token;
    },
    updateObjectEdit: (state, objectEdit) => {
      state.objectEdit = objectEdit;
    },
    updateCoupons: (state, coupons) => {
      state.coupons = coupons;
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    objectEdit: state => state.objectEdit,
    coupons: state => state.coupons
  }
});
