<template>
  <div>
    <!--<form v-if="false" class="content" @submit="onSubmit">-->
    <!--<div class="control flex-column-around">-->
    <!--<div class="buttons location flex-column-around is-left">-->
    <!--<button-->
    <!--type="button"-->
    <!--class="button is-outlined flex-row-between"-->
    <!--@click="getByGeolocation()"-->
    <!--&gt;-->
    <!--<i class="fas fa-map-marker-alt"></i>-->
    <!--<span-->
    <!--&gt;Buscar ponto de devolução a partir da localização do-->
    <!--dispositivo</span-->
    <!--&gt;-->
    <!--</button>-->
    <!--<button-->
    <!--type="button"-->
    <!--class="button is-outlined flex-row-between is-left"-->
    <!--@click="getByAddress()"-->
    <!--&gt;-->
    <!--<i class="fas fa-map-marker-alt"></i>-->
    <!--<span>Buscar ponto de devolução a partir de um endereço</span>-->
    <!--</button>-->
    <!--</div>-->
    <!--<div v-if="address" class="field">-->
    <!--<label class="label">Endereço *</label>-->
    <!--<div class="control has-icons-left has-icons-right">-->
    <!--<input-->
    <!--class="input is-success"-->
    <!--type="text"-->
    <!--placeholder="Ex.: Av. Paulista, 1234 - Bela Vista, São Paulo - SP "-->
    <!--v-model="form.address"-->
    <!--/>-->
    <!--<span class="icon is-small is-left">-->
    <!--<i class="fas fa-road"></i>-->
    <!--</span>-->
    <!--<span v-if="form.address" class="icon is-small is-right">-->
    <!--<i class="fas fa-check"></i>-->
    <!--</span>-->
    <!--</div>-->
    <!--<button-->
    <!--type="button"-->
    <!--class="button buscar is-warning"-->
    <!--@click="buscar()"-->
    <!--&gt;-->
    <!--Buscar-->
    <!--</button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</form>-->
    <div id="registered-institutions" class="central">
      <div class="content cartao shadow">
        <label class="label titulo">Pontos de devolução de objetos encontrados</label>
        <div class="control">
          <hr class="new5"/>
          <div v-if="institutions && institutions.length > 0">
            <institution
              class="cartao shadow"
              v-for="institution of institutions"
              :key="institution._id"
              :institution="institution"
              :class="{ selected: selected && selected._id === institution._id }"

            >
            </institution>
          </div>
          <div v-else-if="notFound"><b>Ops!</b><br />Não existem pontos de devolução cadastrados ainda.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Institution from "@/components/Institution.vue";

export default {
  data() {
    return {
      loginForm: false,
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
      loading: false,
      institutions: [],
      selected: null,
      notFound: false
    };
  },
  name: "preSearch",
  components: {
    Institution
  },
  methods: {
    getByAddress() {
      this.address = true;
    },
    buscar() {
      let cadastro = confirm(
        "Ação restrista a usuários cadastrados. Gostaria de cadastrar-se?"
      );
      cadastro
        ? this.$router.push("/cadastro-requerente")
        : this.$router.push("/");
    },
    selectInstitution(institution) {
      this.selected = institution;
      this.sortInstitutions(institution);
      localStorage.selectedInstitution = JSON.stringify(institution);
    },
    sortInstitutions(institution) {
      let aux = this.institutions.filter(inst => inst._id !== institution._id);
      this.institutions = [];
      this.institutions.push(institution);
      this.institutions = this.institutions.concat(aux);
    }
  },
  mounted() {
    this.loading = true;
    this.axios
      .get("https://achoserver.herokuapp.com/institution")
      .then(response => {
        this.institutions = response.data;
        this.notFound = !this.institutions || this.institutions.length < 1
        if (this.selected) {
          this.sortInstitutions(this.selected);
        }
      });
  },
  beforeMount() {
    let selectedInstitutionStr = localStorage.selectedInstitution;
    if (selectedInstitutionStr && selectedInstitutionStr !== "") {
      let selectedInstitution = JSON.parse(selectedInstitutionStr);
      this.selected = selectedInstitution;
      this.sortInstitutions(this.selected);
    }
  }
};
</script>
