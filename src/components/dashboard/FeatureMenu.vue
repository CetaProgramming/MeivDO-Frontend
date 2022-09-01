<template>
    <div class="grid grid-cols-4 bg-MeivAsh gap-4 p-10">
        <ItemMenu v-for="item in ItemMenu" :img="item.img" :title="item.title" :description="item.description"/>
    </div>
</template>

<script>
 import ItemMenu from "./ItemMenu.vue";
    export default {
        data(){
            return {
                ItemMenu : [
                    {
                        img: "src/assets/icons/projects.png",
                        title: "Projects",
                        description: "Which projects the company made and see the details of ongoing projects.",
                    },
                    {
                        img: "src/assets/icons/inspections.png",
                        title: "Inspections",
                        description:"View the inspections that the tools have."
                    },
                    {
                        img: "src/assets/icons/tools.png",
                        title: "Tools",
                        description:"Here you can see the tools the company has as well as their details such as status."
                    },
                    {
                        img: "src/assets/icons/reparations.png",
                        title: "Repairs",
                        description:"The tools that are not in perfect condition, it's necessary to make a repartition, you can view reparation here."
                    },
                    {
                        img: "src/assets/icons/Users.png",
                        title: "Users",
                        description:"View the list of users of the company"
                    }
                ]
            }
        },
        components: { 
            ItemMenu
        }
    }
</script>