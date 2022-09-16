<template>
    <div class=" justify-end bottom-0 right-4 flex  mt-4" >
        <div  class="bg-white flex gap-2  p-1 rounded-md dark:bg-MeivMatteBlack">
        <div class="pagination flex gap-4 dark:text-white">
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black" href="#">&laquo;</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">1</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#" >2</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">3</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">4</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">5</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">6</a>
            <a class="hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black"  href="#">&raquo;</a>
        </div>
        <p class="dark:text-white">Go to Page</p>
        <input  class="bg-gray-200 w-7 rounded-md" type="text">
        <p class="font-bold hover:cursor-pointer dark:text-white">Go ></p>
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

