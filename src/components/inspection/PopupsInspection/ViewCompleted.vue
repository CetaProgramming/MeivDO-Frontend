<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfo :header="langs.Code" :info="formGroupInspectionCompletedShow.tool"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Category" :info="formGroupInspectionCompletedShow.description"></LabelShowInfo>
                <LabelShowStatus :header="langs.Code" :info="formGroupInspectionCompletedShow.status" ></LabelShowStatus>
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
            formGroupInspectionCompletedShow: {
                tool: this.value.tool.code,
                description: this.value.description,
                status: this.value.status,

            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageInspections.PopupViewInspection
        }
    },
    components: {
        Popoup,
        LabelShowInfo,
        LabelShowStatus
    },
}
</script>

