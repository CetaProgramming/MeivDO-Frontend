<template>

    <div class="bg-white rounded-md grid grid-cols-7 p-2 mt-1 items-center">
        <p class="text-center">1</p>
        <p class="text-center">Administrator Administrator</p>
        <p class="text-center" >tetesttesesttte@gmail.com</p>
        <p class="text-center">Administrator</p>
        <div class="flex justify-center items-center">
            <div class="bg-green-400 rounded-xl w-3 h-3 m-1"> </div>
            <p class="text-center">Active</p>
        </div>
        <p class="text-center">5 minutes ago</p>
        <select id="status" class="bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer">
            <option value="" disabled selected hidden>Options</option>
            <option value="Update">Update</option>
            <option value="ResetPassword">Reset Password</option>
            <option value="Delete">Delete</option>
        </select>
    </div>
    <div class="bg-white rounded-md grid grid-cols-7 p-2 mt-1 items-center">
        <p class="text-center">1</p>
        <p class="text-center">Administrator</p>
        <p class="text-center" title="olaolaola@gmail.com">teste@gmail.com</p>
        <p class="text-center">Administrator</p>
        <div class="flex justify-center items-center">
            <div class="bg-red-400 rounded-xl w-3 h-3 m-1"> </div>
            <p class="text-center">Inactive</p>
        </div>
        <p class="text-center">5 minutes ago</p>
        <select id="status" class="bg-zinc-400 p-1 rounded-md text-center hover:cursor-pointer">
            <option value="" disabled selected hidden>Options</option>
            <option value="Update">Update</option>
            <option value="ResetPassword">Reset Password</option>
            <option value="Delete">Delete</option>
        </select>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

