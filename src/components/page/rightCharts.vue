<template>
    <div class="rightCharts">
        <edu-pie :charts-msg="chartsMsg"/>
        <work-year :charts-msg="chartsMsg"/>
    </div>
</template>

<script>
    import EduPie from './eduPie.vue'
    import WorkYear from './workYearBar.vue'
    export default {
        name: "secCharts",
        props: {
            chartsMsg: Array
        },
        components: {
            EduPie,
            WorkYear
        }
    }
</script>

<style lang="css">

</style>
