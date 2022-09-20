<template> 
    <div v-for="item in items" class="bg-white rounded-md flex flex-col min-w-fit md:flex-row md:flex-wrap gap-2 lg:grid py-2 px-4 mt-1 items-center md:overflow-auto dark:bg-MeivMatteBlack" :style="style" :key=item.id.value>
        <div v-for="subitem,index in Object.keys(item)" class="grid overflow-auto md:text-ellipsis lg:block w-full lg:w-auto gap-3 justify-items-start md:w-[49%] grid-cols-auto-1fr">
            <p class="font-bold lg:hidden dark:text-white">{{header[index]}}</p>
            <p :title="item[subitem].type === 'Text' ? item[subitem].value : ''" class="text-center truncate dark:text-white" v-html="item[subitem].value"></p>
        </div>
        <Select :selectItems="selectItems" @selectOption="selectItem($event, item.id.value)"/>
    </div>
</template>

<script>
import Select from './../Table/Select.vue'

export default {
    props: ['style', 'items', 'header', 'selectItems'],
    components: {
        Select
    },
    emits: [ 'selectOption'],
    methods: {
        selectItem(select,event){
            this.$emit('selectOption', select, event);
        }
    }
}
</script>

