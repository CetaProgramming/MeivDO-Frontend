<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form @submit.prevent="updateInspection" class="flex flex-col gap-5 font-openSans">
            
                <!-- <LabelSelectWithInputError ref="formToolCreateGroup" :name="langs.GroupTools" v-model="formToolCreateUpdate.groupTool" :default="formToolCreateUpdate.groupTool"
                            :items="activeGroupTools" itemFilter="code"></LabelSelectWithInputError> -->
                <TextAreaLabel ref="formInspectionDetail" :name="langs.Description"
                    :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError">
                    <!-- v-model="formInspectionCreateUpdate.description" :default="formGroupToolCreateUpdate.description"> -->
                </TextAreaLabel>
                <LabelPickOptions v-model="formInspectionCreateUpdate.status" :name="langs.LabelText" :text="langs.TextButtons" :msg="langs.SelectButton" />
           

            <!-- <div class="flex gap-10 justify-around">
                <ButtonIcon class="flex flex-col items-center active:bg-blue-600  hover:bg-blue-600"  bg="bg-zinc-400"  text="Good" icon="fa-solid fa-thumbs-up"></ButtonIcon>
                <ButtonIcon class="flex flex-col items-center active:bg-blue-600  hover:bg-blue-600"  bg="bg-zinc-400"  text="Bad" icon="fa-solid fa-thumbs-down"></ButtonIcon>
            </div> -->
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore'
import LabelSelectWithInputError from '../../forms/LabelSelectWithInputError.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import Button from '../../widgets/Button.vue';
import LabelPickOptions from '../../forms/LabelPickOptions.vue';
export default {
    data() {
        return {
            formInspectionCreateUpdate: {
                tool: this.value ? this.value.code : '',
                description: 1,
                status: this.value ? this.value.category.id : -1,
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageInspections.AddInspectionPop
        },
    },
    components: { Popoup, LabelSelectWithInputError, TextAreaLabel, ButtonIcon, Button, LabelPickOptions }
}
</script>

<style lang="scss" scoped>

</style>