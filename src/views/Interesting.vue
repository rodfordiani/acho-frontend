<template>
	<div id="interesting">
		<div class="content central cartao">
      		<label class="label titulo">Objetos que também acho que são meus</label>
			<hr class="new5">
			<div
				v-if="interestingObjects && interestingObjects.length > 0"
				class="found-objects content central">
				<Object
						class="cartao shadow"
						v-for="object of interestingObjects"
						:key="object._id"
						:object="object"
            :isObserverButton="false"
            :isShowCancelButton="true"
            >
				</Object>
			</div>
			<div class="cartao" v-else-if="notFound">
				<b>Ops!</b> <br/>
				Você não demonstrou interesse por nenhum objeto solicitado por outra pessoa.
			</div>
		</div>
	</div>
</template>

<script>
  import Object from "../components/Object";

  export default {
    data() {
      return {
        interestingObjects: [],
		  notFound: false
      };
    },
    name: "insteresting",
    components: {
      Object
    },
    beforeMount() {
      this.updateData();
      if(this.$store.state.user.profile==="institution")
      {
        this.$router.push("/cadastro-objeto");
      }
    },
    methods: {
      updateData() {
        let config = {
          headers: {
            'Authorization': "Bearer " + this.$store.state.token
          }
        };
        this.axios
                .get("https://achoserver.herokuapp.com/object/interested?status=1", config)
                .then(response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    this.interestingObjects = response.data;
                    this.notFound = !this.interestingObjects || this.interestingObjects.length === 0
                  }
                })
                .catch(error => {
                  console.log(error);
				  this.loading = false;
				  alert(error.message)
                });
      }
    }
  };
</script>
