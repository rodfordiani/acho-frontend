<template>
  <div class="pre-search">
    <form class="content" @submit="onSubmit">
      <div class="control flex-column-around">
        <div class="field">
          <label class="label">Busca *</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Ex.: molho de chaves"
              v-model="form.query"
              required
            >
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
            <span v-if="form.query" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="buttons location flex-column-around is-left central">
          <button
            type="button"
            class="button is-outlined flex-row-between"
            @click="getByGeolocation()"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>Definir área de busca a partir da localização do dispositivo</span>
          </button>
          <button
            type="button"
            class="button is-outlined is-primary flex-row-between is-left"
            @click="getByAddress()"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>Definir área de busca a partir de um endereço</span>
          </button>
        </div>
        <div v-if="address" class="field">
          <label class="label">Endereço *</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-success"
              type="text"
              placeholder="Ex.: Av. Paulista, 1234 - Bela Vista, São Paulo - SP "
              v-model="form.address"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-road"></i>
            </span>
            <span v-if="form.address" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <button type="button" class="button buscar is-success" @click="buscar()">Buscar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { trimFields } from "@/jsonUtils";

export default {
  data() {
    return {
      address: false,
      form: {
        query: null,
        position: {
          latitude: null,
          longitude: null
        },
        radius: null,
        address: null
      },
      loading: false
    };
  },
  name: "preSearch",
  components: {
  },
  methods: {
    getByAddress() {
      this.address = true;
    },
    backToIndex() {
      this.$router.push("/");
    },
    onSubmit(event) {
      event.preventDefault();
      let body = {};
      body.body = trimFields(this.form);
      body = JSON.stringify(body);
      console.log(body);
      this.loading = true;
      this.axios({
        url: "https://achoserver.herokuapp.com/applicant",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        data: body
      })
        .then(response => {
          console.log(response.data);
          // this.selectAddress(response.data.addressId, () => {
          //   this.$router.push("/endereco");
          // });
          // this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
    buscar() {
      let cadastro = confirm(
        "Ação restrista a usuários cadastrados. Gostaria de cadastrar-se?"
      );
      cadastro
        ? this.$router.push("/cadastro-requerente")
        : this.$router.push("/");
    }
  }
};
</script>
