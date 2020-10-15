<template>
    <div id="search" class="view central">
        <div class="content cartao shadow">
            <label class="label titulo">Procurar por um objeto perdido</label>
            <hr class="new5">
            <div class="control busca cartao">
                <form class="busca central">
                    <div class="field">
                        <label class="label">Qual a categoria do objeto perdido? *</label>
                        <div class="control has-icons-left has-icons-right">
                            <select class="input" v-model="category">
                                <option
                                        v-for="category in categories"
                                        :key="category._id"
                                        :value="category"
                                >{{ category.name }}
                                </option
                                >
                            </select>
                            <span class="icon is-small is-left">
                                <i class="fas fa-list"></i>
                            </span>
                        </div>
                    </div>

                    <div v-if="category" class="field">
                        <label class="label">Selecione a subcategoria de objeto *</label>
                        <div class="control has-icons-left has-icons-right">
                            <select class="input" v-model="type">
                                <option
                                        v-for="type in category.type"
                                        :key="type"
                                        :value="type"
                                >{{ type }}
                                </option
                                >
                            </select>
                            <span class="icon is-small is-left">
                                    <i class="fas fa-list"></i>
                                </span>
                        </div>
                    </div>

                    <div v-if="category && type" class="field">
                        <label class="label">Data em que foi perdido *</label>
                        <div class="control has-icons-left has-icons-right">
                            <input
                                    class="input"
                                    type="date"
                                    v-model="date"
                                    required
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-calendar-alt"></i>
                                </span>
                            <span v-if="date" class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                    </div>

                    <div class="field" v-if="category && date">
                        <div v-if="category && type">
                            <div v-for="field in category.fields" :key="field.name" class="field" :class="{ 'empty': !field.value }">
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
                    </div>
                    <button
                            id="btn-criar-alarme"
                            type="button"
                            class="button criar-alarme main-btn self-alignment is-warning is-medium"
                            :disabled="!isAlarmFormOk"
                            @click="criarAlerta()"
                    >
                        <i class="fa fa-bell" aria-hidden="true"></i>
                        <a>Criar alerta de busca</a>
                    </button>
                    <button
                        id="btn-buscar"
                        type="button"
                        class="button buscar main-btn self-alignment is-success is-large"
                        :disabled="!isSearchFormOk"
                        @click="buscar()"
                    >
                        <i class="fa fa-search" aria-hidden="true"></i>
                     <a>Buscar</a>
                    </button>
                    <br v-if="foundObjects && foundObjects.length > 0 && cities && cities.length > 1" />
                    <div v-if="foundObjects && foundObjects.length > 0 && cities && cities.length > 1" class="field">
                        <label class="label">Em qual cidade o objeto foi perdido?</label>
                        <div class="control has-icons-left has-icons-right">
                            <select class="input" v-model="city">
                                <option></option>
                                <option
                                        v-for="city in cities"
                                        :key="city"
                                        :value="city"
                                >{{ city }}
                                </option
                                >
                            </select>
                            <span class="icon is-small is-left">
                                <i class="fas fa-map-marker"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="results">
            <div
                    v-if="foundObjects && foundObjects.length > 0"
                    class="found-objects content central cartao-back">
                <label class="label titulo">Resultado da busca</label>
                <hr class="new5">
                <Object
                        v-for="object of foundObjects"
                        v-if="!city || (object && object.institution && object.institution.address && object.institution.address.city === city)"
                        :key="object._id"
                        :object="object"
                        :class="{ selected: selected && selected._id === object._id }"
                        :isObserverButton = "true"
                        :isShowCancelButton = "false"
                        :applicantId="object.applicant"
                >
                </Object>
            </div>
            <div  class="found-objects cartao content central cartao-back" v-if="notFound">
                <label class="label titulo">Resultado da busca</label>
                <hr class="new5">
                <b>Ops!</b> <br/>Nenhum objeto desta categoria foi encontrado a partir
                desta data.
            </div>
        </div>
    </div>
</template>

