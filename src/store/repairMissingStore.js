import { defineStore } from "pinia";
import axios from "axios";
import { toolsStore } from "./toolsStore";
import {repairCompletedStore} from './repairCompletedStore'

export const repairMissingStore = defineStore('repairMissingStore', {
    state: () => {
        return {
            repairsMissing: [],
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
        getToolsMissing(state){
            return [...new Set(state.repairsMissing.map(repair => repair.tool))];

        }
    },
    actions: {
        createObj(repairMissing) {
             const refTools = toolsStore().getOrAdd(repairMissing.inspection.tool);
            return {
                id: repairMissing.id,
                reason:repairMissing.reason,
                solution: repairMissing.solution,
                description: repairMissing.additionalDescription,
                inspection: repairMissing.inspection.id, 
                status: repairMissing.status, 
                user: repairMissing.user_id,
                updated: repairMissing.updated_at,
                tool:refTools
            }
        },
        createViewing(repairMissing) {
            return {
                id: repairMissing.id,
                tool: repairMissing.tool.code,
                inspection: repairMissing.inspection, 
                updated: repairMissing.updated,
            }
        },
        async doSearch({Tool = '', Inspection = ''}, reset = false){
            
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Tool && !Inspection) || !reset && (Tool==-1 || Inspection && Inspection<1))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/missing/search?tool_id=${Tool}&inspection_id=${Inspection}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/missing`
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
            this.repairsMissing = response.data.data.map(repairMissing => this.createObj(repairMissing)),
                this.viewing = this.pageViewing(this.repairsMissing)
        },
        pageViewing(repairsMissing) {
            return repairsMissing.map(repairMissing => this.createViewing(repairMissing));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/missing?page=${page}`
                );
                await response.data.data.forEach(repairMissing => !this.repairsMissing.some(repairMissingVer => repairMissingVer.id === repairMissing.id) && this.repairsMissing.push(this.createObj(repairMissing)));
                this.repairsMissing.sort((repairMissing1, repairMissing2) => repairMissing1.id.value - repairMissing2.id.value);
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
                const lastIndex = itemPageAtual < this.repairsMissing.length ? itemPageAtual : this.repairsMissing.length;
                this.repairsMissing.sort((repairMissing1, repairMissing2) => repairMissing1.id.value - repairMissing2.id.value);
                this.viewing = this.pageViewing(this.repairsMissing.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.repairsMissing.length / this.perPage);
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
        
        async update(repairMissingId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/repairs/${repairMissingId}`,
                    formData
                );
                const RepairDelete = this.repairsMissing.findIndex(repairMissing => repairMissing.id === repairMissingId)
                this.repairsMissing.splice(RepairDelete, 1);
                this.totalItems -= 1;
                this.get(this.calculatePages() ?? this.pag.actualPage);
                repairCompletedStore().mount()
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getTools() {
            await this.mount();
            if (this.pag.lastPage > 1)
                for (let repairMissing = 2; repairMissing <= this.pag.lastPage; repairMissing++) {
                    await this.load(repairMissing);
                }
        },
        getData(id){
            return this.repairsMissing.find(repairMissing => id == repairMissing.id)
            }
    }
});