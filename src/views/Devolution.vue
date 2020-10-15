<template>
  <div id="obj-devolutions" class="central">
    <div class="content cartao shadow">
      <label class="label titulo">Devolver objeto</label>
      <hr class="new5" />
      <div class="control cartao">
        <label>Entre com o código de devolução:</label>
        <div class="control central">
          <input type="text" class="input" v-model="devolutionCode" />
          <button
            id="btn-devolver"
            type="button"
            class="button is-success self-alignment"
            @click="returnObject()"
          >
            Buscar objeto
          </button>
        </div>
      </div>
      <div
              v-if="returnedObjects.length > 0"
              class="found-objects content central">
        <label class="label titulo">Resultado da busca</label>
        <hr class="new5">
        <Object
                v-for="object of returnedObjects"
                :key="object._id"
                :object="object"
                :isReturn = "true"
        >
        </Object>
      </div>
      <div class="cartao" v-if="returnedObjects.length === 0 &&  searchDone"><b>Ops!</b> <br/>Sua busca não retornou nenhum objeto. O código de devolução está correto?
      </div>
    </div>
  </div>
</template>

<script>
  import Object from "../components/Object";

  export default {
    data() {
      return {
        devolutionCode: null,
        searchDone: false,
        returnedObjects: []
      };
    },
    methods: {
      returnObject() {
        let config = {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        };
        this.axios
          .get("https://achoserver.herokuapp.com/object/?devolutionCode=" + this.devolutionCode, config)
          .then(response => {
            if (response.status === 200) {
              this.returnedObjects = response.data
              console.log(this.returnedObjects)
              this.searchDone = true
            } else {
              alert(
                "Erro ao tentar devolver objeto. Por favor, tente novamente."
              );
            }
            console.log(response);
            this.loading = false;
            // this.selectAddress(response.data.addressId, () => {
            //   this.$router.push("/endereco");
            // });
            // this.isLoading = false;
          })
          .catch(error => {
            console.log(error);
            alert("Erro ao tentar devolver objeto. Por favor, tente novamente.");
          });
      },
      goToSearch(){
        this.$router.push("/busca");
      }
    },
    beforeMount(){
      if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
    },
    components: {
      Object
    }
  };
</script>
