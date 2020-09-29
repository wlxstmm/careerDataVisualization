<template>
    <div class="leftCharts">
        <nav-menu @changeMap="updateMap" @changeCharts="updateCharts" @changeRadar="updateRadar"/>
        <radar-chart :radar-msg="radarMsg"/>
    </div>
</template>

<script>
    import NavMenu from './navMenu.vue'
    import RadarChart from './radarChart.vue'
    export default {
        name: "leftCharts",
        components: {
            NavMenu,
            RadarChart
        },
        data() {
            let radarMsg
            return {
                radarMsg
            }
        },
        methods: {
            updateMap(e) {
                this.$emit('changeMap', e)
            },
            updateCharts(e) {
                this.$emit('changeCharts', e)
            },
            updateRadar(e) {
                this.radarMsg = e
            }
        }
    }
</script>

<style scoped>

</style>
