<template>
    <div id="interesting">
        <div class="content central cartao">
            <label class="label titulo">Objetos rastreados</label>
            <hr class="new5">
            <label class="label">Caso seja encontrado algum objeto semelhante aos filtros abaixo, você será notificado por e-mail.</label>
            <div
                    v-if="searchAlerts && searchAlerts.length > 0"
                    class="found-objects content central">
                <Object
                        class="cartao shadow"
                        v-for="searchAlert of searchAlerts"
                        :key="searchAlert._id"
                        v-on:cancelarNotificacao="cancelarNotificacao(searchAlert._id)"
                        :object="searchAlert.objectToFind"
                        :isObserverButton="false"
                        :isShowCancelButton="true"
                >
                </Object>
            </div>
            <div class="cartao" v-else-if="notFound">
                <b>Ops!</b> <br/>
                Você não está observando nenhum objeto no momento.
            </div>
        </div>
    </div>
</template>

<script>
    import Object from "../components/Object";

    export default {
        data() {
            return {
                searchAlerts: [],
                notFound: false
            };
        },
        name: "searchAlerts",
        components: {
            Object
        },
        beforeMount() {
            this.updateData();
            if(this.$store.state.user.profile==="institution")
            {
                this.$router.push("/cadastro-objeto");
            }
        },
        methods: {
            updateData() {
                let config = {
                    headers: {
                        'Authorization': "Bearer " + this.$store.state.token
                    }
                };
                this.axios
                    .get("https://achoserver.herokuapp.com/notification/", config)
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.data);
                            this.searchAlerts = response.data;
                            this.notFound = !this.searchAlerts || this.searchAlerts.length === 0
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                        alert(error.message)
                    });
            },
            cancelarNotificacao(objectId) {
                let confirmacaoCancelamento = confirm("Confirma cancelamento do rastreamento?")
                if (confirmacaoCancelamento) {
                    let config = {
                        headers: {
                            Authorization: "Bearer " + this.$store.state.token
                        }
                    };
                    this.axios
                        .delete("https://achoserver.herokuapp.com/notification/" + objectId, config)
                        .then(response => {
                            if (response.status === 200) {
                                alert("O rastreamento do objeto foi cancelado com sucesso.");
                                this.updateData();
                            } else {
                                alert(
                                    "Erro ao cancelar rastreamento. Por favor, tente novamente."
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
        }
    };
</script>
