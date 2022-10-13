<template>

    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfo :header="langs.Code" :info="formGroupToolShow.code"></LabelShowInfo>
                 <LabelShowInfo :header="langs.Category" :info="formGroupToolShow.category"></LabelShowInfo>
                <LabelShowStatus :header="langs.Code" :info="formGroupToolShow.active" ></LabelShowStatus>
                <LabelShowInfo :header="langs.Description" :info="formGroupToolShow.description"></LabelShowInfo>
                
            </div>
        </div>
    </Popoup>
</template>
<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';
import { groupToolsStore } from '../../../store/groupToolsStore';
export default {
    props: ['value'],
    data() {
        return {
            groupToolsStore: groupToolsStore(),
            formGroupToolShow: {
                code: this.value.code,
                category: this.value.category.name,
                active: this.value.active,
                description: this.value.description

            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupViewGroupTool
        }
    },
    components: {
        Popoup,
        LabelShowInfo,
        LabelShowStatus
    },
}
</script>

