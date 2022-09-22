<template>
    <Popoup :titlePopUp="langs.Title">
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  md:grid-cols-1fr-auto md:justify-between  md:flex-row ">
            <div class="flex flex-col gap-7">
                <InputLabelError ref="formUserCreateName" v-model="formUserCreateUpdate.name"
                    placeholder="Insert a name" :msg="langs.EmailError" :name="langs.Name" :default="formUserCreateUpdate.name" />
                <InputLabelError ref="formUserCreateEmail" type="email" v-model="formUserCreateUpdate.email"
                    placeholder="Insert email" :msg="langs.EmailError" :name="langs.Email" :default="formUserCreateUpdate.email" />
                <SelectLabel name="teste" :items="roles" :default="formUserCreateUpdate.role_id" v-model="formUserCreateUpdate.role_id" />
                <SwitchLabel v-model="formUserCreateUpdate.active" :default=  "Boolean(formUserCreateUpdate.active) " :name="langs.Active"/>
            </div>
            <ImgAndButton :image="formUserCreateUpdate.image" :btnTitle="langs.UploadNewPicture" />
        </div>
        <Button :text="langs.Save"> </Button>
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
import { usersStore } from '../../../store/usersStore'
import ImgAndButton from '../../forms/ImgAndButton.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';


export default {
    props: ['active', 'user', 'showActive'],
    data() {
        return {
            roles: [],
            formUserCreateUpdate: {
                 name: this.user ? this.user.name : '',
                email: this.user ? this.user.email : '',
                role_id: this.user ? this.user.role.id : '',
                image: this.user ? this.user.image : '',
                active: this.user ? this.user.active : '',
            }
        }
    },
    computed: {
        langs(){
           return langStore().getLang.PopupAddUser
        }
},
     async mounted(){
    this.roles = await usersStore().getRoles()
},
components: {
    Popoup,
    Button,
    Input,
    DarkModeSwitch,
    InputLabelError,
    SelectLabel,
    ImgAndButton,
    SwitchLabel
}
}
</script>

