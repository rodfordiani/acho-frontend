<template>
  <div id="register-institution" class="central">
    <div class="content cartao shadow">
      <label v-if="!this.$store.state.user" class="label titulo"
            >Cadastrar instituição</label>
      <label v-else class=" label titulo">Editar dados da conta</label>
      <hr class="new5">
      <div class="control cartao">
        <form class="content" @submit="onSubmit">
          <div class="control">
            <div class="field">
              <label class="label">Nome da instituição *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Ex.: Pontifícia Universidade Católica de Campinas"
                  v-model="form.companyName"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-university"></i>
                </span>
                <span v-if="form.companyName" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Nome fantasia *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Ex.: PUC-Campinas"
                  v-model="form.fantasyName"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-ad"></i>
                </span>
                <span v-if="form.fantasyName" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <label class="label">Representante da instituição *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Ex.: João da Silva"
                  v-model="form.accountable"
                  required pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span v-if="form.accountable" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Telefone *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="texr"
                  placeholder="Ex.: (19) 98765-4321"
                  v-mask="'(##) #####-####'"
                  v-model="form.phone"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
                <span
                  v-if="
                    form.phone != null &&
                      form.phone.length >= 14 &&
                      form.phone.length <= 15
                  "
                  class="icon is-small is-right"
                >
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <label class="label">CNPJ *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Ex.: 12.345.678/0001-90"
                  v-mask="'##.###.###/####-##'"
                  v-model="form.cnpj"
                  required pattern="^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$"
                  @change="validarCNPJ"
                />
                <p  class="help is-danger" v-if="!validCNPJ">CNPJ inválido</p>
                <span class="icon is-small is-left">
                  <i class="fas fa-id-card"></i>
                </span>
                <span
                  v-if="form.cnpj != null && form.cnpj.length === 18"
                  class="icon is-small is-right"
                >
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <label class="label">E-mail *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Ex.: puc-campinas@puccampinas.edu.br"
                  v-model="form.email"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span v-if="form.email" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <label class="label">Senha *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="password"
                  placeholder="Ex.: Mínimo de 6 caracteres"
                  v-model="form.password"
                  required minlength="6"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
                <span
                  v-if="form.password != null && form.password.length >= 6"
                  class="icon is-small is-right"
                >
                  <i class="fas fa-check"></i>
                </span>
              </div>
              <p
                v-if="form.password && form.password.length < 6"
                class="help is-danger"
              >
                A senha deve possuir pelo menos 6 caracteres.
              </p>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <label class="label">Confirmação de senha *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="password"
                  placeholder="Ex.: Mínimo de 6 caracteres"
                  v-model="form.passwordConfirmation"
                  required minlength="6"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
                <span
                  v-if="
                    form.password && form.password === form.passwordConfirmation
                  "
                  class="icon is-small is-right"
                >
                  <i class="fas fa-check"></i>
                </span>
              </div>
              <p
                v-if="form.password && form.password !== form.passwordConfirmation"
                class="help is-danger"
              >
                As senhas não conferem
              </p>
            </div>
            <div class="field">
              <label class="label">Endereço *</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-succes"
                  type="text"
                  placeholder="Ex.: Rod. D. Pedro I"
                  v-model="form.address.street"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-road"></i>
                </span>
                <span v-if="form.address.street" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div class="flex-row-between numbers">
              <div class="field">
                <label class="label">Número *</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Ex.: 427"
                    v-model="form.address.number"
                    required pattern="^[0-9]{1,}$"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-map-pin"></i>
                  </span>
                  <span v-if="form.address.number" class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Complemento</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Ex.: Ap. 402"
                    v-model="form.address.complement"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-door-open"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex-row-between bairro-cep">
              <div class="field">
                <label class="label">Bairro *</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Ex.: Jardim Alvorada"
                    v-model="form.address.neighborhood"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-map-marked-alt"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">CEP *</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    v-mask="'#####-###'"
                    placeholder="Ex.: 12345-678"
                    v-model="form.address.zipCode" pattern="^[0-9]{2}[0-9]{3}-[0-9]{3}$"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-directions"></i>
                  </span>
                  <span
                    v-if="form.address.zipCode && form.address.zipCode.length === 9"
                    class="icon is-small is-right"
                  >
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex-row-between city-state">
              <div class="field">
                <label class="label">Cidade *</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Ex.: Campinas"
                    v-model="form.address.city"
                    required pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span v-if="form.address.city" class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Estado *</label>
                <div class="control">
                  <div class="select">
                    <select v-model="form.address.state" required>
                      <option v-for="state of states" :key="state">{{
                        state
                      }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!this.$store.state.user" class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="termsAcceptance" required />
                  Eu estou de acordo com os
                  <a href="#">termos e condições</a>.
                </label>
              </div>
            </div>
            <div class="field buttons central">
              <div class="control central">
                <button
                  v-if="!this.$store.state.user"
                  type="submit"
                  class="button is-success self-alignment"
                  :class="{ 'is-loading': loading }"
                >
                  Cadastrar
                </button>
                <button
                  v-else-if="this.$store.state.user"
                  type="submit"
                  class="button is-success self-alignment"
                  :class="{ 'is-loading': loading }"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { trimFields } from "@/jsonUtils";

export default {
  data() {
    return {
      loginForm: false,
      termsAcceptance: false,
      form: {
        email: null,
        password: null,
        passwordConfirmation: null,
        phone: null,
        cnpj: null,
        companyName: null,
        fantasyName: null,
        accountable: null,
        address: {
          street: null,
          number: null,
          neighborhood: null,
          city: null,
          state: null,
          country: null,
          zipCode: null
        }
      },
      loading: false,
      validCNPJ: false,
      states: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO"
      ]
    };
  },
  name: "register",
  components: {},
  methods: {
    backToIndex() {
      this.$router.push("/");
    },
    onSubmit(event) {
      event.preventDefault();
      let body = {};
      this.form.cnpj = this.form.cnpj.replace(/\D/g, "");
      this.form.phone = this.form.phone.replace(/\D/g, "");
      this.form.address.zipCode = this.form.address.zipCode.replace(/\D/g, "");
      body.body = trimFields(this.form);
      body = trimFields(this.form);
      delete body.address["country"];
      delete body.address["complement"];
      delete body["passwordConfirmation"];
      delete body["accountable"];
      if (this.$store.state.user) {
        delete body.createdAt
        delete body._id
        delete body.isAdmin
        delete body.profile
        delete body.cnpj
        delete body.__v
      }

      body = JSON.stringify(body);
      this.loading = true;
      let url = "https://achoserver.herokuapp.com/institution";
      this.axios({
        url: url,
        method: this.$store.state.user ? "patch" : "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          Authorization: "Bearer " + this.$store.state.token
        },
        data: body
      })
        .then(response => {
          if (response.status === 200) {
            alert(
              !this.$store.state.user
                ? "Cadastro realizado com sucesso."
                : "As alterações foram salvas com sucesso."
            );
            if (!this.$store.state.user) {
              this.$store.commit("updateUser", response.data.user);
              this.$store.commit("updateToken", response.data.token);
              localStorage.achoUserData = JSON.stringify(response.data);
              this.goToObjectRegister();
            } else {
              let achoUserDataStr = localStorage.achoUserData;
              let achoUserData = JSON.parse(achoUserDataStr);
              achoUserData.user = { ...achoUserData.user, ...response.data };
              this.$store.commit("updateUser", achoUserData.user);
              localStorage.achoUserData = JSON.stringify(achoUserData);
              location.reload()
            }
            this.loading = false;
          } else {
            alert(
              !this.$store.state.user
                ? "Erro ao tentar realizar cadastro."
                : "Erro ao tentar salvar alterções." +
                    "Por favor, tente novamente."
            );
          }
          this.loading = false;
        })
        .catch(error => {
          alert(
            !this.$store.state.user
              ? "Erro ao tentar realizar cadastro."
              : "Erro ao tentar salvar alterções." +
                  "Por favor, tente novamente."
          );
          console.log(error);
          this.loading = false;
        });
    },
    validarCNPJ() {
      let cnpj = this.form.cnpj.replace(/\D/g, "");
        cnpj = cnpj.replace(/[^\d]+/g,'');
    
        if(cnpj == ''){
          console.log("CNPJ inválido")
            this.validCNPJ = false
            this.form.cnpj = ''
        }
        
        if (cnpj.length != 14){
            console.log("CNPJ inválido")
            this.validCNPJ = false
            this.form.cnpj = ''
        }
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999"){
              console.log("CNPJ inválido")
              this.validCNPJ = false
            this.form.cnpj = ''
            }
            
        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)){
          console.log("CNPJ inválido")
          this.validCNPJ = false
            this.form.cnpj = ''
        }
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)){
          console.log("CNPJ inválido")
          this.validCNPJ = false
            this.form.cnpj = ''
        }
              
        else{
          this.validCNPJ = true;
          console.log("CNPJ válido")
        }
        
    },
    goToObjectRegister() {
      this.$router.push("/cadastro-objeto");
    },
    goToSearch(){
        this.$router.push("/busca");
      }
  },
  beforeMount() {
    if (this.$store.state.user) {
      if (this.$router.currentRoute !== "/editar-instituicao") {
        this.$router.push("/editar-instituicao");
      }
      this.form = this.$store.state.user;
    }
    if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
  }
};
</script>
