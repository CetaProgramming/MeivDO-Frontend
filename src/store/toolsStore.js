import { defineStore } from "pinia";
import axios from "axios";
import { groupToolsStore } from "./groupToolsStore";
import { categoryStore } from "./categoryStore";

export const toolsStore = defineStore('toolsStore', {
    state: () => {
        return {
            tools: [],
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
        createObj(tool) {
            const findSameID= groupToolsStore().groupTools.findIndex(groupTool => groupTool.id == tool.group_tools_id)
            const [refGroupTools] = groupToolsStore().groupTools.slice(findSameID,findSameID +1)  

            return {
                id: tool.id,
                code: tool.code,
                status: tool.status_tools, 
                group: refGroupTools,
                user: tool.user,
                active: Number(tool.active),
                updated: tool.updated_at,
                project: tool.project_tools
            }
        },
        createViewing(tool) {
            return {
                id: tool.id,
                code: tool.code,
                group:  tool.group.code,
                status: tool.status, 
                active: Number(tool.active),
                updated: tool.updated,
            }
        },
        async doSearch({Code = '', Active = '', GroupTools = '', Status=''}, reset = false){
            
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Code && !Active && !GroupTools && !Status))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/search?code=${Code}&active=${Active && Number(Active)}&groupTools=${GroupTools}&statusTools=${Status}`
            );
            this.refactoringViewing(response);
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools`
            );
            this.refactoringViewing(response);
        },
        refactoringViewing(response){
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad.push(1);
            this.tools = response.data.data.map(tool => this.createObj(tool)),
                this.viewing = this.pageViewing(this.tools)
        },
        pageViewing(tools) {
            return tools.map(tool => this.createViewing(tool));
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools?page=${page}`
                );
                await response.data.data.forEach(tool => !this.tools.some(toolVer => toolVer.id === tool.id) && this.tools.push(this.createObj(tool)));
                this.tools.sort((tool1, tool2) => tool1.id.value - tool2.id.value);
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
                const lastIndex = itemPageAtual < this.tools.length ? itemPageAtual : this.tools.length;
                this.tools.sort((tool1, tool2) => tool1.id.value - tool2.id.value);
                this.viewing = this.pageViewing(this.tools.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools`,
                    formData
                );
                this.tools.push(this.createObj(response.data));
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.tools.length / this.perPage);
            if(this.pag.lastPage !== lastPage)
                return this.pag.lastPage = lastPage;
        },
        
        async update(toolId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/${toolId}`,
                    formData
                );
                this.tools[this.tools.findIndex(tool => tool.id == toolId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                groupToolsStore().mount()
                categoryStore().mount()
                return response.data
            } catch (error) {
                throw error
            }

        },
        
        async deleteTool(toolId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/tools/${toolId}`);
                const ToolDelete = this.tools.findIndex(tool => tool.id === toolId)
                this.tools.splice(ToolDelete, 1);
                this.get(this.calculatePages() ?? this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
        getData(id){
            return this.tools.find(tool => id == tool.id)
            }
    }
});