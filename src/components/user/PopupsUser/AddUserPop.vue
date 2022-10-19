<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form @submit.prevent="updateUser" class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7 lg:w-4/5">
                    <InputLabelError ref="formUserCreateName" v-model="formUserCreateUpdate.name"
                        :placeholder="langs.PlaceholderName" :msg="langs.NameError" :name="langs.Name"
                        :default="formUserCreateUpdate.name" />
                    <InputLabelError ref="formUserCreateEmail" type="email" v-model="formUserCreateUpdate.email"
                        :placeholder="langs.PlaceholderEmail" :msg="langs.EmailError" :name="langs.Email"
                        :default="formUserCreateUpdate.email" />
                    <SelectLabelError ref="formUserCreateRole" :msg="langs.RoleError" :items="roles" :name="langs.Role"
                        :default="formUserCreateUpdate.role_id" v-model="formUserCreateUpdate.role_id" />
                    <SwitchLabel v-if="showActive" v-model="formUserCreateUpdate.active" @change="changeValue"
                        :default="Boolean(formUserCreateUpdate.active)  " :name="langs.Active" />
                </div>
                <ImgAndButton class="gap-3" @activeToast="activeToast" @changePicture="selectedFile"
                    :image="formUserCreateUpdate.image" :btnTitle="langs.Upload" />
            </div>
            <Button :text="langs.Save"> </Button>
        </form>
    </Popoup>

</template>

<script>
import DataManipulate from "../../../helpers/DataManipulate";
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import Input from '../../widgets/Input.vue';
import DarkModeSwitch from '../../dashboard/DarkModeSwitch.vue';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabelError from '../../forms/SelectLabelError.vue';
import { usersStore } from '../../../store/usersStore'
import ImgAndButton from '../../forms/ImgAndButton.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";


export default {
    props: ['active', 'user', 'showActive'],
    data() {
        return {
            userStore: usersStore(),
            roles: [],
            formUserCreateUpdate: {
                name: this.user ? this.user.name : '',
                email: this.user ? this.user.email : '',
                role_id: this.user ? this.user.role.id : '',
                image: this.user ? this.user.image : usersStore().imgProfileDefault,
                active: this.user ? this.user.active : '',
                selectedImage: '',
            }
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageUsers.PopupAddUser
        }
    },
    async mounted() {
        this.roles = await usersStore().getRoles()
    },
    methods: {
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        changeValue() {
            this.formUserCreateUpdate.active = Number(this.formUserCreateUpdate.active)
        },
        selectedFile(fileImage) {
            console.log(fileImage)
            this.formUserCreateUpdate.selectedImage = fileImage
        },
        updateUser() {
            try {
                if (this.validateData({
                    name: this.formUserCreateUpdate.name,
                    email: this.formUserCreateUpdate.email,
                    role_id: this.formUserCreateUpdate.role_id,
                }, {
                    name: this.$refs.formUserCreateName,
                    email: this.$refs.formUserCreateEmail,
                    role_id: this.$refs.formUserCreateRole,
                }))
                    (async () => {
                        try {
                            this.user &&
                             await this.userStore.update(this.user.id,
                                DataManipulate.formDataImage({
                                    name: this.formUserCreateUpdate.name,
                                    email: this.formUserCreateUpdate.email,
                                    image: this.formUserCreateUpdate.selectedImage,
                                    active: this.formUserCreateUpdate.active,
                                    role_id: this.formUserCreateUpdate.role_id
                                }, true)
                                );
                           
                                !this.user &&
                             await this.userStore.add(
                                DataManipulate.formDataImage({
                                    name: this.formUserCreateUpdate.name,
                                    email: this.formUserCreateUpdate.email,
                                    image: this.formUserCreateUpdate.selectedImage,
                                    role_id: this.formUserCreateUpdate.role_id
                                })
                                );
                                console.log(this.user);
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.user && this.langs.updatedSucess || !this.user && this.langs.createdSucess,
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
        SelectLabelError,
        ImgAndButton,
        SwitchLabel
    },
    emits: ['activeToast'],
    mixins: [FormValidate]
}
</script>

