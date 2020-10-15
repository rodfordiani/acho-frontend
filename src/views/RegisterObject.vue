<template>
    <div id="register-object" class="central">
        <div class="content cartao shadow">
            <label class="label titulo">Cadastrar um objeto encontrado</label>
            <hr class="new5">
            <form class="cadastrarObj central" @submit="onSubmit">
                <div class="control cartao">
                    <div class="category flex-column-around">
                        <label class="label">Escolha uma categoria para o objeto encontrado *</label>
                        <select class="input" v-model="form.category" @change="selectCategory" required>
                            <option
                                    v-for="category in categories"
                                    :key="category._id"
                                    :value="category.name"
                            >{{ category.name }}
                            </option>
                        </select>
                    </div>
                    <hr v-if="selectedCategory"/>
                    <div v-if="selectedCategory" class="category flex-column-around">
                        <label class="label">Selecione a subcategoria de objeto encontrado *</label>
                        <select class="input" v-model="form.type" required>
                            <option
                                    v-for="type in selectedCategory.type"
                                    :key="type._id"
                                    :value="type"
                            >{{ type }}
                            </option>
                        </select>
                    </div>
                    <hr v-if="form.type"/>
                    <div v-if="form.type" class="description flex-column-around">
                        <div class="field flex-row-between">
                            <label class="label">Escolha o dia em que o objeto foi encontrado *</label>
                            <input class="input" type="date" v-model="form.foundDate" required/>
                        </div>
                    </div>
                    <div v-if="form.fields && form.fields.length > 0">
                        <div v-for="field in form.fields" :key="field._id" class="field" :class="{ 'empty': !field.value }">
                            <label class="label">{{ field.name }}</label>
                            <div class="control has-icons-left has-icons-right">
                                <select
                                        class="input"
                                        v-if="field.options && field.options.length > 0"
                                        v-model="field.value"
                                >
                                    <option></option>
                                    <option
                                            v-for="option in field.options"
                                            :key="option"
                                            :value="option"
                                    >{{ option }}
                                    </option
                                    >
                                    <option
                                            :value="'outro'"
                                    >Outro (a)
                                    </option
                                    >
                                </select>
                                <input
                                        class="input"
                                        type="text"
                                        v-if="field.value === 'outro'"
                                        v-model="field.outroValor"
                                        placeholder="Outro valor para o campo"
                                />
                                <input
                                        class="input"
                                        type="text"
                                        v-if="!field.options || field.options.length === 0 "
                                        v-model="field.value"
                                />
                                <span class="icon is-small is-left">
                                        <i class="fas fa-keyboard"></i>
                                    </span>
                                <span v-if="field.value" class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <hr v-if="form.fields && form.foundDate && selectedCategory && selectedCategory.fields && form.fields.length < selectedCategory.fields.length"/>
                    <button v-if="form.fields && form.foundDate && selectedCategory && selectedCategory.fields && form.fields.length < selectedCategory.fields.length"
                            @click="addInfo()"
                            type="button" id="adicionar-campo" class="button main-btn self-alignment"><i
                            class="fas fa-plus"></i>Adicionar informações <div v-if="form.fields.length === 0">*</div>
                    </button>
                    <hr v-if="form.foundDate"/>
                </div>
                <div class="control cartao imagens">
                    <label class="label">Adicione imagens do objeto</label>
                    <div class="field">
                        <div class="file is-centered is-boxed has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" accept="image/*" capture="camera" @input="storeImage" multiple>
                                <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                          Adicionar imagem
                        </span>
                      </span>
                            </label>
                        </div>
                    </div>
                    <div v-if="form.images.length > 0" class="galeria">
                      <div class="imagem">
                        <div v-for="image in form.images" :key="image._id">
                          <img :src="image">
                          <a class="delete is-medium" @click="deleteImage"></a>
                        </div>
                      </div>
                    </div>
                </div>
                <button v-if="form.foundDate" type="submit" id="cadastrar-obj"
                        class="button is-success self-alignment is-large" v-bind:class="{'is-success': formIsOk}"><i
                        v-if="formIsOk" class="fas fa-check"></i>Cadastrar
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {trimFields} from "@/jsonUtils";

    export default {
        data() {
            return {
                form: {
                    category: null,
                    type: null,
                    foundDate: null,
                    fields: [],
                    images: []
                },
                categories: [],
                selectedCategory: null
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

                let fields = [];
                this.form.fields.forEach(function (field) {
                    let fieldAux = {};
                    if(field.value === 'outro' && field.outroValor) {
                        fieldAux.value = field.outroValor
                    }
                    if (fieldAux.value) {
                        fieldAux = {
                            name: field.name,
                            value: fieldAux.value
                        }
                        fields.push(fieldAux)
                    } else if (field.value && field.value !== 'outro') {
                        fieldAux = {
                            name: field.name,
                            value: field.value
                        }
                        fields.push(fieldAux)
                    }
                })
                body.fields = fields
                if (body.fields.length == 0) {
                    alert("É necessário inserir ao menos uma informação adicional.")
                    return
                } else {

                }
                console.log(body);
                let config = {
                    headers: {
                        'Authorization': "Bearer " + this.$store.state.token
                    }
                };
                this.axios
                    .post("https://achoserver.herokuapp.com/object", body, config)
                    .then(response => {
                        if (response.status === 200) {
                            alert(
                                "Objeto cadastrado com sucesso"
                            );
                            location.reload()
                        } else {
                            alert(
                                "Erro ao tentar realizar cadastro. Por favor, tente novamente."
                            );
                        }
                        console.log(response);
                        this.loading = false;
                        // this.selectAddress(response.data.addressId, () => {
                        //   this.$router.push("/endereco");
                        // });
                        // this.isLoading = false;
                    })
                    .catch();
            },
            selectCategory() {
                let selectedCategory = this.categories.filter(
                    category => category.name === this.form.category
                );
                if (selectedCategory && selectedCategory.length > 0) {
                    this.selectedCategory = selectedCategory[0]
                    this.form.fields = selectedCategory[0].fields
                }
            },
            addInfo() {
                let allFields = []
                this.selectedCategory.fields.forEach(field => allFields.push(field.name))

                let selectedFields = []
                this.form.fields.forEach(field => selectedFields.push(field.name))

                let newFields = []
                newFields = allFields.filter(field => !selectedFields.includes(field))

                if (newFields.length > 0) {
                    let newFieldToForm = {
                        name: newFields[0],
                        value: null
                    }
                    this.form.fields.push(newFieldToForm)
                }
            },
          storeImage(event) {
              let files = event.target.files
              if(files && files.length > 0) {
                let i;
                for(i = 0; i < files.length; i++) {
                  let images = this.form.images
                  let reader  = new FileReader()
                  reader.onloadend = function () {
                    let image = reader.result
                    images.push(image)
                  }
                  reader.readAsDataURL(files[i])
                }
              }
              event.target.value = null
          },
          deleteImage(event) {
            let image = event.target.parentElement.firstChild.src
            for(let i = 0; i < this.form.images.length; i++){
              if (this.form.images[i] === image) {
                this.form.images.splice(i, 1);
              }
            }
          }
        },
        beforeMount(){
            if(this.$store.state.user.profile==="applicant")
            {
                this.goToSearch();
            }
        },
        mounted() {
            console.log("passou no beforemount");
            this.axios
                .get("https://achoserver.herokuapp.com/category")
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        this.categories = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                });
        },
        computed: {
            formIsOk: function () {
                let validFields = this.form.fields.filter(field => field.value)
                return this.form.foundDate && validFields.length > 0
            }
        }
    };
</script>
