import { defineStore } from "pinia";
import axios from "axios";

export const groupToolsStore = defineStore('groupToolsStore', {
    state: () => {
        return {
            groupTools: [],
            imgProfileDefault: `${import.meta.env.VITE_API_ENDPOINT}/storage/default/default-profile.png`,
            // roles: [],
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
        createObj(groupTool) {
            return {
                id: groupTool.id,
                code: groupTool.code,
                image: `${import.meta.env.VITE_API_ENDPOINT}/storage/${groupTool.image}`, 
                category: groupTool.category_tools_id, 
                description: groupTool.description,
                active: Number(groupTool.active),
                user: groupTool.user_id,
                //ver esta parte
                updated: groupTool.updated_at,
            }
        },
        createViewing(groupTool) {
            return {
                id: groupTool.id,
                code: groupTool.code,
                category: groupTool.category, 
                active: Number(groupTool.active),
                updated: groupTool.updated,
            }
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/groups`
            );
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad.push(1);
            this.groupTools = response.data.data.map(groupTool => this.createObj(groupTool)),
                this.viewing = this.pageViewing(this.groupTools)
        },
        pageViewing(groupTools) {
            return groupTools.map(groupTool => this.createViewing(groupTool));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/groups?page=${page}`
                );
                await response.data.data.forEach(groupTool => !this.groupTools.some(groupToolVer => groupToolVer.id === groupTool.id) && this.groupTools.push(this.createObj(groupTool)));
                this.groupTools.sort((groupTool1, groupTool2) => groupTool1.id.value - groupTool2.id.value);
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
                const lastIndex = itemPageAtual < this.groupTools.length ? itemPageAtual : this.groupTools.length;
                this.groupTools.sort((groupTool1, groupTool2) => groupTool1.id.value - groupTool2.id.value);
                this.viewing = this.pageViewing(this.groupTools.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/groups`,
                    formData
                );
                this.groupTools.push(this.createObj(response.data));
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.groupTools.length / this.perPage);
            if(this.pag.lastPage !== lastPage)
                return this.pag.lastPage = lastPage;
        },
        
        async update(groupToolId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/groups/${groupToolId}`,
                    formData
                );
                this.groupTools[this.groupTools.findIndex(groupTool => groupTool.id == groupToolId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }

        },
        
        async deleteTool(groupToolId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/groups/${toolId}`);
                const GroupToolDelete = this.groupTools.findIndex(groupTool => groupTool.id === groupToolId)
                this.grouptools.splice(GroupToolDelete, 1);
                this.get(this.calculatePages() ?? this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
        getData(id){
            return this.groupTools.find(groupTool => id == groupTool.id)
            }
    }
});