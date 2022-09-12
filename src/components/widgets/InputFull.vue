<template>
  <div class="flex flex-col gap-2">
    <Input :type="type" v-model="value" :placeholder="placeholder" :name="name" @input="changeValue"/>
    <label v-if="isError" class="font-openSans text-xs text-red-500">{{ msg }}</label>
  </div>
</template>

<script>
import Input from './Input.vue';
    export default {
    data(){
        return {
            isError: false,
            value: ''
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
    ],
    methods: {
        inputValid(){
                if(!this.value)
                    return this.isError = true;
                return this.isError = false;
        },
        changeValue(event){
            this.inputValid();
            this.$emit("update:modelValue", event.target.value);
        }
    },
    components: { Input }
}
</script>
