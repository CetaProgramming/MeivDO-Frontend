<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name" />
        <div class="flex bg-zinc-300 p-1 rounded-md dark:bg-zinc-800 relative items-center">
            <input type="date" ref="inputReset" v-model="value" :placeholder="name.Input" pad="p-1" @input="changeValue" class=" w-full bg-zinc-300 dark:bg-zinc-800">
        </div>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import Input from '../widgets/Input.vue';
export default {
    data() {
        return {
            value: ''
        };
    },
    props: {
        default: {
            default: "",
        },
        name: {
            default: "Date",
            type: String,
        }
    },
    methods: {
        changeValue(event) {
            this.$emit('update:modelValue', event.target.value)
        },
        resetValues(){
            this.value = '';
            this.$refs['inputReset'].resetValues();
        }
    },

    components: {
    Label,
    Input
}
}
</script>