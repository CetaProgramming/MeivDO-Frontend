<template>

    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
            <div class="flex flex-col gap-2 lg:w-4/5">
                <LabelShowInfo :header="langs.Name" :info="formCategoryShow.name"></LabelShowInfo>
                <LabelShowStatus :header="langs.Active" :info="formCategoryShow.active.active" ></LabelShowStatus>
            </div>
        </div>
    </Popoup>
</template>
<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
import { categoryStore } from '../../../store/categoryStore';
import LabelShowStatus from '../../forms/LabelShowStatus.vue';
export default {
    props: ['value'],
    data() {
        return {
            toolStore: categoryStore(),
            formCategoryShow: {
                name: this.value.name,
                active: this.value,

            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupViewCategory
        }
    },
    components: {
    Popoup,
    LabelShowInfo,
    LabelShowStatus
},
}
</script>

