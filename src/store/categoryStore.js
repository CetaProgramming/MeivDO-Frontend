import { defineStore } from "pinia";
import axios from "axios";
import { groupToolsStore } from "./groupToolsStore";
import { toolsStore } from "./toolsStore";

export const categoryStore = defineStore('categoryStore', {
    state: () => {
        return {
            categories: [],
            imgProfileDefault: `${import.meta.env.VITE_API_ENDPOINT}/storage/default/default-profile.png`,
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
        createObj(category) {
            return {
                id: category.id,
                name: category.name,
                active: Number(category.active),
                user: category.user_id,
                //ver esta parte
                updated: category.updated_at,
            }
        },
        createViewing(category) {
            return {
                id: category.id,
                name: category.name,
                active: Number(category.active),
                updated: category.updated,
            }
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/category`
            );
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad = [];
            this.pagesLoad.push(1);
            this.categories = response.data.data.map(category => this.createObj(category)),
                this.viewing = this.pageViewing(this.categories)
        },
        pageViewing(categories) {
            return categories.map(category => this.createViewing(category));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/category?page=${page}`
                );
                await response.data.data.forEach(category => !this.categories.some(categoryVer => categoryVer.id === category.id) && this.categories.push(this.createObj(category)));
                this.categories.sort((category1, category2) => category1.id.value - category2.id.value);
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
                const lastIndex = itemPageAtual < this.categories.length ? itemPageAtual : this.categories.length;
                this.categories.sort((category1, category2) => category1.id.value - category2.id.value);
                this.viewing = this.pageViewing(this.categories.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/category`,
                    formData
                );
                this.categories.push(this.createObj(response.data));
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        getOrAdd(categoryObj){
            const categoryIndex = this.categories.findIndex(category => category.id === categoryObj.id)
            return categoryIndex == -1 ? this.categories[this.categories.push(categoryObj) - 1] : this.categories[categoryIndex];
        },
        calculatePages() {
            const lastPage = Math.ceil(this.categories.length / this.perPage);
            if (this.pag.lastPage !== lastPage)
                return this.pag.lastPage = lastPage;
        },

        async update(categoryId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/category/${categoryId}`,
                    formData
                );
                this.categories[this.categories.findIndex(category => category.id == categoryId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                groupToolsStore().mount()
                toolsStore().mount()
                return response.data
            } catch (error) {
                throw error
            }

        },

        async deleteTool(categoryId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/category/${categoryId}`);
                const CategoryDelete = this.categories.findIndex(category => category.id === categoryId)
                this.categories.splice(CategoryDelete, 1);
                this.get(this.calculatePages() ?? this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
        getData(id) {
            return this.categories.find(category => id == category.id)
        },
        async getActiveCategories(CategoryId, active = '') {
            await this.mount();
            if(this.pag.lastPage > 1)
                for(let category = 2; category <= this.pag.lastPage; category++){
                    await this.load(category);
                }
            if(active){
                return this.categories;
            }
            const data = this.categories.filter(category => category.active);
            if(CategoryId !== -1 && !data.some(category => category.id === CategoryId))
                data.push(this.categories[this.categories.findIndex(category => category.id === CategoryId)]);
            return data;
        }
    }
});