<template>
     <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <UserImageName/>
                <div>
                    <div class="flex gap-4 ">
                        <SelectFeature/>
                        <button class="bg-green-500 p-2 text-white rounded-lg dark:bg-green-600 dark:text-black">+ {{langsUser.ButtonNew}}</button>
                    </div>
                </div>
            </div>
</template>

<script>
    import UserImageName from './UserImageName.vue';
    import SelectFeature from './SelectFeature.vue';
    import {langStore} from '../../store/langStore';
export default {
    computed: {
        langsUser(){
            return langStore().getLang.UserFeature
        }
    },
    components:{
        UserImageName,
        SelectFeature
    }
}
</script>

