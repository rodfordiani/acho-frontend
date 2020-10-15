<template>
  <div class="central cartao shadow">
    <label class="label titulo">Minhas solicitações</label>
    <hr class="new5">
    <div
    v-if="solicitedObjects.length > 0"
    class="found-objects content central">
      <Object
              class="cartao shadow"
              v-for="object of solicitedObjects"
              :key="object._id"
              :object="object"
              :isObserverButton = "false"
              :isShowCancelButton = "true"
              :class="{ selected: selected && selected._id === object._id }"
      >
      </Object>
    </div>
    <div class="cartao" v-else-if="requestDone">
      <b>Ops!</b> <br/>
      Você ainda não solicitou a devolução de nenhum objeto.
    </div>
  </div>
</template>

<script>
  import Object from "../components/Object";

  export default {
    data() {
      return {
        loading: false,
        solicitedObjects: [],
        requestDone: false
      };
    },
    name: "solicitations",
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
                .get("https://achoserver.herokuapp.com/object?status=1", config)
                .then(response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    this.solicitedObjects = response.data;
                    this.requestDone = true
                  }
                })
                .catch(error => {
                  console.log(error);
                  this.loading = false;
                });
      }
    }
  };
</script>
