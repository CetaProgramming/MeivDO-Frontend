<template>
    <input :type="type" v-model="value" class="font-openSans border rounded text-sm p-3 outline-none" :class="borders, background, color" :placeholder="placeholder" @input="this.$emit('update:modelValue', this.value);">
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
            borders: {
                type: String,
                default: "border-gray-500 dark:border-zinc-800"
            },
            background: {
                type: String,
                default: "dark:bg-zinc-800"
            },
            color: {
                type: String,
                default: "text-neutral-900 dark:text-white"
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