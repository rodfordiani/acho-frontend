<template>
  <div id="app" class="centerApp">
    <!-- <Navbar v-if=""></Navbar>
    <router-link to="/">Index</router-link>|
    <router-link to="/about">About</router-link>-->
    <!-- <Login v-if="!$store.state.user"></Login> -->
    <Navbar v-if="$store.state.user"></Navbar>
    <div id="page" :class="{logado: $store.state.user}">
      <Logo id="logo"></Logo>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

import Logo from "@/components/Logo.vue";

export default {
  data(){
    return{
      landing : 'window.location.href.split("/")[3]=="landing"'
    }
  },
  name: "app",
  components: {
    Navbar,Logo
  },
  methods:{
    goToIndex(){
      this.$router.push("/");
    }
  },
   beforeMount() {
    let userDataStr = localStorage.achoUserData;
    if (userDataStr && userDataStr !== "") {
      let userData = JSON.parse(userDataStr);
      let user = userData.user;
      let token = userData.token;
      if (user !== {} && token !== {}) {
        this.$store.commit("updateUser", user);
        this.$store.commit("updateToken", token);
      }
    }
    else{
      //se a rota for   return a pessoa pode acessar
      if(window.location.href.split("/")[3]=="devolucao"){
        console.log("Bem vind@")
      }
       if(window.location.href.split("/")[3]=="landing"){
        console.log("Bem vind@")
      }
      else if(window.location.href.split("/")[3]=="esqueci-senha"){
        console.log("Bem vind@",window.location.href.split("/"))
      }
      else if(window.location.href.split("/")[3]=="cadastro-instituicao"){
        console.log("Bem vind@")
      }
      else if(window.location.href.split("/")[3]=="cadastro-requerente"){
        console.log("Bem vind@")
      }
      else if((window.location.href.split("/")[3]).split("?")[0]=="nova-senha"){
        console.log("Bem vind@")
      }
      else{
      this.goToIndex();
      }
    }
  }
};
</script>
