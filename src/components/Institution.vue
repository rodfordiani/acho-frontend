<template
  ><label
    ><div class="institution is-warning">
      <div class="info">
        <strong>{{ institution.fantasyName }}</strong><br/>
        <span>{{ institution.companyName }}</span><br/>
        <span>Telefone: {{ institution.phone }}</span><br/>
        <span>E-mail: {{ institution.phone }}</span><br/>
        <div class="address">
          <strong
          >{{ institution.address.city }} -
            {{ institution.address.state }}</strong
          ><br/>
          <label
          >Endereço: {{ institution.address.street }}, {{ institution.address.number }}</label
          ><br/>
          <label>Bairro: {{ institution.address.neighborhood }}</label><br/>
          <label>CEP: {{ institution.address.zipCode }}</label>
        </div>
      </div>
      <div v-if="this.$router.currentRoute.name !== 'search'" class="directions">
        <button class="button is-info" @click="navegacaoAPe"><i class="fas fa-route"></i>Como chegar a pé</button>
        <button class="button is-warning" @click="navegacaoDeCarro"><i class="fas fa-directions"></i>Como chegar de carro</button>
      </div>
    </div></label
  ></template
>

<script>
  export default {
    props: ['institution'],
    methods: {
      selectInstitution() {
        //console.log("emitinstitution")
        //this.$emit('selectInstitution', this.institution);
      },
      navegacaoAPe() {
        let destination = "https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=" + this.institution.address.street + ", " + this.institution.address.number + " - " + this.institution.address.city + "-" + this.institution.address.state
        let url = encodeURI(destination)
        window.open(url, '_blank')
      },
      navegacaoDeCarro() {
        let destination = "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + this.institution.address.street + ", " + this.institution.address.number + " - " + this.institution.address.city + "-" + this.institution.address.state
        let url = encodeURI(destination)
        window.open(url, '_blank')
      }
    }
  }
</script>
