import { defineStore } from 'pinia';

import pt from "../locales/pt.json";
import en from "../locales/en.json";

export const langStore = defineStore('langStore', {
    state: () => { 
        return {
          lang: localStorage.getItem('lang') || 'pt',
          en,
          pt
        }
    },
    getters: {
      getLang: (state) => state[state.lang]
    },
    actions: {
      setLanguague(value) {
        localStorage.setItem('lang', value);   
        this.lang = value;
      }
    },
});
  