<template>
  <div class="actions flex-column-around">
    <div class="primary-actions flex-row-between">
      <button type="button" class="button is-warning perdi" @click="abrirBusca()">Perdi</button>
      <button type="button" class="button is-warning encontrei" @click="buscarInstituicoes()">Encontrei</button>
    </div>
    <div class="secondary-actions flex-row-around">
      <button
        type="button"
        class="button is-text"
        @click="cadastrarInstituicao()"
      >Quero utilizar o app em minha instituição</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cadastrarInstituicao() {
      this.$router.push("/cadastro-instituicao");
    },
    abrirBusca() {
      this.$router.push("/busca");
    },
    buscarInstituicoes () {
      this.$router.push("/devolucao");
    }
  }
};
</script>
