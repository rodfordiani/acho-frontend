<template>
	<div id="couponAndPartnership" class="central">
		<div class="content central cartao shadow">
			<label class="label titulo">Cupons de descontos</label>
			<div id="results"
				v-if="coupons && coupons.length > 0"
				class="found-objects content central cartao-back">
				<Coupon
						v-for="coupon of coupons"
						:coupon = "coupon"
						:key="coupon._id"
						class="cartao shadow">
				</Coupon>				
       	 	</div>
			<div v-else>Não existem cupons cadastrados.</div>
		</div>
	</div>
</template>
<script>
	import Coupon from "@/components/Coupon.vue";
	export default {
		data(){
			return{
				coupons: []
			};
		},
		components:{
			Coupon
		},
		mounted(){
			console.log("passou no mounted");
			this.axios
				.get("https://achoserver.herokuapp.com/coupon")
				.then(response => {
					if (response.status === 200) {
						this.$store.commit("updateCoupons", response.data);
						console.log(response.data);
						this.coupons = response.data;
					}
				})
				.catch(error => {
					console.log(error);
					console.log('errado')
				});
		},
		beforeMount() {
			if(this.$store.state.user.profile==="institution")
			{
				this.$router.push("/cadastro-objeto");
			}
		}
	}
</script>