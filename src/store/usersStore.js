import { defineStore } from 'pinia';
import axios from 'axios';
import Button  from './../components/widgets/Button.vue';

export const usersStore = defineStore('usersStore', {
    state: () => { 
        return {
            users: [],
            pag: {
                actualPage: 1,
                lastPage: null,
            },
            viewing: [],
            pagesLoad: [],
            perPage: null,
            totalItems: null
        }
    },
    actions: {
        createObj(user){
            return {
                id: {
                    type: 'Text',
                    value: user.id
                },
                name: {
                    type: 'Text',
                    value: user.name
                },
                email: {
                    type: 'Text',
                    value: user.email
                },
                role: {
                    type: 'Text',
                    value: user.role.name
                },
                active: {
                    type: 'Component',
                    value: `<div class="flex justify-center items-center gap-2"><circle class=\"${user.active ? 'bg-green-400' : 'bg-red-400'} rounded-xl w-3 h-3 block\"></circle></div>`,
                },
                updated: {
                    type: 'Text',
                    value: "dasadsas",
                }
            }
        },
        async mount(){
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users`
            );
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad.push(1);
            this.users = response.data.data.map(user => this.createObj(user)),
            this.viewing = this.users
        },
        async load(page){
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users?page=${page}`
                );
                await response.data.data.forEach(user => !this.users.some(userVer => userVer.id.value === user.id) && this.users.push(this.createObj(user)));
                this.users.sort((user1,user2) =>user1.id.value - user2.id.value);
                this.pagesLoad.push(page);
                this.pagesLoad.sort((a,b) => a - b);
            } catch (error) {
                throw error;
            }     
        },
        async get(page){
            try{
                if(page > this.pag.lastPage || page < 1)
                    throw new Error('User must be authenticated')
                if(!this.pagesLoad.includes(page))
                    await this.load(page);   
                const indexPage = this.pagesLoad.findIndex(pagArray => pagArray === page);
                const firstIndex = (indexPage) * this.perPage;
                const itemPageAtual = this.perPage * (indexPage + 1);
                const lastIndex = itemPageAtual < this.users.length ? itemPageAtual : this.users.length;
                this.users.sort((user1,user2) =>user1.id.value - user2.id.value);
                this.viewing = this.users.slice(firstIndex , lastIndex);
                this.pag.actualPage = page;
            } catch(e){
                throw e;
            }
        },
        async add(){
            const user = {
                id: 50,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'admin',
                active: 0,
                updated: "ddasdsad"
            }

            this.users.push(this.createObj(user));
            this.get(this.pag.actualPage);
        }

    }
});