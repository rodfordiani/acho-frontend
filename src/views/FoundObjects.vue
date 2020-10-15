<template>
  <div id="returned-objects" class="central">
    <div class="content cartao shadow">
      <label class="label titulo">Objetos achados</label>
      <hr class="new5" />
      <p>Objetos cadastrados na {{$store.state.user.companyName}}</p>
      <div
        v-if="foundObjects.length > 0"
        class="content found-objects central">
        <div class="filter">
          <label class="label">Filtro </label>
          <div class="containerRow">
            <div> 
              <label class="label">Categoria</label>
                <select class="input" v-model="category" @change="filterByCategory">
                    <option
                      v-for="category in categories"
                      :key="category._id"
                      :value="category">
                      {{ category.name }}
                    </option>
                </select>
            </div>
            <div v-if="category" class="field">
                <label class="label">Subcategoria</label>
                <div class="control has-icons-left has-icons-right">
                    <select class="input" v-model="type" @change="filterByCategoryAndType">
                        <option
                          v-for="type in category.type"
                          :key="type"
                          :value="type">
                        {{ type }}
                        </option>
                    </select>
                </div>
            </div>
          </div>   
        </div>
          <hr/>
        <Object v-if="listFiltered.length <= 0 && listFilteredByType.length <= 0 &&isFilteringByCategory ==false" 
                v-for="object of foundObjects"
                :key="object._id"
                :object="object"
                @remove-object="removeObject"
                class="cartao shadow">
        </Object>
        <Object v-if="listFiltered.length > 0 && listFilteredByType.length <= 0 &&isFilteringByType ==false"
                v-for="object of listFiltered"
                :key="object._id"
                :object="object"
                @remove-object="removeObject"
                class="cartao shadow">
        </Object>
        <Object 
                v-if="listFiltered.length > 0 && listFilteredByType.length > 0"
                v-for="object of listFilteredByType"
                :key="object._id"
                :object="object"
                @remove-object="removeObject"
                class="cartao shadow">
        </Object>
        <div class="control cartao" v-if="isFilteringByType && listFilteredByType.length <= 0"><b>Ops!</b><br />Não existem achados com essas caracteristicas.</div>

      </div>
      <div class="control cartao" v-if="requestDone && foundObjects<=0 "><b>Ops!</b><br />Não existem achados no momento.</div>
    </div>
  </div>
</template>

<script>
  import Object from "../components/Object";

  export default {
    data() {
      return {
        loading: false,
        foundObjects: [],
        requestDone: false,
        categories:[],
        category: null,
        type: null,
        listFiltered:[],
        listFilteredByType:[],
        isFilteringByType:false,
        isFilteringByCategory:false
      };
    },
    name: "returnedObjects",
    methods: {
      filterByCategory(){
        this.isFilteringByType = false
        this.isFilteringByCategory = true
        this.listFiltered = []
        this.listFilteredByType=[]
        this.listFiltered = this.foundObjects.filter(
          foundObjects => foundObjects.category===this.category.name
          )
        console.log('CAtegoria escolhida' ,this.listFiltered)
        console.log(' type' ,this.listFilteredByType)
        console.log(' esta filtrando por tipo?' ,this.isFilteringByType)
      },
      filterByCategoryAndType(){
        this.isFilteringByType = true
        this.listFilteredByType = []
        this.listFilteredByType = this.listFiltered.filter(
          listFiltered => listFiltered.type===this.type
          )
        console.log('by type' ,this.listFilteredByType)
        console.log(' esta filtrando por tipo?' ,this.isFilteringByType)

      },
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
                .get("https://achoserver.herokuapp.com/object?status=0", config)
                .then(response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    this.foundObjects = response.data;
                    this.requestDone = true
                  }
                })
                .catch(error => {
                  console.log(error);
                });
      },
      goToSearch(){
        this.$router.push("/busca");
      },
      removeObject: function (object) {
        this.foundObjects = this.foundObjects.filter(function (foundObject) {
          return foundObject._id !== object._id
        })
      }
    },
    components: {
      Object
    },
    beforeMount(){
      console.log("passou beforeMount")
      if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
      this.updateData();
      if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
    },
    mounted() {
        this.axios
          .get("https://achoserver.herokuapp.com/category")
          .then(response => {
              if (response.status === 200) {
                  console.log(response.data);
                  this.categories = response.data;
                  console.log('lista',this.listFiltered)
              }
          })
          .catch(error => {
              alert(error);
          });
    }
  };
</script>
