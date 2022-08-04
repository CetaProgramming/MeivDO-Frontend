<template>
  <div class="desktop:grid grid-cols-2 container">
    <div class="image">
      <img src="../assets/christopher-burns-Wiu3w-99tNg-unsplash.jpg" alt="" style="height: 300px;width:100%;" class="desktop:rounded-lg">
      <div class="company">
        <span>Welcome</span>
        <p>to</p>
        <div class="logo">
          <span>Meiv</span>
          <span class="do">D<circle></circle></span>
        </div>
      </div>
    </div>
    <form>
      <div class="mt-8 mb-5 text-center">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input type="email" id="email" class="border border-gray-500 text-neutral-900 text-sm w-80">
      </div>
      <div class="mb-5 text-center">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input type="password" id="password" class="border border-gray-500 text-neutral-900 text-sm w-80">
      </div>
      <div class="text-center">
        <button type="submit" class="btn bg-MeivRed py-2 px-4 rounded w-80 mb-6">Submit</button>
      </div>
      <div class="mt-6 mb-6 text-center">
        <a href="">Forgot Password?</a>
    </div>
    </form>
  </div>
</template>

<style>
.image{
  position: relative;
  text-align: center;
}

.company{
  color: var(--MeivRed);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}

.btn {
  color: white;
}

.logo {
  text-transform: uppercase;
  display: flex;
  gap: 2px;
  font-size: 30px;
}

.logo .do {
  padding: 0px 1px 0 5px;
  background: black;
  color: #fff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.logo .do circle {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #fff;
}
</style>