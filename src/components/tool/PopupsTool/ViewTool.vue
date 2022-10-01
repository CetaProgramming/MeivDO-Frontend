<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo"></Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
export default {
    data() {
        return {};
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupViewTool
        }
    },
    components: { Popoup }
}
</script>

<style lang="scss" scoped>

</style>