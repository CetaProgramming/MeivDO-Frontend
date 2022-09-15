<template>
    <div class="hidden p-4 mt-6 bg-zinc-300 rounded-md  xl:grid  font-bold justify-center" :style=GetLenght>
        <h1  v-for="item in Items" class="text-center">{{item}} </h1>
      
    </div>
</template>

<script>
export default {
    props:['Items'],
    computed: {
        GetLenght() {
            
            return   `grid-template-columns: repeat(${this.Items.length}, minmax(0, 1fr));`
        }
    }
}
</script>


