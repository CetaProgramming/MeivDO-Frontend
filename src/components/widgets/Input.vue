<template>
    <div class="flex flex-col gap-2">
        <label for="{{name}}" class="block text-sm font-medium text-gray-900 dark:text-white">{{name}}</label>
        <input :type="type" v-model="value" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800" :placeholder="placeholder" @change="inputValid" @input="this.$emit('update:modelValue', this.value);">
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value: ""
            }
        },
        props: {
            type: {
                default: "text",
                type: String
            },
            name: {
                default: "input",
                type: String,
            },
            msg: {
                default: "error",
                type: String,
            },
            placeholder: {
                default: "",
                type: String,
            }
        },

        emits: [ 
            'update:modelValue'
        ]
        
    }
</script>