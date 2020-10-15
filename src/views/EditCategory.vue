<template>
  <div id="search" class="view central">
    <div class="content cartao shadow">
      <label class="label titulo">Editar categoria</label>
      <hr class="new5">
      <div class="control busca cartao">
        <div class="busca central">
          <div class="field">
            <label class="label">Qual categoria deseja editar? *</label>
            <div class="control has-icons-left has-icons-right">
              <select class="input" v-model="form._id" @change="selecionarCategoria">
                <option
                        v-for="category in categories"
                        :key="category._id"
                        :value="category._id"
                >{{ category.name }}
                </option
                >
              </select>
              <span class="icon is-small is-left">
                                <i class="fas fa-list"></i>
                            </span>
            </div>
          </div>
          <hr v-if="form._id" />
          <div v-if="form._id">
            <div class="description flex-column-around">
              <div class="field flex-row-between">
                <label class="label">Edite as subcategorias de objetos da categoria *</label>
                <div class="subcategorias" v-if="subcategorias.length > 0">
                  <div v-for="(subcategoria) in subcategorias" :key="subcategoria._id" class="subcategoria" >
                    <button class="button" :key="subcategoria._id" @click="removerSubcategoria(subcategoria.name)" ><span>{{ subcategoria.name }}</span><i class="fas fa-trash"></i></button>
                  </div>
                </div>
                <div>
                  <input class="input" placeholder="Nova subcategoria" type="text" v-model="novoSubcategoria" />
                </div>
              </div>
            </div>
          </div>
          <button v-if="form._id"
                  @click="adicionarSubcategoria()"
                  type="button" id="adicionar-subcategoria" class="button self-alignment is-warning"><i class="fas fa-plus"></i>Adicionar subcategoria
          </button>
          <hr v-if="form._id" />
          <div v-if="form._id">
            <div class="description flex-column-around">
              <div class="field flex-row-between">
                <label class="label">Edite os campos descritivos dos objetos da categoria *</label>
                <div class="subcategorias" v-if="form.fields.length > 0">
                  <div v-for="field in form.fields" :key="field._id" class="subcategoria" >
                    <button class="button" @click="removerCampo(field.name)" ><span>{{ field.name }}</span><i class="fas fa-trash"></i></button>
                  </div>
                </div>
                <div>
                  <input class="input" placeholder="Novo campo" type="text" v-model="novoCampo" />
                </div>
              </div>
            </div>
          </div>
          <button v-if="form._id && subcategorias.filter(subcategoria => subcategoria.name).length > 0"
                  @click="adicionarCampo()"
                  type="button" id="adicionar-campo" class="button self-alignment is-warning"><i class="fas fa-plus"></i>Adicionar campo
          </button>
          <hr v-if="formIsOk" />
          <button v-if="formIsOk" type="button" id="cadastrar-categoria" class="button  self-alignment is-success is-large" @click="atualizarCategoria" v-bind:class="{'is-success': formIsOk}"><i v-if="formIsOk" class="fas fa-check"></i>Atualizar categoria</button>
          <button v-if="form._id" type="button" id="excuir-categoria" class="button self-alignment is-danger is-medium" @click="excluirCategoria"><i class="fas fa-trash"></i>Excluir categoria</button>
          <hr v-if="formIsOk" />
          <label v-if="formIsOk">Observação: Apenas campos que não possuem uso atualmente podem ser removidos da Categoria.</label>
          <label v-if="form._id">Apenas categorias que não estão sendo utilizadas podem ser excluídas.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { trimFields } from "@/jsonUtils";
  export default {
    data() {
      return {
        categories: [],
        form: {
          _id: null,
          fields: [],
          type: []
        },
        novoSubcategoria: null,
        novoCampo: null,
        subcategorias: [],
      };
    },
    name: "preSearch",
    methods: {
      goToSearch(){
        this.$router.push("/busca");
      },
      atualizarCategoria() {
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
        console.log(body);
        let config = {
          headers: {
            'Authorization': "Bearer " + this.$store.state.token
          }
        };
        this.axios
          .patch("https://achoserver.herokuapp.com/category", body, config)
          .then(response => {
            if (response.status === 200) {
              alert(
                      "Categoria atualizada com sucesso"
              );
              this.updateData();
            } else {
              alert(
                      "Erro ao tentar atualizar da categoria. Por favor, tente novamente."
              );
            }
            console.log(response);
          })
          .catch()
      },
      adicionarSubcategoria() {
        if(this.novoSubcategoria){
          let subcategoria = {name: this.novoSubcategoria}
          this.subcategorias.push(subcategoria)
          this.novoSubcategoria = ''
        } else {
          alert("É necessário inserir um valor para a subcategoria.")
        }
      },
      adicionarCampo() {
        if(this.novoCampo) {
          this.form.fields.push({
            name: this.novoCampo,
            options: []
          })
          this.novoCampo = ''
        } else {
          alert("É necessário inserir um valor para o campo.")
        }
      },
      selecionarCategoria() {
        this.form.fields = []
        this.subcategorias = []
        let category = this.categories.filter(category => {
          return category._id === event.target.value
        })
        category[0].fields.forEach(field => {
          let newField = {
            name: field.name,
            options: field.options
          }
          this.form.fields.push(newField)
        })

        category[0].type.forEach(type => {
          let subcategoria = {name: type}
          this.subcategorias.push(subcategoria)
        })
      },
      removerSubcategoria(nomeSubcategoria) {
        this.subcategorias = this.subcategorias.filter(subcategoria => subcategoria.name !== nomeSubcategoria)
      },
      removerCampo(nomeCampo) {
        this.form.fields = this.form.fields.filter(field => field.name !== nomeCampo)
      },
      excluirCategoria() {
        let confirmacaoExclusao = confirm("Você tem certeza que deseja excluir esta categoria?")
        if(confirmacaoExclusao) {
          let config = {
            headers: {
              Authorization: "Bearer " + this.$store.state.token
            }
          };
          let categoryId = this.form._id
          this.axios
                  .delete("https://achoserver.herokuapp.com/category/" + categoryId, config)
                  .then(response => {
                    if (response.status === 200) {
                      alert("Categoria excluída com sucesso.");
                      this.form = {
                        _id: null,
                        fields: [],
                        type: []
                      }
                    } else {
                      alert(
                              "Erro ao excluir categoria. Tente novamente."
                      );
                    }
                    console.log(response);
                    this.loading = false;
                  })
                  .catch(error => {
                    if(error.response.status === 400) {
                      alert(error.response.data.message);
                    } else {
                      alert(
                              "Erro ao excluir categoria. Tente novamente."
                      );
                    }
                  });
        }
      },
      updateData() {
        console.log("passou no beforemount");
        this.axios
                .get("https://achoserver.herokuapp.com/category")
                .then(response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    response.data.forEach(category => this.categories.push(category))
                  }
                })
                .catch(error => {
                  console.log(error);
                  this.loading = false;
                });
      }
    },
    computed: {
      formIsOk: function () {
        let validTypes = this.subcategorias ? this.subcategorias.filter(type => type.name && type.name !== '') : []
        let validFields = this.form.fields ? this.form.fields.filter(field => field.name && field.name !== '') : []
        return this.form && this.form._id && validTypes.length > 0 && validFields.length > 0
      }
    },
    beforeMount() {
      this.updateData();
      if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
    }
  };
</script>
