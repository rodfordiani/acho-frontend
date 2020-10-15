<template>
  <div class="cartao" :class="{'galeria-vazia': object.images && object.images.length === 0}">
    <div class="informacoes">
      <span v-if="$store.state.user.profile === 'applicant' && object.status === 1 && object.devolutionCode">Código para retirada:<strong><b> {{object.devolutionCode}} </b></strong><br/><br/></span>
      <span v-if="$store.state.user.profile !== 'applicant' && object.status === 1">Código de devolução:<strong><b> {{object.devolutionCode}} </b></strong><br/></span>
      <strong>{{ object.category }} / {{ object.type }} </strong>
      <span v-if="object.status">Encontrado em:<b> {{ formatedDate(object.foundDate) }}</b></span>
      <span v-if="!object.status">Perdido em:<b> {{ formatedDate(object.foundDate) }}</b></span>

      <div v-for="field in object.fields" :key="field._id">
        <span>{{ field.name }}:<b> {{ field.value }}</b></span>
      </div>
      <br/>
      <Institution v-if="this.$router.currentRoute.name === 'search' || $store.state.user._id === object.applicant || object.devolutionCode"
              :institution="object.institution"
      >
      </Institution>
      <span v-if="object.status === 2 && $store.state.user.profile !== 'applicant' && object.applicant">Devolvido para:<b> {{ object.applicant.name }} </b> </span>
      <span v-if="object.status === 2 && $store.state.user.profile !== 'applicant' && object.applicant">Contato:<b> {{ object.applicant.phone }} </b> </span>
      <span v-if="object.status === 2 && $store.state.user.profile !== 'applicant' && object.applicant && object.applicant.address">Endereço:<b> {{ object.applicant.address.street }},  {{ object.applicant.address.neighborhood }}, {{ object.applicant.address.number }}  </b> </span>
      <span v-if="object.status === 2 && object.solicitedAt">Solicitado em:<b> {{ formatedDate(object.solicitedAt) }} </b> </span>
      <span v-if="object.status === 2 && object.devolvedAt">Devolvido em:<b> {{ formatedDate(object.devolvedAt)}} </b> </span>
      <span v-if="object.status === 1 && $store.state.user.profile === 'institution' && object.interestedApplicant && object.interestedApplicant.length === 1" class="tag is-warning" ><b>1 outro possível dono.</b></span>
      <span v-if="object.status === 1 && $store.state.user.profile === 'institution' && object.interestedApplicant && object.interestedApplicant.length > 1" class="tag is-warning" ><b>{{object.interestedApplicant.length}} outros possíveis donos.</b></span>
    </div>
    <div class="galeria">
      <Gallery v-if="object.images && object.images.length > 0"
              :images="object.images"
      ></Gallery>
      <button v-if="object.status === 0 && $store.state.user.profile === 'applicant'" class="button is-success" @click="solicitarDevolucao()">Acho que é meu!</button>

      <button v-if="object.status === 1 && $store.state.user.profile === 'applicant' && this.$router.currentRoute.name === 'search' && $store.state.user._id !== object.applicant" class="button is-danger" disabled>Solicitado por outra pessoa</button>
      <button v-if="object.status === 1 && $store.state.user.profile === 'applicant' && this.$router.currentRoute.name === 'solicitations'" class="button is-success" disabled>Objeto solicitado</button>
      <button v-if="object.status === 1 && $store.state.user.profile === 'applicant' && isObserverButton && $store.state.user._id !== object.applicant && !isInterested" class="button is-warning" @click="observe()">Também acho que é meu!</button>
      <button v-if="object.status === 1 && $store.state.user.profile === 'applicant' && isObserverButton && $store.state.user._id === object.applicant" class="button is-success defaultCursor" disabled ><i @click="alertObjetoSolicitado" class="fas fa-info-circle"></i>Objeto solicitado</button>
      <button v-if="object.status === 1 && $store.state.user.profile === 'applicant' && (isInterested || this.$router.currentRoute.name === 'Interesting')" class="button self-alignment defaultCursor is-warning" disabled ><i @click="alertObservando" class="fas fa-info-circle"></i>Interesse demonstrado</button>
      <button v-if="object.status === 1 && isShowCancelButton" class="button is-danger" @click="cancelarSolicitacao()" >Cancelar</button>
      <button v-if="!object.status && isShowCancelButton" class="button is-danger" @click="cancelarNotificacao()" >Cancelar</button>

      <button v-if="object.status === 2 && $store.state.user.profile === 'applicant' && $store.state.user._id === object.applicant" class="button is-success" disabled>Objeto recuperado</button>

      <button v-if="object.status === 0 && $store.state.user.profile !== 'applicant'" class="button is-danger" @click="deleteObject()">Excluir</button>

      <button v-if="object.status === 1 && $store.state.user.profile !== 'applicant'&& isReturn" @click="devolver()" class="button is-success" >Devolver</button>

      <button v-if="object.status === 2 && $store.state.user.profile !== 'applicant'" class="button is-danger" disabled>Objeto devolvido</button>

    </div>
  </div>
  </template>

