import { defineStore } from 'pinia';
import axios from 'axios';

export const usersStore = defineStore('usersStore', {
    state: () => { 
        return {
          users: [],
          actualPage: 1,
          lastPage: null,
          totalItems: null,
        }
    },
    actions: {
        async get(){
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users`
            );
            this.actualPage = response.data.current_page;
            this.lastPage = response.data.last_page;
            this.totalItems = response.data.to;
            this.users = response.data.data;
        }
    }
});