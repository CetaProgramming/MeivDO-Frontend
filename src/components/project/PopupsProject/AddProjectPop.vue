<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form @submit.prevent="updateProject" class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1 md:justify-between ">
                <div class="flex flex-col gap-7">
                    <InputLabelError ref="formProjectCreateName" v-model="formProjectCreateUpdate.name"
                        placeholder="Insert a name" :msg="langs.NameError" :name="langs.Name"
                        :default="formProjectCreateUpdate.name" />
                    <InputLabel v-model="formProjectCreateUpdate.address"
                        placeholder="Insert address" :name="langs.Address"
                        :default="formProjectCreateUpdate.address" />
                        <div class="grid grid-cols-2 gap-6">
                            <SelectDate v-model="formProjectCreateUpdate.startDate" :default="formProjectCreateUpdate.startDate" :name="langs.StartDate"/>
                            <SelectDate v-model="formProjectCreateUpdate.endDate" :default="formProjectCreateUpdate.endDate" :name="langs.EndDate"/>
                        </div>
                        <InputCheckbox v-model="showTools" @update:model-value="isShowToolsManagament" :name="langs.addTools" />
                        <ManagementTools v-if="showTools" />
                </div>
            </div>
            <Button :text="langs.Save" />
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
import InputLabel from '../../forms/InputLabel.vue';
import SelectLabel from '../../forms/SelectLabel.vue';
import { projectStore } from '../../../store/projectStore'
import SwitchLabel from '../../forms/SwitchLabel.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import SelectDate from '../../forms/SelectDate.vue';
import DataManipulate from '../../../helpers/DataManipulate';
import InputCheckbox from '../../forms/InputCheckbox.vue';
import ManagementTools from '../managementTools/ManagementTools.vue';

export default {
    props: ['status', 'project', 'showStatus'],
    data() {
        return {
            showTools: false,
            projectStore: projectStore(),
            formProjectCreateUpdate: {
                name: this.project ? this.project.name : '',
                address: this.project ? this.project.address : '',
                startDate: this.project ? DataManipulate.formInputDate(this.project.startDate) : '',
                endDate: this.project ? DataManipulate.formInputDate(this.project.endDate) : '',
            }
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageProjects.PopupAddProject
        }
    },
    methods: {
        isShowToolsManagament(value){
            this.showTools = value;
        },
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        updateProject() {
            try {
                if (this.validateData({
                    name: this.formProjectCreateUpdate.name
                }, {
                    name: this.$refs.formProjectCreateName
                }))
                    (async () => {
                        try {
                            this.project &&
                             await this.projectStore.update(
                                this.project.id,
                                this.formProjectCreateUpdate
                             );
                           
                            !this.project &&
                             await this.projectStore.add(this.formProjectCreateUpdate);
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.project && this.langs.updatedSucess || !this.user && this.langs.createdSucess,
                                type: ToastSuccess
                            });
                        } catch (error) {
                            this.$emit("activeToast", {
                                msg: this.langs.errorCreatedUpdated,
                                type: ToastError
                            });
                         }
                    })();
            } catch (e) {
                console.log(e);
            }
        },
    },
    components: {
    Popoup,
    Button,
    Input,
    DarkModeSwitch,
    InputLabelError,
    InputLabel,
    SelectLabel,
    SwitchLabel,
    SelectDate,
    InputCheckbox,
    ManagementTools
},
    emits: ['activeToast'],
    mixins: [FormValidate]
}
</script>