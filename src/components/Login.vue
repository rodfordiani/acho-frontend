<template>
  <div class="login">
    <form v-if="loginForm" class="login-form login-content" @submit="onSubmit">
      <input
        type="email"
        placeholder="E-mail"
        v-model="form.id"
        class="input"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        v-model="form.password"
        class="input"
        minlength="6"
        required
      />
      <button
        type="submit"
        class="button is-warning"
        :class="{ 'is-loading': loading }"
      >
        Entrar
      </button>
    </form>
    <div v-else class="access-buttons login-content">
      <button class="button is-warning is-outlined" @click="toggleLoginForm()">
        Acessar minha conta
      </button>
      <a class="btn-esqueci" href="/esqueci-senha">Esqueceu sua senha?</a>
    </div>
    <!-- <div  class="forgot-password">
      <a>Esqueceu sua senha?</a>
    </div> -->
  </div>
</template>

<script>
import { trimFields } from "@/jsonUtils";

export default {
  data() {
    return {
      loading: false,
      loginForm: false,
      form: {
        id: null,
        password: null
      }
    };
  },
  methods: {
    toggleLoginForm() {
      this.loginForm = !this.loginForm;
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
          console.log(error);
          this.loading = false;
        });
    },
    goToSearch() {
      this.$router.push("/busca");
    },
    goToObjectRegister(){
      this.$router.push("/cadastro-objeto");
    }
  },
  components: {},
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
  }
};
</script>
