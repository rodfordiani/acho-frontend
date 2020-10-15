<template>
  <div id="returned-objects" class="central">
    <div class="content cartao shadow">
      <label class="label titulo">Objetos recuperados</label>
      <hr class="new5" />
      <div
        v-if="recoveries.length > 0"
        class="content found-objects central">
        <Object
        class="cartao shadow"
          v-for="object of recoveries"
          :key="object._id"
          :object="object"
        >
        </Object>
      </div>
      <div class="control cartao" v-else-if="requestDone"><b>Ops!</b><br />Você não recuperou nenhum objeto o até o momento.</div>
    </div>
  </div>
</template>

<script>
  import Object from "../components/Object";

  export default {
    data() {
      return {
        loading: false,
        recoveries: [],
        requestDone: false
      };
    },
    name: "recoveredObjects",
    beforeMount() {
      this.updateData();
      if(this.$store.state.user.profile==="institution")
      {
        this.$router.push("/cadastro-objeto");
      }
    },
    methods: {
      backToIndex() {
        this.$router.push("/");
      },
      updateData() {
        let config = {
          headers: {
            'Authorization': "Bearer " + this.$store.state.token
          }
        };
        this.axios
                .get("https://achoserver.herokuapp.com/object?status=2", config)
                .then(response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    this.recoveries = response.data;
                    this.requestDone = true
                  }
                })
                .catch(error => {
                  console.log(error);
                  this.loading = false;
                });
      }
    },
    components: {
      Object
    }
  };
</script>
