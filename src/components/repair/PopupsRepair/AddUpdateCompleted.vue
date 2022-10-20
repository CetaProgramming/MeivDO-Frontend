<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="AddUpdateRepair" class="flex flex-col gap-5 font-openSans">
          
              <LabelShowInfo :header="langs.Tools" :info="this.value && this.value.tool.code"></LabelShowInfo>
            <LabelShowInfo :header="langs.Projects" :info="this.value && this.value.inspection.id"></LabelShowInfo> 

            <TextAreaLabel ref="formRepairReason" :name="langs.Reason"
            :placeholder="langs.PlaceholderReason" :msg="langs.ReasonError"
            v-model="formUpdateRepair.reason" :default="formUpdateRepair.reason">
        </TextAreaLabel> 
        <TextAreaLabel ref="formRepairSolution" :name="langs.Solution"
        :placeholder="langs.PlaceholderSolution" :msg="langs.SolutionError"
        v-model="formUpdateRepair.solution" :default="formUpdateRepair.solution">
    </TextAreaLabel> 
    <TextAreaLabel ref="formRepairDescription" :name="langs.Description"
        :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError"
        v-model="formUpdateRepair.description" :default="formUpdateRepair.description">
    </TextAreaLabel> 
           
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore'
import { repairCompletedStore } from '../../../store/repairCompletedStore'
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
            formUpdateRepair: {
                description:this.value.description ? this.value.description:  '',
                reason: this.value.reason ? this.value.reason:  '',
                solution:this.value.solution ? this.value.solution:  '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageRepairs.UpdateRepairMissing
        },
        langsToast() {
            return langStore().getLang.PageTool.PopupAddGroupTool
        }
    },
    methods: {
        
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        AddUpdateRepair() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    solution: this.formUpdateRepair.solution,
                    reason: this.formUpdateRepair.reason,
                }, {
                    solution: this.$refs.formRepairSolution,
                    reason: this.$refs.formRepairReason,
                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await repairCompletedStore().update(this.value.id,
                                    {
                                        solution: this.formUpdateRepair.solution,
                                        reason: this.formUpdateRepair.reason,
                                        additionalDescription: this.formUpdateRepair.description,
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