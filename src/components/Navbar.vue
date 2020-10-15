<template>
  <nav class="navbar">
    <div class="navbar-brand flex-row-between">      
      <div class="flex-column-around voltar navbar-burger" @click="$router.back()">
        <i class="fas fa-2x fa-arrow-alt-circle-left"></i>
      </div>
      <a class="navbar-item" href="#" id="logo-vsmall">
        <img src="@/assets/images/logo.png" />
      </a>
      
      <div
        class="navbar-burger icon"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <div
      class="navbar-menu"
      @click="showNav = !showNav"
      :class="{ 'is-active': showNav }">
      <div v-if="$store.state.user.profile === 'applicant'">
        <p class="menu-label">Olá</p>
        <div class="navbar-item email">{{ $store.state.user.name }}</div>
        <p class="menu-label">Perdi Algo</p>
        <ul class="menu-list">
          <strong><router-link class="navbar-item" to="/busca"
          >Buscar objeto perdido</router-link></strong>
          <router-link class="navbar-item" to="/solicitacoes"
          >Minhas solicitações</router-link>
          <router-link class="navbar-item" to="/objetos-interessantes"
            >Objetos de interesse</router-link>
          <router-link class="navbar-item" to="/alertas"
          >Objetos rastreados</router-link>
          <router-link class="navbar-item" to="/cupons"
            >Cupons e descontos</router-link>
        </ul>
        <p class="menu-label">
          Encontrei Algo
        </p>
        <ul class="menu-list">
            <router-link class="navbar-item" to="/devolucao"
            >Pontos de devolução</router-link>
        </ul>
        <p class="menu-label">
            Minhas Informações
        </p>
        <ul class="menu-list">
          <router-link class="navbar-item" to="/objetos-recuperados"
            >Objetos recuperados</router-link>
          
          <router-link class="navbar-item" to="/editar-requerente"
            >Editar perfil</router-link>
        </ul>
        <p class="menu-label">
          Até Logo
        </p>
        <ul class="menu-list">
          <div class="navbar-item" @click="logout()">Sair</div>
        </ul>
      </div>
      <div
        v-else-if="$store.state.user.profile === 'institution'"
      >
      <p class="menu-label">
        Olá
      </p>
      <ul class="menu-list">
        <div class="navbar-item email">{{ $store.state.user.companyName }}</div>
      </ul>
      <p class="menu-label">
        Objetos
      </p>
      <ul class="menu-list">
        <router-link class="navbar-item" to="/cadastro-objeto"
          >Cadastrar objeto</router-link
        >
        <router-link class="navbar-item" to="/devolucao-final"
          >Devolver objeto</router-link
        >
        <router-link class="navbar-item" to="/objetos-achados"
          >Objetos achados</router-link
        >
        <router-link class="navbar-item" to="/objetos-solicitados"
        >Objetos solicitados</router-link
        >
        <router-link class="navbar-item" to="/objetos-devolvidos"
          >Objetos devolvidos</router-link
        >
      </ul>
      <p v-if="$store.state.user.isAdmin" class="menu-label">
        Categorias
      </p>
      <ul v-if="$store.state.user.isAdmin" class="menu-list">
        <router-link class="navbar-item" to="/cadastro-categoria"
        >Cadastrar categoria</router-link
        >
        <router-link class="navbar-item" to="/editar-categoria"
        >Editar categoria</router-link
        >
      </ul>
      <p class="menu-label">
        Informações da Instituição
      </p>
      <ul class="menu-list">
        <router-link class="navbar-item" to="/editar-instituicao"
          >Editar perfil</router-link
        >
      </ul>
      <p class="menu-label">
        Pontos de Devoluções
      </p>
      <ul class="menu-list">
        <router-link class="navbar-item" to="/devolucao"
          >Pontos de devolução</router-link
        >
      </ul>
      <p class="menu-label">
        Até Logo
      </p>
      <ul class="menu-list">
        <div class="navbar-item " @click="logout()">Sair</div>
      </ul>
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
