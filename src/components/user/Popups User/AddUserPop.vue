<template>
    <Popoup :titlePopUp="langs.Title"  >
        <div
            class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  md:grid-cols-1fr-auto md:justify-between  md:flex-row ">
            <div class="flex flex-col gap-7">
                <InputLabelError ref="formUserCreateName" v-model="formUserCreateUpdate.name"
                    placeholder="Insert a name" :msg="langs.EmailError" :name="langs.Name" />
                <InputLabelError ref="formUserCreateEmail" type="email" v-model="formUserCreateUpdate.email"
                    placeholder="Insert email" :msg="langs.EmailError" :name="langs.Email" />
                <SelectLabel name="teste" :items="roles"/>
               <LabelAndSwitch  :title="langs.Active" v-if="showActive"/>
            </div>
            <ImgAndButton :btnTitle="langs.UploadNewPicture"/>  
        </div>
        <Button :text="langs.Save"> </Button>
    </Popoup>
</template>

<script>
import { computed } from 'vue';
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import Input from '../../widgets/Input.vue';
import DarkModeSwitch from '../../dashboard/DarkModeSwitch.vue';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabel from '../../forms/SelectLabel.vue';
import {usersStore} from '../../../store/usersStore'
import LabelAndSwitch from '../../forms/labelAndSwitch.vue';
import ImgAndButton from '../../forms/ImgAndButton.vue';


export default {
    props: ['active', 'user', 'showActive'],
    setup() {
        const store = langStore();
        const langs = computed(() => store.getLang.PopupAddUser);

        return {
            langs
        };
    },
    data() {
        return {
            showActive : false,
            roles: [],
            formUserCreateUpdate: {
                name: '',
                email: '',
                role_id: '',
                image: '',
                active: ''
            }
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
    LabelAndSwitch,
    ImgAndButton
}
}
</script>

