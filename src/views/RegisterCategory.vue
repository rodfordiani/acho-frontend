<template>
  <div id="register-object" class="central">
    <div class="content cartao shadow ">
      <label class="label titulo">Cadastrar uma nova categoria</label>
      <hr class="new5">
      <div class="control cartao">
        <form class="cadastrarObj central" @submit="onSubmit">
          <div class="description flex-column-around">
            <div class="field flex-row-between">
              <label class="label">Defina um nome para a categoria *</label>
              <input class="input" type="text" placeholder="Por ex.: Material escolar" v-model="form.name" required />
            </div>
          </div>
          <hr v-if="form.name" />
          <div v-if="form.name">
            <div class="description flex-column-around">
              <div class="field flex-row-between">
                <label class="label">Defina as subcategorias de objetos da categoria *</label>
                <div v-if="subcategorias">
                  <input v-for="(subcategoria) in subcategorias"
                         :key="subcategoria._id" class="input" placeholder="Por ex.: caderno" type="text" v-model="subcategoria.name" :required="subcategorias.filter(subcategoria => subcategoria.name).length == 0" />
                </div>
              </div>
            </div>
          </div>
          <button v-if="form.name"
                  @click="adicionarSubcategoria()"
                  type="button" id="adicionar-subcategoria" class="button is-warning self-alignment"><i class="fas fa-plus"></i>Adicionar subcategoria
          </button>
          <hr v-if="form.name  && subcategorias.filter(subcategoria => subcategoria.name).length > 0" />
          <div v-if="form.name && subcategorias.filter(subcategoria => subcategoria.name).length > 0">
            <div class="description flex-column-around">
              <div class="field flex-row-between">
                <label class="label">Defina os campos de descrição da categoria *</label>
                <div v-if="form.fields">
                  <input v-for="(field) in form.fields"
                         :key="field._id" class="input" placeholder="Por ex.: cor" type="text" v-model="field.name" required />
                </div>
              </div>
            </div>
          </div>
          <button v-if="form.name && subcategorias.filter(subcategoria => subcategoria.name).length > 0"
                  @click="adicionarCampo()"
                  type="button" id="adicionar-campo" class="button is-warning self-alignment"><i class="fas fa-plus"></i>Adicionar campo
          </button>
          <hr v-if="form.name && subcategorias.filter(subcategoria => subcategoria.name).length > 0 && form.fields.filter(field => field.name)" />
          <button  v-if="form.name && subcategorias.length > 0 && form.fields.length > 0" type="submit" id="cadastrar-obj" class="button main-btn self-alignment" v-bind:class="{'is-success': formIsOk}"><i v-if="formIsOk" class="fas fa-check"></i>Cadastrar categoria</button>
        </form>
        </div>
      </div>
    </div>
</template>

<script>
import { trimFields } from "@/jsonUtils";

export default {
  data() {
    return {
      form: {
        name: null,
        type: [],
        fields: [],
      },
      subcategorias: [],
      selectedCategory: null,
    };
  },
  methods: {
    goToSearch(){
        this.$router.push("/busca");
      },
    onSubmit(event) {
      event.preventDefault();
      let body = {};
      body.body = trimFields(this.form);
      body = trimFields(this.form);
      body.fields = body.fields.filter(field => field.name)
      let subcategorias = this.subcategorias.filter(subcategoria => subcategoria.name)
      subcategorias.forEach(subcategoria => {
        body.type.push(subcategoria.name)
      })
      if(body.type.length == 0) {
        alert("É necessário inserir ao menos um subcategoria de objeto na categoria.")
        return
      }
      if(body.fields.length == 0) {
        alert("É necessário inserir ao menos um campo para descrição do objeto.")
        return
      }
      console.log(body);
      let config = {
        headers: {
          'Authorization': "Bearer " + this.$store.state.token
        }
      };
      this.axios
        .post("https://achoserver.herokuapp.com/category", body, config)
        .then(response => {
          if (response.status === 200) {
            alert(
                    "Categoria cadastrada com sucesso"
            );
            this.$router.push("/cadastro-objeto");
          } else {
            alert(
                    "Erro ao tentar realizar cadastro da categoria. Por favor, tente novamente."
            );
          }
          console.log(response);
          this.loading = false;
          // this.selectAddress(response.data.addressId, () => {
          //   this.$router.push("/endereco");
          // });
          // this.isLoading = false;
        })
        .catch()
    },
    adicionarSubcategoria() {
      this.subcategorias.push({name: ''})
    },
    adicionarCampo() {
      this.form.fields.push({
        name: '',
        options: []
      })
    }
  },
  beforeMount(){
    if(this.$store.state.user.profile==="applicant")
    {
      this.goToSearch();
    }
  },
  computed: {
    formIsOk: function () {
      let validTypes = this.subcategorias.filter(type => type.name && type.name !== '')
      let validFields = this.form.fields.filter(field => field.name && field.name !== '')
      return this.form.name && validFields.length > 0 && validTypes.length > 0
    }
  }
};
</script>
