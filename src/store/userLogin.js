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
      async login(data) {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/sanctum/csrf-cookie`
            );

            const login = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/login`,
              data
            );
                        
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
        this.image = `${import.meta.env.VITE_API_ENDPOINT}${image}`;
        this.role = role;
      },
      isAllowed(accessRoute){
        if(this.role)
          return this.role.permissions.some(permission => permission.feature === accessRoute) 
      }
      ,
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
      async changePassword(data){
        await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/changePassword`,
          data  
          );
    },
    async updateProfile(data){

      const request = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/changeInfo`,
        data
      );

      console.log(request);
  },
      async logout(){
          await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/logout`);
          this.deleteSession();
      }
    },
});