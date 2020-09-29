<template>
    <div class="radarChart"></div>
</template>

<script>
    import data from '../../data/radar'
    export default {
        name: "radarChart",
        data() {
            let container
            return {
                container
            }
        },
        props: {
            radarMsg: Number
        },
        watch: {
            radarMsg: function (newVal) {
                this.container.setOption({
                    series: [{
                        data: data[newVal].data
                    }],
                    radar: {
                        indicator: data[newVal].indicator
                    },
                    title: {
                        text: data[newVal].name + '领域下各' + '\n' + '岗位工作待遇分布'
                    }
                })
            }
        },
        methods: {
            radarInit() {
                let container = this.$echarts.init(document.getElementsByClassName('radarChart')[0]);
                this.container = container
                let option = {
                    title: {
                        text: '总体领域下各' + '\n' + '岗位工作福利分布',
                        top: 40,
                        left: 0,
                        textStyle: {
                            color: "white",
                            fontSize: '100%'
                        }
                    },
                    tooltip: {
                        formatter(params) {
                            //window.console.log(params)
                            //
                            return '<p>'+params.name+'</p><p>五险一金:'+params.data.data[0]+'</p><p>发展空间:'+params.data.data[1]+'</p><p>双休:'+params.data.data[2]+'</p><p>带薪:'+params.data.data[3]+'</p><p>弹性工作:'+params.data.data[4]+'</p><p>期权奖励:'+params.data.data[5]+'</p><p>旅游:'+params.data.data[6]+'</p><p>氛围:'+params.data.data[7]
                            ///
                        }
                    },
                    legend: {
                        type: 'scroll',
                        bottom:5,
                        textStyle: {
                            color: "rgb(255,255,255)",
                            fontSize: '80%'
                        },
                        itemGap: 30,
                        data:data[0].data.name
                    },
                    color:[
                        '#6989EF','#48ACDE','#5AC7CF','#6BF1BF', '#C7F895', '#E6D349','#F8A065','#FB865A', '#FF6B5F'
                    ]
                    ,
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        splitLine:{
                               lineStyle:{
                                   opacity:0.3
                               }
                        },
                        axisLabel:{
                            type:'log',
                            show:false
                        },
                        indicator: data[7].indicator,
                        splitNumber: 4,
                        splitArea: {
                            areaStyle: {
                                color: ["rgb(42, 42, 42)"]
                            }
                        }
                    },

                    series: [{
                        type: 'radar',
                        data: data[7].data
                    }]
                };


                container.setOption(option);
            }
        },
        mounted() {
            this.radarInit()
        }
    }
</script>

<style scoped>

</style>
