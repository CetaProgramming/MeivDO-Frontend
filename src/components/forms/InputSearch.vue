<template>
    <div class="flex flex-col gap-2">
        <Label :name="name.Label" :msg="name.Label" />
        <div class="flex bg-zinc-300 p-1 rounded-md dark:bg-zinc-800 relative items-center">
            <fas class="pl-1" icon="fa-solid fa-search" />
            <Input ref="inputReset" v-model="value" :placeholder="name.Input" pad="p-1" @input="changeValue" class="indent-1 w-full" />
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
            default: "input",
            type: Object,
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