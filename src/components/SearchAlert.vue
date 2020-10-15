<template>
    <div class="cartao">
        <div class="informacoes">
<!--            <strong>{{ alert.category }} / {{ alert.type }} </strong>-->
<!--            <span>Perdido em:<b> {{ formatedDate(alert.foundDate) }}</b></span>-->
            <strong>Documento / RG </strong>
            <span>Perdido em:<b> {{ formatedDate(object.foundDate) }}</b></span>
            <strong>Descrição: </strong>
            <div v-for="field in alert.fields" :key="field._id">
                <span>{{ field.name }}:<b> {{ field.value }}</b></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["alert"],
        name: "SearchAlert"
    }
</script>

<style scoped>

</style>