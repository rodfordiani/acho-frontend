<template>
	<div id="require-password" class="central">
		<div class="content cartao shadow">
			<label class="label titulo">Solicitar troca de senha</label>
			<hr class="new5">
			<div class="control cartao" >				
				<form @submit="onSubmit" class="central">
					<label class="label">Digite seu e-mail</label>
					<div class="control has-icons-left has-icons-right">
						<input
						type="text"
						class="input" 
						v-model="form.id"
						required
						/>

						<span class="icon is-small is-left">
						<i class="fas fa-address-card"></i>
						</span>
						<span v-if="form.id" class="icon is-small is-right">
						<i class="fas fa-check"></i>
						</span>
					</div>
					<button
					id="btn-solicitar-troca-senha"
						type="submit"
						class="button is-success self-alignment"
						:class="{ 'is-loading': loading }"
						>
					Solicitar
					</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import { trimFields } from "@/jsonUtils";
import { error } from 'util';
export default{
	data() {
    return {
		loading: false,
		 form: {
			 id: null,
			 url: "https://acho-app-694a3.firebaseapp.com/nova-senha"
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
			this.loading = true;
			
			this.axios.post("https://achoserver.herokuapp.com/passwordRecovery",body)//tem que enviar a URL tbm
			.then(response =>{
				if(response.status == 200){
					alert("Enviamos um link para definição de uma nova senha para seu e-mail.");
					this.loading = false;
					console.log(response);
				}
			})
			.catch(error=>{
				console.log(error.message);
				this.loading = false;
			});
		}
  }
}
	
</script>

