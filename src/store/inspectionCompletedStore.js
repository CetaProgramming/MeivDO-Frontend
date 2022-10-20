import { defineStore } from "pinia";
import axios from "axios";
import { toolsStore } from "./toolsStore";
import { inspectionMissingStore } from "./inspectionMissingStore";


export const inspectionCompletedStore = defineStore('inspectionCompletedStore', {
    state: () => {
        return {
            inspections: [],
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
        createObj(inspection) {
            const refTools = toolsStore().getOrAdd(inspection.inspectionDetails.tool);
            return {
                id: inspection.id,
                description: inspection.additionalDescription,
                status: inspection.status, 
                updated: inspection.updated_at,
                tool:refTools
            }
        },
        createViewing(inspection) {
            return {
                id: inspection.id,
                tool: inspection.tool.code,
                status: inspection.status, 
                updated: inspection.updated,
            }
        },
        async doSearch({Tool = '', Status = ''}, reset = false){
            
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Tool && !Status))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/search?tool_id=${Tool}&status=${Status}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections`
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
            this.inspections = response.data.data ? response.data.data.map(inspection => this.createObj(inspection)) : [],
            this.viewing = this.pageViewing(this.inspections)
        },
        pageViewing(inspections) {
            return inspections.map(inspection => this.createViewing(inspection));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections?page=${page}`
                );
                await response.data.data.forEach(inspection => !this.inspections.some(inspectionVer => inspectionVer.id === inspection.id) && this.inspections.push(this.createObj(inspection)));
                this.inspections.sort((inspection1, inspection2) => inspection1.id.value - inspection2.id.value);
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
                const lastIndex = itemPageAtual < this.inspections.length ? itemPageAtual : this.inspections.length;
                this.inspections.sort((inspection1, inspection2) => inspection1.id.value - inspection2.id.value);
                this.viewing = this.pageViewing(this.inspections.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/tool`,
                    formData
                );
                this.inspections.push(this.createObj(response.data));
                this.totalItems += 1;
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.inspections.length / this.perPage);
            if(this.pag.lastPage !== lastPage){
                this.pagesLoad.forEach((pag, index) => {
                    if(pag > lastPage){
                        this.pagesLoad.splice(index);
                        return;
                    }
                });
                return this.pag.lastPage = lastPage ? lastPage : 1;
            }

        },
        
        async update(inspectionId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/${inspectionId}`,
                    formData
                );
                this.inspections[this.inspections.findIndex(inspection => inspection.id == inspectionId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        // async getStatus() {
        //     try {
        //         const response = await axios.get(
        //             `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/status`
        //         );
        //         return response.data.data
        //     } catch (error) {
        //         throw error
        //     }
        // },
        async deleteInspection(inspectionId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/${inspectionId}`);
                const InspectionDelete = this.inspections.findIndex(inspection => inspection.id === inspectionId)
                this.inspections.splice(InspectionDelete, 1);
                this.totalItems -= 1;
                this.get(this.calculatePages() ?? this.pag.actualPage);
                inspectionMissingStore().mount()
            } catch (error) {
                throw error;
            }
        },
        getData(id){
            return this.inspections.find(inspection => id == inspection.id)
            }
    }
});