<script>
  import Gallery from "./Gallery";
  import Institution from "./Institution";

  export default {
    data() {
      return {
      };
    },
    props: ["object","isObserverButton","isShowCancelButton","isReturn"],
    methods: {
      observe(){
        let body = { objectId: this.object._id }
        console.log(body);
        let config = {
                headers: {Authorization: "Bearer " + this.$store.state.token}
              }
        this.axios
              .patch("https://achoserver.herokuapp.com/object/interested",body,config)
              .then(response => {
                    if (response.status === 200) {
                      alert("Interesse demonstrado com sucesso." +
                              "Aguarde até que o atual solicitante realize a averiguação de posse." +
                              "Caso o objeto não seja da pessoa solicitante, ele estará disponível para solicitação." +
                              "Caso você tenha convicção de que este objeto é seu, entre em contato com o Ponto de Devolução.")
                    } else {
                      alert("Algo deu errado. Por favor, tente novamente.");
                    }
              })
          },
      devolver() {
        let body = {
          devolutionCode: this.object.devolutionCode
        };
        console.log(body);
        let config = {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        };
        this.axios
          .patch("https://achoserver.herokuapp.com/object/devolve", body, config)
          .then(response => {
            if (response.status === 200) {
              alert("Objeto devolvido com sucesso.");
              this.$router.push("/objetos-devolvidos");
            } else {
              alert("Erro ao devolver objeto. Por favor, tente novamente.");
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
      solicitarDevolucao() {
        let confirmacaoSolicitacao = confirm("Confirma a solicitação de devolução deste objeto?")
        if (confirmacaoSolicitacao) {
          let body = {
            objectId: this.object._id
          };
          console.log(body);
          let config = {
            headers: {
              Authorization: "Bearer " + this.$store.state.token
            }
          };
          this.axios
            .patch("https://achoserver.herokuapp.com/object/find", body, config)
            .then(response => {
              if (response.status === 200) {
                alert("Solicitação realizada com sucesso.\n\n" +
                        "Procure o Ponto de Devolução portando um documento de comprovação de identidade (RG, CNH, Passaporte ou Carteira de Trabalho).\n" +
                        "Será realizada uma averiguação de posse para realizar a retirada do objeto.");
                this.object.status = 1
                this.object.applicant = this.$store.state.user._id
              } else {
                alert(
                        "Erro ao solicitar devolução de objeto. Por favor, tente novamente."
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
        }
      },
      cancelarNotificacao() {
        this.$emit('cancelarNotificacao')
      },
      cancelarSolicitacao() {
        if (this.$router.currentRoute.name === 'Interesting') {
          let confirmacaoSolicitacao = confirm("Confirma o cancelamento de interesse por este objeto?")
          if (confirmacaoSolicitacao) {
            let config = {
              headers: {
                Authorization: "Bearer " + this.$store.state.token
              }
            };
            let objectId = this.object._id
            this.axios
                    .delete("https://achoserver.herokuapp.com/object/interested/" + objectId, config)
                    .then(response => {
                      if (response.status === 200) {
                        alert("Objeto removido de sua lista de interesse.");
                        this.$parent.updateData();
                      } else {
                        alert(
                                "Erro ao cancelar interesse pelo objeto. Por favor, tente novamente."
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
          }
        } else {
          let confirmacaoSolicitacao = confirm("Confirma o cancelamento da retirada deste objeto?")
          if (confirmacaoSolicitacao) {
            let body = {
              devolutionCode: this.object.devolutionCode
            };
            console.log(body);
            let config = {
              headers: {
                Authorization: "Bearer " + this.$store.state.token
              }
            };
            this.axios
                    .patch("https://achoserver.herokuapp.com/object/cancel", body, config)
                    .then(response => {
                      if (response.status === 200) {
                        alert("A solicitação de retirada do objeto foi cancelada com sucesso.");
                        this.$parent.updateData();
                      } else {
                        alert(
                                "Erro ao solicitar devolução de objeto. Por favor, tente novamente."
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
          }
        }
      },
      deleteObject(){
        let config = {
            headers: {
              Authorization: "Bearer " + this.$store.state.token
            }
          }
        let confirmDeletion = confirm("Confirma a exclusão deste objeto?")
        if (confirmDeletion) {
          console.log('delete called')
          let id = this.object._id
          console.log(id)
          let url = "https://achoserver.herokuapp.com/object/" + id
          console.log(url)
          this.axios
            .delete(url,config)
            .then(response => {
              if (response.status === 200) {
                alert("Objeto removido com sucesso.")
                this.$emit('remove-object', this.object)
              } else {
                alert(
                        "Erro ao realizar deleção do objeto. Por favor, tente novamente. =/"
                )
              }
          })
        }
      },
      formatedDate: function (dateStr) {
        return new Date(Date.parse(dateStr)).toLocaleDateString()
      },
      alertObjetoSolicitado: function () {
        alert("Você solicitou a retirada do objeto.\n" +
                "Procure o Ponto de Devolução portando um documento de comprovação de identidade (RG, CNH, Passaporte ou Carteira de Trabalho).\n" +
                "Será realizada uma averiguação de posse para realizar a retirada do objeto.")
      },
      alertObservando: function () {
        alert("Outra pessoa já havia solicitado a retirada do objeto e você demonstrou interesse por ele.\n" +
                "Aguarde até que o atual solicitante realize a averiguação de posse.\n" +
                "Caso o objeto não seja da pessoa solicitante, ele estará disponível para solicitação.\n" +
                "Caso você tenha convicção de que este objeto é seu, entre em contato diretamente com o Ponto de Devolução.")
      }
    },
    computed: {
      isInterested: function () {
        return this.object.interestedApplicant
                && this.object.interestedApplicant
                        .filter(interested => interested.applicantId === this.$store.state.user._id).length > 0
      }
    },
    mounted(){
      console.log('X',this.url)
    },
    components: {
      Institution,
      Gallery
    }
  };
</script>