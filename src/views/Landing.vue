<template>
	<div id="landing">
		<div class="access">
			<a @click="goToIndex()" class="button is-warning is-large is-fullwidth">Acessar</a>			
		</div>
		<div class="main">
			<div class="users">
				<div class="applicant cartao shadow">
					<h3 class="landing-Title">Perdeu algo?</h3>
					<p>Aumente suas chances de encontrar oque perdeu.</p>
					<p>Procure em vários lugares ao mesmo tempo.</p>
				</div>
				<div class="institution cartao shadow">
					<h3 class="landing-Title">Sua empresa é engajada socialmente?</h3>
					<p>Tenha um papel de relevância.</p>
					<p>Se torne um ponto de devolução.</p>
				</div>
			</div>
			<div class="about cartao shadow">
				<h3 class="landing-Title">Sobre nós</h3>
				<p> O time foi formado durante a faculdade. O projeto surgiu de
					 uma ideia de um dos membros do time.</p>
					 <p> A ideia era solucionar
					 um problema muito recorrente, não só dentro da universidade,
					 mas em muitos lugares.</p>
			</div>
		</div>
	</div>
</template>
<script>
import Logo from "@/components/Logo.vue";
export default {
	components:{
		Logo
	},
	methods:{
    goToIndex(){
      this.$router.push("/");
	}
	}
}
</script>