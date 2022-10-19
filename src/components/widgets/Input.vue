<template>
    <input :type="type" v-model="value" class="font-openSans border rounded text-sm outline-none" :class="borders, background, color, pad" :placeholder="placeholder" @input="this.$emit('update:modelValue', this.value);">
</template>

<script>
    export default {
        data(){
            return {
                value: this.default
            }
        },
        props: {
            default: {
                default: "",
            },
            type: {
                default: "text",
                type: String
            },
            pad: {
                default: "p-3",
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
        methods: {
            resetValues(){
                this.value = '';
            }
        },
        emits: [ 
            'update:modelValue'
        ]
    }
</script>