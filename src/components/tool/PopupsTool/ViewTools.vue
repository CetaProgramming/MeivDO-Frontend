<template>
    
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
             <LabelShowInfo :header="langs.Code" :info="formToolShow.code"></LabelShowInfo>
             <LabelShowInfo :header="langs.GroupTools" :info="formToolShow.groupTool"></LabelShowInfo>
             <LabelShowInfo :header="langs.Status" :info="formToolShow.status"></LabelShowInfo>
             <LabelShowStatus :header="langs.Active" :info="formToolShow.active" ></LabelShowStatus>
            </div>
        </div>
    </Popoup>
</template>
<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
import { toolsStore } from '../../../store/toolsStore';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';
export default {
    props: ['value'],
    data() {
        return {
            toolStore: toolsStore(),
            formToolShow: {
                code: this.value.code,
                groupTool: this.value.group.code,
                active: this.value.active,
                status: this.value.status.name,
            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupViewTool
        }
    },
    components: {
    Popoup,
    LabelShowInfo,
    LabelShowStatus
},  
}
</script>
