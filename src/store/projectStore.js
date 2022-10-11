import { defineStore } from 'pinia';
import axios from 'axios';
import DataManipulate from '../helpers/DataManipulate';

export const projectStore = defineStore('projectStore', {
    state: () => {
        return {
            projects: [],
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
        createObj(project){
            return {
                id: project.id,
                name: project.name,
                address: project.address,
                status: Number(project.status),
                startDate: DataManipulate.formDate(project.startDate),
                endDate: DataManipulate.formDate(project.endDate),
                userId: project.user_id,
                updated : project.updated_at,
                project_tools: project.project_tools
            }
        },
        createViewing(project) {
            return {
                id: project.id,
                name: project.name,
                startDate: DataManipulate.formDate(project.startDate),
                endDate: DataManipulate.formDate(project.endDate),
                status: project.status,
                updated: project.updated,
            }
        },
        async doSearch({Name = '', Status = '', StartDate = '', EndDate = ''}, reset = false){
            console.log(reset, this.filtered);
            if(reset && this.filtered === false || !reset && this.filtered === false && (!Name && !Status && !StartDate && !EndDate))
                return;
            this.filtered = reset ? false : true;
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects/search?name=${Name}&status=${Status && Number(Status)}&startDate=${StartDate ?? new Date(StartDate)}&endDate=${EndDate ?? new Date(EndDate)}`
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
            this.projects = response.data.data.map(project => this.createObj(project)),
                this.viewing = this.pageViewing(this.projects)
        },
        async mount() {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects`
            );
            this.pag.actualPage = response.data.current_page;
            this.pag.lastPage = response.data.last_page;
            this.totalItems = response.data.total;
            this.perPage = response.data.per_page;
            this.pagesLoad.push(1);
            this.projects = response.data.data.map(project => this.createObj(project)),
                this.viewing = this.pageViewing(this.projects)
        },
        pageViewing(projects) {
            return projects.map(project => this.createViewing(project));
        },
        async changeStatus(projectId, formData){
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects/${projectId}/status`,
                    formData
                );
                this.projects[this.projects.findIndex(project => project.id == projectId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        async load(page) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects?page=${page}`
                );
                await response.data.data.forEach(project => !this.projects.some(projectVer => projectVer.id === project.id) && this.projects.push(this.createObj(project)));
                this.projects.sort((project1, project2) => project1.id.value - project2.id.value);
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
                const lastIndex = itemPageAtual < this.projects.length ? itemPageAtual : this.projects.length;
                this.projects.sort((project1, project2) => project1.id.value - project2.id.value);
                this.viewing = this.pageViewing(this.projects.slice(firstIndex, lastIndex));
                this.pag.actualPage = page;
            } catch (e) {
                throw e;
            }
        },
        async add(formData) {
            try {
                console.log(formData);
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects`,
                    formData
                );
                this.projects.push(this.createObj(response.data));
                this.totalItems += 1;
                this.calculatePages();
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        calculatePages(){
            const lastPage = Math.ceil(this.projects.length / this.perPage);
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
        async update(projectId, formData) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects/${projectId}`,
                    formData
                );
                this.projects[this.projects.findIndex(project => project.id == projectId)] = this.createObj(response.data)
                this.get(this.pag.actualPage);
                return response.data
            } catch (error) {
                throw error
            }
        },
        async deleteProject(projectId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${import.meta.env.VITE_API_PREFIX}/projects/${projectId}`);
                const projectDelete = this.projects.findIndex(project => project.id === projectId)
                this.projects.splice(projectDelete, 1);
                this.totalItems -= 1;
                this.get(this.calculatePages() ?? this.pag.actualPage);
            } catch (error) {
                throw error;
            }
        },
    }
});