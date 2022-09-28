import { defineStore } from 'pinia';
import axios from 'axios';
import { userLogin } from './userLogin';

export const usersStore = defineStore('usersStore', {
    state: () => {
        return {
            users: [],
            imgProfileDefault: `${import.meta.env.VITE_API_ENDPOINT}/storage/default/default-profile.png`,
            roles: [],
            pag: {
                actualPage: 1,
                lastPage: null,
            },
            filtered: false,
            viewing: [],
            pagesLoad: [],
            perPage: null,
            totalItems: null
        }
    },
    actions: {
        createObj(user) {
            return {
                id: user.id,
                name: user.name,
                image: `${import.meta.env.VITE_API_ENDPOINT}/storage/${user.image}`,
                email: user.email,
                role: user.role,
                active: Number(user.active),
                updated: user.updated_at
            }
        },
        createViewing(user) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                active: Number(user.active),
                updated: user.updated,
            }
        },
        async doSearch({Name = '', Active = ''}, reset = false){
            console.log(reset, this.filtered);
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Name && !Active))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users/search?name=${Name}&active=${Active && Number(Active)}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users`
            );
            this.refactoringViewing(response);
        },
        refactoringViewing(response){
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad = [];
            this.pagesLoad.push(1);
            this.users = response.data.data.map(user => this.createObj(user)),
                this.viewing = this.pageViewing(this.users)
        },
        pageViewing(users) {
            return users.map(user => this.createViewing(user));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users?page=${page}`
                );
                await response.data.data.forEach(user => !this.users.some(userVer => userVer.id === user.id) && this.users.push(this.createObj(user)));
                this.users.sort((user1, user2) => user1.id.value - user2.id.value);
                this.pagesLoad.push(page);
                this.pagesLoad.sort((a, b) => a - b);
            } catch (error) {
                throw error;
            }
        },
        async get(page) {
            try {
                if (page > this.pag.lastPage || page < 1)
                    throw new Error('User must be authenticated')
                if (!this.pagesLoad.includes(page))
                    await this.load(page);
                const indexPage = this.pagesLoad.findIndex(pagArray => pagArray === page);
                const firstIndex = (indexPage) * this.perPage;
                const itemPageAtual = this.perPage * (indexPage + 1);
                const lastIndex = itemPageAtual < this.users.length ? itemPageAtual : this.users.length;
                this.users.sort((user1, user2) => user1.id.value - user2.id.value);
                this.viewing = this.pageViewing(this.users.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users`,
                    formData
                );
                this.users.push(this.createObj(response.data));
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.users.length / this.perPage);
            if(this.pag.lastPage !== lastPage)
                return this.pag.lastPage = lastPage;
        },
        async resetPassword(userId) {
            try {
                await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users/resetPassword/${userId}`);
                this.users.find(user => user.id === userId).updated = new Date();
                this.get(this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
        async update(userId, formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users/${userId}`,
                    formData
                );
                this.users[this.users.findIndex(user => user.id == userId)] = this.createObj(response.data)
                userLogin().id == userId && userLogin().acessUser();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }

        },
        async getRoles() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users/roles`
                );
                return response.data
            } catch (error) {
                throw error
            }
        },
        async deleteUser(userId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/users/${userId}`);
                const userDelete = this.users.findIndex(user => user.id === userId)
                this.users.splice(userDelete, 1);
                this.get(this.calculatePages() ?? this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
    }
});