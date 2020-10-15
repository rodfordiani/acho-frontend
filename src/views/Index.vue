<template>
  <div id="index">
    <div class="content cartao shadow">
      <!-- <Logo></Logo> -->
      <div id="login" class="control cartao">
        <form @submit="onSubmit">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input v-model="form.id" class="input" type="email" placeholder="E-mail" autofocus required>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span v-if="form.id" class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="form.password" class="input" type="password" placeholder="Password" minlength="6" required>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control btn-login">
              <button id="btn-login" type="submit" class="button is-warning self-alignment" :class="{ 'is-loading': loading }">
                Entrar
              </button>
            </p>
            <p class="control btn-login">
              <button id="btn-login" type="button" @click="cadastrar()" class="button is-info self-alignment" :class="{ 'is-loading': loading }">
                Cadastrar-se
              </button>
            </p>
          </div>
          <div class="secondary-actions central">
            <a
              type="button"
              class="button is-text"
              @click="goToForgotMyPassword()"
              >Esqueci minha senha
            </a>
          </div>
        </form>
      </div>
      <div class="control cartao group2">
          <div class="field">
            <p class="control">
              <button id="btn-perdi" type="submit" 
              class="button secondary-btn" 
              @click='abrirBusca()'>
                Perdi
              </button>
            </p>
            <p class="control">
              <button id="btn-encontrei"
              @click="buscarInstituicoes()"
               type="submit" class="button secondary-btn">
                Encontrei
              </button>
            </p>
          </div>
          <div class="secondary-actions flex-row-around">
            <a
              type="button"
              class="button is-text"
              @click="cadastrarInstituicao()"
              >Quero utilizar o app em minha instituição
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Logo.vue";
import { trimFields } from "@/jsonUtils";
export default {
  data() {
    return {
      loading:false,
      form:{
        id:null,
        password: null
      }
    };
  }, methods:{
    goToForgotMyPassword(){
      this.$router.push("/esqueci-senha")
    },
    onSubmit(event) {
      event.preventDefault();
      let body = {};
      body.body = trimFields(this.form);
      body = trimFields(this.form);
      console.log(body);
      this.loading = true;

      this.axios
        .post("https://achoserver.herokuapp.com/login", body)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.$store.commit("updateUser", response.data.user);
            this.$store.commit("updateToken", response.data.token); //TODO: Pegar dados corretos
            localStorage.achoUserData = JSON.stringify(response.data);
            this.loading = false;
            switch (response.data.user.profile) {
              case 'institution':
                this.goToObjectRegister();
                break;
              case 'applicant':
                this.goToSearch();
            }
          } else {
            alert("E-mail ou senha incorretos.")
          }
        })
        .catch(error => {
          if(error && error.response && error.response.status === 401) {
            alert("E-mail ou senha incorretos.")
          } else {
            alert("Erro na requisição. Por favor, tenve novamente!")
            console.log(error);
          }
          this.loading = false;
        })
    },
     goToSearch() {
      this.$router.push("/busca");
    },
    goToObjectRegister(){
      this.$router.push("/cadastro-objeto");
    },
    goToIndex() {
      this.$router.push("/");
    },
    cadastrarInstituicao() {
      this.$router.push("/cadastro-instituicao");
    },
    abrirBusca() {
      this.$router.push("/busca");
    },
    buscarInstituicoes () {
      this.$router.push("/devolucao");
    },
    cadastrar () {
      this.$router.push("/cadastro-requerente");
    }
  },
  components: {
    Logo    
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
        switch (user.profile) {
          case 'institution':
            this.goToObjectRegister();
            break;
          case 'applicant':
            this.goToSearch();
            break;
          default:
            this.goToIndex();
        }
      }
    }
  }
};
</script>
