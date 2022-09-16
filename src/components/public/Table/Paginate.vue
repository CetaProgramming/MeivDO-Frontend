<template>
    <div class=" justify-end bottom-0 right-4  flex  mt-4" >
        <div  class="bg-white flex gap-2  p-1 rounded-md">
        <div class="pagination flex gap-4 ">
            <a class="hover:bg-black hover:text-white" href="#">&laquo;</a>
            <a class="hover:bg-black hover:text-white"  href="#">1</a>
            <a class="hover:bg-black hover:text-white"  href="#" >2</a>
            <a class="hover:bg-black hover:text-white"  href="#">3</a>
            <a class="hover:bg-black hover:text-white"  href="#">4</a>
            <a class="hover:bg-black hover:text-white"  href="#">5</a>
            <a class="hover:bg-black hover:text-white"  href="#">6</a>
            <a class="hover:bg-black hover:text-white"  href="#">&raquo;</a>
        </div>
        <p>Go to Page</p>
        <input  class="bg-gray-200 w-7 rounded-md" type="text">
        <p class="font-bold hover:cursor-pointer">Go ></p>
    </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

