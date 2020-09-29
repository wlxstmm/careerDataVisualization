<template>
    <div class="midCharts">
        <main-map :map-msg="mapMsg"/>
    </div>
</template>

<script>
    import MainMap from './mainMap'
    export default {
        name: "mainCharts",
        props: {
            mapMsg: [String, Number]
        },
        components: {
            MainMap
        }
    }
</script>

<style scoped>

</style>
