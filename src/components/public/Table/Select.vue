<template>
    <select @change="this.$emit('selectOption', value)" v-model="value" class="bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer w-full lg:w-auto">
        <option v-for="item in selectItems" :value="item.key" :hidden=item.disabled>{{item.value}}</option>
    </select>
</template>

<script>
    export default{
        data(){
            return {
                value: '',
                id: this.num
            }
        },
        props: ['selectItems', 'num'],
        emits: ['selectOption']
    }
</script>