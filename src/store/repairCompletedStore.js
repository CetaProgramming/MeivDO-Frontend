import { defineStore } from "pinia";
import axios from "axios";
import { toolsStore } from "./toolsStore";
import { repairMissingStore } from "./repairMissingStore";



export const repairCompletedStore = defineStore('repairCompletedStore', {
    state: () => {
        return {
            repairs: [],
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
    getters: {
        getToolsCompleted(state){
            return [...new Set(state.repairs.map(repair => repair.tool))];
        }
    },
    actions: {
        createObj(repair) {
            const refTools = toolsStore().getOrAdd(repair.inspection.tool);
            return {
                id: repair.id,
                reason:repair.reason,
                solution: repair.solution,
                description: repair.additionalDescription,
                inspection: repair.inspection,
                status: repair.status, 
                user: repair.user_id,
                updated: repair.updated_at,
                tool:refTools
            }
        },
        createViewing(repair) {
            return {
                id: repair.id,
                tool: repair.tool.code,
                inspection: repair.inspection.id, 
                updated: repair.updated,
            }
        },
        async doSearch({Tool = '', Inspection = ''}, reset = false){
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Tool && !Inspection) || !reset && (Tool==-1 || Inspection && Inspection<1))
            return;
   
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/completed/search?tool_id=${Tool}&inspection_id=${Inspection}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/completed`
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
            this.repairs = response.data.data.map(repair => this.createObj(repair)),
                this.viewing = this.pageViewing(this.repairs)
        },
        pageViewing(repairs) {
            return repairs.map(repair => this.createViewing(repair));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/completed?page=${page}`
                );
                await response.data.data.forEach(repair => !this.repairs.some(repairVer => repairVer.id === repair.id) && this.repairs.push(this.createObj(repair)));
                this.repairs.sort((repair1, repair2) => repair1.id.value - repair2.id.value);
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
                const lastIndex = itemPageAtual < this.repairs.length ? itemPageAtual : this.repairs.length;
                this.repairs.sort((repair1, repair2) => repair1.id.value - repair2.id.value);
                this.viewing = this.pageViewing(this.repairs.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.repairs.length / this.perPage);
            if(this.pag.lastPage !== lastPage){
                this.pagesLoad.forEach((pag, index) => {
                    if(pag > lastPage){
                        this.pagesLoad.splice(index);
                        return;
                    }
                });
                return this.pag.lastPage = lastPage ? lastPage:1;
            }

        },
        
        async update(repairId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/${repairId}`,
                    formData
                );
                this.repairs[this.repairs.findIndex(repair => repair.id == repairId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getTools() {
            await this.mount();
            if (this.pag.lastPage > 1)
                for (let repair = 2; repair <= this.pag.lastPage; repair++) {
                    await this.load(repair);
                }
                
            return [... new Set (this.repairs.map(repair => repair.inspection.tool))];
        },
        async deleteRepair(repairId) {
            try {
                await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/reset/${repairId}`);
                const RepairDelete = this.repairs.findIndex(repair => repair.id === repairId)
                this.repairs.splice(RepairDelete, 1);
                this.totalItems -= 1;
                this.get(this.calculatePages() ?? this.pag.actualPage);
                repairMissingStore().mount()
            } catch (error) {
                throw error;
            }
        },
        getData(id){
            return this.repairs.find(repair => id == repair.id)
            }
    }
});