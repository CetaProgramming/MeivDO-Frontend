<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
               <PageImageName :img="langsItems.projects.img" :title="langsItems.projects.title" />
               <div>
                   <div class="flex gap-4 ">
                       <NavigateItemMenu />
                       <Button @click="isAddProjectClicked = !isAddProjectClicked" :text="langsProject.ButtonNew"  pad="px-4 py-2" class="rounded-lg"></Button>
                   </div>
               </div>
           </div>
          <AddProjectPop v-if="isAddProjectClicked" @activeToast="activeToast" @closePopUp="isAddProjectClicked= false" :showActive="false"/>
</template>

<script>
   import PageImageName from '../public/Table/PageImageName.vue';
   import {langStore} from '../../store/langStore';
   import NavigateItemMenu from '../public/NavigateItemMenu.vue';
   import Button from '../widgets/Button.vue';
   import AddProjectPop from './PopupsProject/AddProjectPop.vue';
   export default {
       data(){
         return{
             isAddProjectClicked: false,
         }
       },
       computed: {
           langsProject(){
               return langStore().getLang.PageProjects.ProjectFeature
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
   AddProjectPop
}
}
</script>
