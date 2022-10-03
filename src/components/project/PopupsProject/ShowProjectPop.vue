<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfoVue :header="langs.Name" :info="this.project.name"/>
                <LabelShowInfoVue :header="langs.Address" :info="this.project.address"/>
                <LabelShowInfoVue :header="langs.StartDate" :info="this.project.startDate"/>
                <LabelShowInfoVue :header="langs.EndDate" :info=" this.project.endDate"/>
                <LabelShowStatus :header="langs.Status" :info="this.project.status"/>
            </div>
        </div>
    </Popoup>

</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfoVue from '../../forms/LabelShowInfo.vue';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';


export default {
    props: ['status', 'project', 'showStatus'],
    computed: {
        langs() {
            return langStore().getLang.PageProjects.PopupShowProject
        }
    },
    components: {
    Popoup,
    LabelShowInfoVue,
    LabelShowStatus
}   
}
</script>