<template>
    <div id="main">
        <left-charts @changeMap="updateMap" @changeCharts="updateCharts"/>
        <mid-charts :map-msg="mapMsg"/>
        <right-charts :charts-msg="chartsMsg"/>
    </div>
</template>

<script>
    import LeftCharts from './leftCharts'
    import MidCharts from './midCharts.vue'
    import RightCharts from './rightCharts.vue'
    export default {
        name: "index",
        components: {
            LeftCharts,
            MidCharts,
            RightCharts,
        },
        data() {
            let mapMsg,
                chartsMsg
            return {
                mapMsg,
                chartsMsg
            }
        },
        methods: {
            updateMap(e) {
                this.mapMsg = e
            },
            updateCharts(e) {
                this.chartsMsg = e
            }
        }
    }
</script>

<style lang="css">

</style>
