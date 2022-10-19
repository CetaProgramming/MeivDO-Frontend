<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfoVue :header="langs.Name" :info="this.project.name"/>
                <LabelShowInfoVue :header="langs.Address" :info="this.project.address"/>
                <LabelShowInfoVue :header="langs.StartDate" :info="formatDate(this.project.startDate)"/>
                <LabelShowInfoVue :header="langs.EndDate" :info="formatDate(this.project.endDate)"/>
                <LabelShowStatus :header="langs.Status" :info="this.project.status"/>
                <LabelShowInfoVue :header="langs.Tools" :info="projectTools"/>
            </div>
        </div>
    </Popoup>

</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfoVue from '../../forms/LabelShowInfo.vue';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';
import DataManipulate from '../../../helpers/DataManipulate'


export default {
    props: ['status', 'project', 'showStatus'],
    computed: {
        langs() {
            return langStore().getLang.PageProjects.PopupShowProject
        },
        projectTools(){
            return this.project.project_tools.map(project=>project.tool.code).join(', ')
        }
    },
    methods: {
        formatDate(dateProject){
            return dateProject? DataManipulate.formDate(dateProject) : '' 
        }
    },
    components: {
    Popoup,
    LabelShowInfoVue,
    LabelShowStatus
}   
}
</script>