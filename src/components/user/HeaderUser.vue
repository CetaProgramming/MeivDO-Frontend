<template>
     <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <UserImageName/>
                <div>
                    <div class="flex gap-4 ">
                        <SelectFeature/>
                        <Button @click="isAddUserClicked = !isAddUserClicked" :text="langsUser.ButtonNew" bg="bg-green-500" class="rounded-lg"></Button>
                    </div>
                </div>
            </div>
           <AddUserPop v-if="isAddUserClicked" @activeToast="showToast" @closePopUp="isAddUserClicked= false"/>
</template>

<script>
    import UserImageName from './UserImageName.vue';
    import SelectFeature from './SelectFeature.vue';
    import { computed } from 'vue';
    import {langStore} from '../../store/langStore'; 
    import Button from '../widgets/Button.vue';
    import AddUserPop from '../user/Popups User/AddUserPop.vue'
export default {
    setup () {
        const store = langStore();
        const langsUser = computed(() => store.getLang.UserFeature);

        return {
            langsUser
        }
    },
    data(){
        return{
            isAddUserClicked: false,
        }
    }
    ,
    components:{
    UserImageName,
    SelectFeature,
    Button,
    AddUserPop
}
}
</script>

