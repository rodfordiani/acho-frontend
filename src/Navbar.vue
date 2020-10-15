<template>
  <nav class="navbar">
    <div class="navbar-brand flex-row-between">
      <div class="flex-column-around voltar" @click="$router.back()">
        <i class="fas fa-2x fa-arrow-alt-circle-left"></i>
      </div>
      <a class="navbar-item" href="/">
        <img src="@/assets/images/logo_dark.png" />
      </a>
      <!--
    Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
      -->
      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!--
    Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
    <div
      class="navbar-menu"
      @click="showNav = !showNav"
      :class="{ 'is-active': showNav }"
    >
      <div v-if="$store.state.user.profile === 'applicant'" class="navbar-end">
        <router-link class="navbar-item" to="/busca"
          >Buscar objeto perdido</router-link
        >
        <router-link class="navbar-item" to="/solicitacoes"
          >Solicitações de devolução</router-link
        >
<!--        <router-link class="navbar-item" to="/resultados-busca-salvos"-->
<!--          >Objetos salvos</router-link-->
<!--        >-->
        <router-link class="navbar-item" to="/objetos-recuperados"
          >Objetos recuperados</router-link
        >
        <router-link class="navbar-item" to="/alertas"
        >Objetos rastreados</router-link
        >
        <router-link class="navbar-item" to="/devolucao"
          >Pontos de devolução</router-link
        >
        <router-link class="navbar-item" to="/editar-requerente"
          >Editar dados pessoais</router-link
        >
        <div class="navbar-item" @click="logout()">Sair</div>
      </div>
      <div
        v-else-if="$store.state.user.profile === 'institution'"
        class="navbar-end"
      >
        <router-link class="navbar-item" to="/cadastro-objeto"
          >Cadastrar objeto</router-link
        >
        <router-link class="navbar-item" to="/devolucao-final"
          >Devolver objeto</router-link
        >
        <router-link class="navbar-item" to="/objetos-achados"
          >Objetos achados</router-link
        >
        <router-link class="navbar-item" to="/objetos-devolvidos"
          >Objetos devolvidos</router-link
        >
        <router-link class="navbar-item" to="/devolucao"
          >Pontos de devolução</router-link
        >
        <router-link class="navbar-item" to="/editar-instituicao"
          >Editar dados da instituição</router-link
        >
        <div class="navbar-item" @click="logout()">Sair</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("updateUser", null);
      this.$store.commit("updateToken", null);
      this.$router.push("/");
    }
  },
  components: {}
};
</script>
