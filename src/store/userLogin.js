import axios from 'axios';
import { defineStore } from 'pinia';
import VueCookies from 'vue-cookies';

export const userLogin = defineStore('userLogin', {
    state: () => { 
        return {
          id: null,
          name: '',
          email: '',
          image: '',
          role: '',
        }
    },
    getters: {
      
    },
    actions: {
      async login({email, password}) {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/sanctum/csrf-cookie`
            );
  
            const login = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/login`, {
                email,
                password
            });

            this.defineDataUser(login.data);

        } catch (error) {
          throw error;
        }
      },
      async acessUser(){
        try {
          if (VueCookies.get("XSRF-TOKEN")) {
            const user = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/user`);
            this.defineDataUser(user.data);
            return true;
          }
          return false;
        } catch (error) {
          throw error;
        }
          
      },
      defineDataUser({id, name, email:emailU, image, role}){
        this.id = id;
        this.name = name;
        this.email = emailU;
        this.image = image;
        this.role = role;
      },
      deleteSession(){
        VueCookies.remove("XSRF-TOKEN");
        this.defineDataUser({
          id: null,
          name: null,
          email: null,
          image: null,
          role: null
        })
      },
      async changePassword(){
        await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/changePassword`,{
          password,
        });
        this.deleteSession();
    },
      async logout(){
          await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/logout`);
          this.deleteSession();
      }
    },
});