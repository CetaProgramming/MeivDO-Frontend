<template>
    <select @click="optionSelected" v-model="value" class="bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer w-full lg:w-auto dark:bg-zinc-800 dark:text-white">
        <option v-for="item in selectItems" :value="item.key" :hidden=item.disabled>{{item.value}}</option>
    </select>
</template>

<script>
    export default{
        data(){
            return {
                value: ''
            }
        },
        methods: {
            optionSelected(event){
                if(this.value)
                    this.$emit('selectOption', this.value)
            }
        },
        props: ['selectItems', 'num'],
        emits: ['selectOption']
    }
</script>