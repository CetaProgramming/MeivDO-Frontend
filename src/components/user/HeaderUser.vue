<template>
     <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <UserImageName/>
                <div>
                    <div class="flex gap-4 ">
                        <NavigateItemMenu />
                        <Button @click="isAddUserClicked = !isAddUserClicked" :text="langsUser.ButtonNew" bg="bg-green-500" class="rounded-lg"></Button>
                    </div>
                </div>
            </div>
           <AddUserPop v-if="isAddUserClicked" @activeToast="showToast" @closePopUp="isAddUserClicked= false" :showActive="false"/>
</template>

<script>
import UserImageName from './UserImageName.vue';
import { langStore } from '../../store/langStore';
import NavigateItemMenu from '../public/NavigateItemMenu.vue';
import Button from '../widgets/Button.vue';
import AddUserPop from './PopupsUser/AddUserPop.vue';
export default {
    data() {
        return {
            isAddUserClicked: false
        }
    },
    computed: {
        langsUser() {
            return langStore().getLang.UserFeature
        }
    },
    components: {
        UserImageName,
        NavigateItemMenu,
        Button,
        AddUserPop
    }
}
</script>

