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
    import { computed } from 'vue';
    import {langStore} from '../../store/langStore';
export default {
    setup () {
        const store = langStore();
        const langsUser = computed(() => store.getLang.UserFeature);

        return {
            langsUser
        }
    },
    components:{
        UserImageName,
        SelectFeature
    }
}
</script>

