import { defineStore } from "pinia";
import axios from "axios";
import { groupToolsStore } from "./groupToolsStore";
import { categoryStore } from "./categoryStore";


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
            return {
                id: inspectionMissing.id,
                inspectionId: inspectionMissing.inspection_id,
                // projectToolsId: inspectionMissing.project_tools_id, 
                updated: inspectionMissing.updated_at,
                //tool?
            }
        },
        createViewing(inspectionMissing) {
            return {
                id: inspectionMissing.id,
                 //tool?
                //  projectToolsId: inspectionMissing.project_tools_id, 
                updated: inspectionMissing.updated,
            }
        },
        // async doSearch({Code = '', Active = '', GroupTools = '', Status=''}, reset = false){
            
        //     if(reset && this.filtered === false || !reset && this.filtered === false && (!Code && !Active && !GroupTools && !Status))
        //         return;
        //     this.filtered = reset ? false : true;
        //     const response = await axios.get(
        //         `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/search?code=${Code}&active=${Active && Number(Active)}&groupTools=${GroupTools == -1 ? '': GroupTools}&statusTools=${Status}`
        //     );
        //     this.refactoringViewing(response);
        // },
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
                //existe??
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
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/projecttool`,
                    formData
                );
                this.inspectionsMissing.push(this.createObj(response.data));
                this.totalItems += 1;
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
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
        
        // async update(inspectionMissingId, formData) {
        //     try {
        //         const response = await axios.put(
        //             `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/${inspectionMissingId}`,
        //             formData
        //         );
        //         this.inspections[this.inspections.findIndex(inspection => inspection.id == inspectionId)] = this.createObj(response.data)
        //         this.get(this.pag.actualPage);
        //         return response.data
        //     } catch (error) {
        //         throw error
        //     }
        // },
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
        // async deleteTool(inspectionId) {
        //     try {
        //         await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/inspections/${inspectionId}`);
        //         const InspectionDelete = this.inspections.findIndex(inspection => inspection.id === inspectionId)
        //         this.inspections.splice(InspectionDelete, 1);
        //         this.totalItems -= 1;
        //         this.get(this.calculatePages() ?? this.pag.actualPage);
        //     } catch (error) {
        //         throw error;
        //     }
        // },
        getData(id){
            return this.inspectionsMissing.find(inspectionMissing => id == inspectionMissing.id)
            }
    }
});