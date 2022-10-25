<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name" />
        <Switch v-model="value" :default="default" @change="changeValue"/>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import Switch from '../widgets/Switch.vue';
export default {
    data() {
        return {
            value: this.default
        };
    },
    props: {
        default: {
            type: Boolean,
            default: false,
        },
        name: {
            default: "input",
            type: String,
        },
    },
    methods: {
        changeValue() {
            this.$emit('update:modelValue', this.value)
        }
    },
    emits: [
        'update:modelValue'
    ],

    components: {
    Label,
    Switch
}
}
</script>

