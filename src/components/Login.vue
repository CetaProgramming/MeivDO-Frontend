<template>
  
<form>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
    <input type="email" id="email" class="border border-gray-500 text-neutral-900 text-sm rounded-lg w-60">
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
    <input type="password" id="password" class="border border-gray-500 text-neutral-900 text-sm rounded-lg w-60">
  </div>
  <button type="submit" class="btn btn-red">Submit</button>
</form>

</template>

<style>
.btn {
    @apply font-bold py-2 px-4 rounded;
  }
.btn-red {
    background-color: var(red);
  }
</style>