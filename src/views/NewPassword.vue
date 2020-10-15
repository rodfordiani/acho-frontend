<template>
	<div id="new-password">
    <div class="content central">
      <label class="label titulo">Nova senha</label>
      <hr class="new5">
      <div class="control cartao">
        <form  @submit="onSubmit" class="central">
          <label class="label">Senha *</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password"
            placeholder="Ex.: Mínimo de 6 caracteres"
            v-model="form.password" required/>
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <label class="label">Confirme a senha *</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="password"
            placeholder="Ex.: Mínimo de 6 caracteres"
            required v-model="confirmedPassword"/>
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
          <button
          id="btn-salvar-nova-senha"
            type="submit"
            class="button is-success self-alignment"
            :class="{ 'is-loading': loading }"
            @click="save()" >
            Salvar
          </button>
        </form>
      </div>
    </div>
		
    <p class="help is-danger cartao"
      v-if="form.password && form.password.length < 6" >
      A senha deve possuir pelo menos 6 caracteres.
    </p>
    <p class="help is-danger cartao"
      v-if="confirmedPassword != form.password" >
      As senhas devem iguais.
    </p>       
	</div>
</template>

<script>
import { trimFields } from "@/jsonUtils";
export default{
	data() {
    return {
      confirmedPassword:null,
      form:{
        password:null,
        token:window.location.href.split("=")[1]
      }
    };
  },
  methods:{
    onSubmit(event){
      event.preventDefault();
      let body = {};
      body.body = trimFields(this.form);
			body = trimFields(this.form);
      console.log(body);

       this.axios
        .patch("https://achoserver.herokuapp.com/changePassword", body)
        .then(response => {
          if (response.status === 200) {
            alert("Senha alterada com sucesso");
          } else {
            alert("Ops!Algo deu errado. Por favor, tente novamente.");
          }
          console.log(response);
        })
        .catch();
    }
  }
}
//    SOMENTE AS PESSOAS QUE ACESSAM PELO LINK DO EMAIL PODEM TER ACESSO A ESSA ROTA
//     if(this.$store.state.user!="")
	
</script>