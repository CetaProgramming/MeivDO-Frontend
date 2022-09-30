<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form @submit.prevent="updateProject" class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-2 lg:w-4/5">
                    <LabelShowInfoVue :header="langs.Name" :info="formProjectShow.name"/>
                    <LabelShowInfoVue :header="langs.Address" :info="formProjectShow.address"/>
                    <LabelShowInfoVue :header="langs.StartDate" :info="formProjectShow.startDate"/>
                    <LabelShowInfoVue :header="langs.EndDate" :info="formProjectShow.endDate"/>
                </div>
            </div>
        </form>
    </Popoup>

</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import Input from '../../widgets/Input.vue';
import DarkModeSwitch from '../../dashboard/DarkModeSwitch.vue';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabel from '../../forms/SelectLabel.vue';
import { projectStore } from '../../../store/projectStore'
import SwitchLabel from '../../forms/SwitchLabel.vue';
import FormValidate from "../../mixins/FormValidate";
import LabelShowInfoVue from '../../forms/LabelShowInfo.vue';


export default {
    props: ['status', 'project', 'showStatus'],
    data() {
        return {
            projectStore: projectStore(),
            formProjectShow: {
                name: this.project.name,
                address: this.project.address,
                startDate: this.project.startDate,
                endDate: this.project.endDate,
            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageProjects.PopupShowProject
        }
    },
    components: {
    Popoup,
    Button,
    Input,
    DarkModeSwitch,
    InputLabelError,
    SelectLabel,
    SwitchLabel,
    LabelShowInfoVue
},
    mixins: [FormValidate]
}
</script>