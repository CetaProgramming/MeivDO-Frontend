<script>
export default {
    data () {
      return {
        show1: false,
        password: 'Password',
      }
    },
  }
</script>

<template>
<div class="login">
  <div id="container" class="desktop:grid grid-cols-2">
    <div class="image">
      <img src="../assets/christopher-burns-Wiu3w-99tNg-unsplash.jpg" alt="" style="height: 300px;width:100%;" class="desktop:rounded-tl-lg rounded-bl-lg">
      <div class="company">
        <span>Welcome</span>
        <p>to</p>
        <div class="logo">
          <span>Meiv</span>
          <span class="do">D<circle></circle></span>
        </div>
      </div>
    </div>
    <form id="form" class="desktop:rounded-tr-lg rounded-br-lg">
      <div class="mt-8 mb-5 text-center">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input type="email" id="email" class="border border-gray-500 text-neutral-900 text-sm w-80">
      </div>
      <div class="mb-5 text-center">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input type="password" id="password" class="border border-gray-500 text-neutral-900 text-sm w-80">
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
      </div>
      <div class="text-center">
        <button type="submit" class="btn bg-MeivRed py-2 px-4 rounded w-80 mb-6">Submit</button>
      </div>
      <div class="mt-6 mb-6 text-center">
        <a href="">Forgot Password?</a>
    </div>
    </form>
  </div>
</div>
</template>

 /*---------------------------------------------Css-------------------------------------------------------*/ 

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

/*-------------------------------------------Css for the Logo---------------------------------------------*/ 
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

/*---------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------Media query to adjust to desktop------------------------------*/
@media(min-width:801px){
  .login{
    background-image: url(../assets/isis-franca-hsPFuudRg5I-unsplash.jpg);
    background-size: cover;
    padding: 160px;
  }
  #form{
    background-color: white;
    border: 1px;
    height: 300px;
  }
}
</style>