<template>
  <div id="register-obj" class="register-object edit">
    <form class="content" @submit="onSubmit">
      <label class="titulo label">Editar objeto</label>
      <hr v-if="form.category" />
      <div v-if="form.category" class="description">
        <div class="field flex-row-between">
          <label>Nome</label>
          <input class="input" v-model="form.name" />
        </div>
        <div class="field flex-row-between">
          <label>Categoria</label>
          <input class="input" v-model="form.category" disabled />
        </div>
        <div class="field flex-row-between">
          <label>Descrição</label>
          <input class="input" v-model="form.description" />
        </div>
        <div
          class="field flex-row-between"
          :key="field.type"
          v-for="field in form.fields"
        >
          <label>{{ field.type }}</label>
          <input class="input" v-model="field.value" />
        </div>
      </div>
      <div v-if="form.category" class="submit field flex-row-between">
        <button type="submit" class="button is-success">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { trimFields } from "@/jsonUtils";

export default {
  data() {
    return {
      form: {},
      categories: []
    };
  },
  methods: {
    goToSearch(){
        this.$router.push("/busca");
      },
    onSubmit(event) {
      event.preventDefault();

      let body = {};
      body.id = this.form._id;

      let obj = {};
      obj.name = this.form.name;
      obj.category = this.form.category;
      obj.name = this.form.name;
      obj.foundDate = this.form.foundDate;
      obj.description = this.form.description;
      obj.fields = this.form.fields;
      body.data = trimFields(obj);
      console.log(body);

      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      };
      this.axios
        .patch("https://achoserver.herokuapp.com/object", body, config)
        .then(response => {
          if (response.status === 200) {
            alert("Dados do objeto alterados com sucesso");
          } else {
            alert(
              "Erro ao tentar alterar dados do objeto. Por favor, tente novamente."
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
        this.form.fields = selectedCategory[0].fields;
      }
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

    this.form = this.$store.state.objectEdit;
  },
  beforeMount(){
      if(this.$store.state.user.profile==="applicant")
      {
        this.goToSearch();
      }
    }
};
</script>
