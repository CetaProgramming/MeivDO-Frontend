<template>
     <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <PageImageName :img="langsItems.users.img" :title="langsItems.users.title" />
                <div>
                    <div class="flex gap-4 ">
                        <NavigateItemMenu />
                        <Button @click="isAddUserClicked = !isAddUserClicked" :text="langsUser.ButtonNew"  pad="px-4 py-2" class="rounded-lg"></Button>
                    </div>
                </div>
            </div>
            <Transition appear>
                <AddUserPop v-if="isAddUserClicked" @activeToast="activeToast" @closePopUp="isAddUserClicked= false" :showActive="false"/>
            </Transition>
</template>

<script>
    import PageImageName from '../public/Table/PageImageName.vue';
    import {langStore} from '../../store/langStore';
    import NavigateItemMenu from '../public/NavigateItemMenu.vue';
    import Button from '../widgets/Button.vue';
    import AddUserPop from './PopupsUser/AddUserPop.vue';
    export default {
        data(){
          return{
              isAddUserClicked: false,
          }
        },
        computed: {
            langsUser(){
                return langStore().getLang.PageUsers.UserFeature
            },
            langsItems(){
                return langStore().getLang.ItemMenu
            }
        },
        methods: {
            activeToast(toast) {
                this.$emit('activeToast', toast);
            }
        },
        emits: ['activeToast'],
    components:{
    PageImageName,
    NavigateItemMenu,
    Button,
    AddUserPop
}
}
</script>

