<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form @submit.prevent="updateProject" class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7 lg:w-4/5">
                    <InputLabelError ref="formProjectCreateName" v-model="formProjectCreateUpdate.name"
                        placeholder="Insert a name" :msg="langs.NameError" :name="langs.Name"
                        :default="formProjectCreateUpdate.name" />
                    <InputLabelError ref="formProjectCreateAddress" v-model="formProjectCreateUpdate.address"
                        placeholder="Insert address" :msg="langs.AddressError" :name="langs.Address"
                        :default="formProjectCreateUpdate.address" />
                    <!-- <SelectLabel ref="formUserCreateRole" :msg="langs.RoleError" :items="roles" :name="langs.Role"
                        :default="formUserCreateUpdate.role_id" v-model="formUserCreateUpdate.role_id" /> -->
                    <SwitchLabel v-if="showStatus" v-model="formProjectCreateUpdate.status" @change="changeValue"
                        :default="Boolean(formProjectCreateUpdate.status)  " :name="langs.Status" />
                </div>
            </div>
            <Button :text="langs.Save"> </Button>
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
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";


export default {
    props: ['status', 'project', 'showStatus'],
    data() {
        return {
            projectStore: projectStore(),
            formProjectCreateUpdate: {
                name: this.project ? this.project.name : '',
                address: this.project ? this.project.address : '',
                status: this.project ? this.project.status : '',
            }
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PopupAddProject
        }
    },
    methods: {
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        changeValue() {
            this.formProjectCreateUpdate.status = Number(this.formProjectCreateUpdate.status)
        },
        updateProject() {
            try {
                if (this.validateData({
                    name: this.formProjectCreateUpdate.name,
                    address: this.formProjectCreateUpdate.address,
                    status: this.formProjectCreateUpdate.status
                }, {
                    name: this.$refs.formProjectCreateName,
                    address: this.$refs.formProjectCreateAddress,
                    status: this.$refs.formProjectCreateStatus
                }))
                    (async () => {
                        try {
                            this.project &&
                             await this.projectStore.update(
                                this.project.id,
                                this.project.name, 
                                this.project.address, 
                                this.project.status
                             );
                           
                            !this.project &&
                             await this.projectStore.add(
                                    this.name = this.formProjectCreateUpdate.name,
                                    this.address = this.formProjectCreateUpdate.address,
                                    this.status = this.formProjectCreateUpdate.status,
                             );
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
        SelectLabel,
        SwitchLabel
    },
    emits: ['activeToast'],
    mixins: [FormValidate]
}
</script>