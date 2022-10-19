<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="AddUpdateInspection" class="flex flex-col gap-5 font-openSans">
            <LabelShowInfo :header="langs.Tools" :info="this.value.tool.code"></LabelShowInfo>
            <LabelShowInfo :header="langs.Projects" :info="this.value.project.name"></LabelShowInfo>
            <TextAreaLabel ref="formInspectionDescription" :name="langs.Description"
                :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError"
                v-model="formUpdateInspection.description" :default="formUpdateInspection.description">
            </TextAreaLabel>
            <LabelPickOptions ref="formInspectionStatus" :default="formUpdateInspection.status"
                v-model="formUpdateInspection.status" :name="langs.LabelText" :text="langs.TextButtons"
                :msg="langs.SelectButton" />
            <Button :text="langs.Save"></Button>

        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore'
import { inspectionMissingStore } from '../../../store/inspectionMissingStore'
import LabelSelectWithInputError from '../../forms/LabelSelectWithInputError.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import Button from '../../widgets/Button.vue';
import LabelPickOptions from '../../forms/LabelPickOptions.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
export default {
    props: ['value'],
    data() {
        return {
            activeTools: [],        
            formUpdateInspection: {
                description: '',
                status: -1,
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageInspections.UpdateInspectionMissing
        },
        langsToast() {
            return langStore().getLang.PageTool.PopupAddGroupTool
        }
    },
    methods: {
        
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        AddUpdateInspection() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    status: Number(this.formUpdateInspection.status),
                    description: this.formUpdateInspection.description
                }, {
                    status: this.$refs.formInspectionStatus,
                    description: this.$refs.formInspectionDescription
                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await inspectionMissingStore().update(this.value.id,
                                    {
                                        status: this.formUpdateInspection.status,
                                        additionalDescription: this.formUpdateInspection.description,
                                        inspection_projecttool_id: this.value.id
                                    }
                                );
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.value && this.langsToast.updatedSucess || !this.value && this.langsToast.createdSucess,
                                type: ToastSuccess
                            });
                        } catch (error) {
                            console.error(error);
                            this.$emit("activeToast", {
                                msg: this.langsToast.errorCreatedUpdated,
                                type: ToastError
                            });
                        }
                    })();
            } catch (e) {
                console.log(e);
            }
        }

    },
    components: { Popoup, LabelSelectWithInputError, TextAreaLabel, ButtonIcon, Button, LabelPickOptions, LabelShowInfo },
    emits: ['activeToast', 'closePopUp'],
    mixins: [FormValidate]
}
</script>

<style lang="scss" scoped>

</style>