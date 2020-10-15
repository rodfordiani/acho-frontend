<template>
  <div id="saved-objects" class="central">
    <div class="content cartao shadow ">
      <label class="label titulo">Objetos salvos</label>
      <hr class="new5" />
      <div class="control cartao">
        <div v-if="foundObjects && foundObjects.length > 0">
          <Object
            v-for="object of foundObjects"
            :key="object._id"
            :object="object"
            :class="{ selected: selected && selected._id === object._id }"
          >
          </Object>
        </div>
        <div v-else><b>Ops!</b><br />Não foi salvo nenhum objeto da busca ainda.</div>
      </div>      
    </div>
  </div>
</template>

<script>
import Object from "@/components/Object.vue";

export default {
  data() {
    return {
      loading: false,
      objects: [],
      foundObjects: [],
      selected: null,
      categories: [],
      category: null
    };
  },
  name: "searchResultsSaved",
  components: {
    Object
  },
  methods: {
    backToIndex() {
      this.$router.push("/");
    }
  },
  beforeMount() {
    let savedSearchObjects;
    let savedSearchObjectsStr = localStorage.savedSearchObjectsStr;
    if (savedSearchObjectsStr && savedSearchObjectsStr !== "") {
      savedSearchObjects = JSON.parse(savedSearchObjectsStr);
    } else {
      savedSearchObjects = [];
    }
    this.foundObjects = savedSearchObjects;
    if(this.$store.state.user.profile==="institution")
      {
        this.$router.push("/cadastro-objeto");
      }
  }  
};
</script>