<script>
    import Object from "@/components/Object.vue";

    export default {
        data() {
            return {
                checkBox: false,
                loginForm: false,
                address: false,
                loading: false,
                category: null,
                date: null,
                foundObjects: [],
                categories: [],
                selected: null,
                notFound: false,
                type: null,
                city:null
            };
        },
        name: "preSearch",
        components: {
            Object
        },
        methods: {
            buscar: function () {
                if (this.$store.state.user) {
                    let fields = [];
                    this.category.fields.forEach(function (field) {
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
                    });
                    let body = {
                        category: this.category.name,
                        type: this.type,
                        foundDate: this.date,
                        fields: fields
                    };
                    if (body.fields.length == 0) {
                        delete body.fields
                    }
                    console.log(body);
                    this.axios
                        .post("https://achoserver.herokuapp.com/object/find", body)
                        .then(response => {
                            if (response.status === 200) {
                                this.foundObjects = response.data.filter(object => {
                                    return object.status === 0 || object.status === 1
                                })
                                this.foundObjects = this.foundObjects ? this.foundObjects.sort(function(objectA, objectB) {
                                    return objectA.status - objectB.status
                                }) : this.foundObjects
                                console.log('objeto', this.foundObjects)
                                this.notFound = this.foundObjects && this.foundObjects.length == 0
                                this.focusOnElement('results')
                            } else {
                                alert(
                                    "Erro ao buscar objetos achados. Por favor, tente novamente."
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
                } else {
                    let cadastro = confirm(
                        "Ação restrista a usuários cadastrados. Gostaria de cadastrar-se?"
                    );
                    cadastro
                        ? this.$router.push("/cadastro-requerente")
                        : this.$router.push("/");
                }
            },
            criarAlerta() {
                if (this.$store.state.user) {
                    let config = {
                        headers: {
                            'Authorization': "Bearer " + this.$store.state.token
                        }
                    };
                    let fields = [];
                    this.category.fields.forEach(function (field) {
                        let fieldAux = {};
                        if (field.value === 'outro' && field.outroValor) {
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
                    if(!fields || fields.length === 0) {
                        alert("Para criar um alarme, você deve preencher ao menos uma informação adicional.")
                        return
                    }
                    let body = {
                        category: this.category.name,
                        type: this.type,
                        foundDate: this.date,
                        fields: fields
                    };
                    console.log(body);
                    this.axios
                        .post("https://achoserver.herokuapp.com/notification", body, config)
                        .then(response => {
                            if (response.status === 200) {
                                alert("Seu alarme de busca foi criado com sucesso." +
                                    " Fiquei atento à caixa de entrada de seu e-mail cadastrado - " +
                                    "caso seja encontrado algo que possa ser o seu objeto procurado, " +
                                    "entraremos em contato através dele.")
                            } else {
                                alert(
                                    "Erro ao cadastrar alerta de busca. Por favor, tente novamente."
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
                } else {
                    let cadastro = confirm(
                        "Ação restrista a usuários cadastrados. Gostaria de cadastrar-se?"
                    );
                    cadastro
                        ? this.$router.push("/cadastro-requerente")
                        : this.$router.push("/");
                }
            },
            focusOnElement(elementId) {
                let element = document.getElementById(elementId)
                let elementRect = element.getBoundingClientRect()
                let absoluteElementTop = elementRect.top + window.pageYOffset
                let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                let topMargin = 0.06 * h
                setTimeout(function (){
                    window.scrollTo(0, absoluteElementTop - topMargin)
                }, 2)
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
            isAlarmFormOk: function () {
                if(this.category) {
                    let fields = [];
                    this.category.fields.forEach(function (field) {
                        let fieldAux = {};
                        if (field.value === 'outro' && field.outroValor) {
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
                    if(!fields || fields.length === 0) {
                        return false
                    } else {
                        return this.category && this.category.name && this.type && this.date
                    }
                } else {
                    return false
                }
            },
            isSearchFormOk: function () {
                return this.category && this.category.name && this.type && this.date
            },
            cities: function () {
                let cities = []
                this.foundObjects.forEach(object => {
                    let city = object.institution && object.institution.address && object.institution.address.city ? object.institution.address.city : null
                    if(city) {
                        if(cities.filter(cityAux => {return cityAux === city}).length === 0) {
                            cities.push(city)
                        }
                    }
                })
                return cities
            }
        }
    };
</script>
