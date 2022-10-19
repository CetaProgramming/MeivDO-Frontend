import { defineStore } from "pinia";
import axios from "axios";
import {inspectionCompletedStore} from './inspectionCompletedStore'
import { toolsStore } from "./toolsStore";
import { projectStore } from "./projectStore";


export const inspectionMissingStore = defineStore('inspectionMissingStore', {
    state: () => {
        return {
            inspectionsMissing: [],
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
        createObj(inspectionMissing) {
            const refTools = toolsStore().getOrAdd(inspectionMissing.tool);
            const refProjects = projectStore().getOrAdd(inspectionMissing.project);
            return {
                id: inspectionMissing.id,
                inspectionId: inspectionMissing.inspection_id,
                project:refProjects, 
                updated: inspectionMissing.updated_at,
                tool:refTools
            }
        },
        createViewing(inspectionMissing) {
            return {
                id: inspectionMissing.id,
                tool:inspectionMissing.tool.code,
                project: inspectionMissing.project.name,
                updated: inspectionMissing.updated,
            }
        },
        async doSearch({Tool = '', Inspection = ''}, reset = false){
            
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Tool && !Inspection))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/projecttool/missing/search?tool_id=${Tool}&project_id=${Inspection}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/projecttool/missing`
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
            this.inspectionsMissing = response.data.data.map(inspectionMissing => this.createObj(inspectionMissing)),
                this.viewing = this.pageViewing(this.inspectionsMissing)
        },
        pageViewing(inspectionsMissing) {
            return inspectionsMissing.map(inspectionMissing => this.createViewing(inspectionMissing));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/projecttool/missing?page=${page}`
                );
                await response.data.data.forEach(inspectionMissing => !this.inspectionsMissing.some(inspectionMissingVer => inspectionMissingVer.id === inspectionMissing.id) && this.inspectionsMissing.push(this.createObj(inspectionMissing)));
                this.inspectionsMissing.sort((inspectionMissing1, inspectionMissing2) => inspectionMissing1.id.value - inspectionMissing2.id.value);
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
                const lastIndex = itemPageAtual < this.inspectionsMissing.length ? itemPageAtual : this.inspectionsMissing.length;
                this.inspectionsMissing.sort((inspectionMissing1, inspectionMissing2) => inspectionMissing1.id.value - inspectionMissing2.id.value);
                this.viewing = this.pageViewing(this.inspectionsMissing.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
       
        calculatePages(){
            const lastPage = Math.ceil(this.inspectionsMissing.length / this.perPage);
            if(this.pag.lastPage !== lastPage){
                this.pagesLoad.forEach((pag, index) => {
                    if(pag > lastPage){
                        this.pagesLoad.splice(index);
                        return;
                    }
                });
                return this.pag.lastPage = lastPage;
            }

        },
        
        async update(inspectionMissingId, formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/projecttool`,
                    formData
                );
                this.inspectionsMissing.splice(this.inspectionsMissing.findIndex(inspection => inspection.id == inspectionMissingId), 1) 
                this.get(this.pag.actualPage);
                inspectionCompletedStore().mount()
                return response.data
            } catch (error) {
                throw error
            }
        },

        getData(id){
            return this.inspectionsMissing.find(inspectionMissing => id == inspectionMissing.id)
        },
        
        async getToolsAndProjects(){
            await this.mount();
            if (this.pag.lastPage > 1)
                for (let inspectionMissing = 2; inspectionMissing <= this.pag.lastPage; inspectionMissing++) {
                    await this.load(inspectionMissing);
                }
            return [this.inspectionsMissing.map(inspection => inspection.tool), [...new Set(this.inspectionsMissing.map(inspection => inspection.project))]];
        }
    }
});