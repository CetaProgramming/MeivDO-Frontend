<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfo :header="langs.Tool" :info="formGroupRepairCompletedShow.tool"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Inspection" :info="formGroupRepairCompletedShow.inspection"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Reason" :info="formGroupRepairCompletedShow.reason"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Solution" :info="formGroupRepairCompletedShow.solution"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Description" :info="formGroupRepairCompletedShow.description"></LabelShowInfo>  
            </div>
        </div>
    </Popoup>
</template>
<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';
import { inspectionCompletedStore } from '../../../store/inspectionCompletedStore'
export default {
    props: ['value'],
    data() {
        return {
            groupToolsStore: inspectionCompletedStore(),
            formGroupRepairCompletedShow: {
                tool: this.value.tool.code,
                inspection: this.value.inspection.id,
                reason: this.value.reason,
                solution: this.value.solution,
                description: this.value.description
            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageRepairs.PopupViewRepair
        }
    },
    components: {
        Popoup,
        LabelShowInfo,
        LabelShowStatus
    },
}
</script>

