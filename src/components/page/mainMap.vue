<template>
    <div class="mainMap"></div>
</template>

<script>
    import geoJson from 'echarts/map/json/china.json';
    import {geoCoordMap} from "../../data/geo";
    import data from '../../data/map'

    export default {
        name: "mainMap",
        data() {
            let myChart
            let visualMin = 13
            let visualMax = 63
            return {
                myChart,
                visualMin,
                visualMax
            }
        },
        props: {
            mapMsg: [String, Number]
        },
        watch: {
            mapMsg: function(newVal) {
                if (isNaN(newVal)) {
                    this.myChart.setOption({
                        series: [{
                            data: this.convertData(data.Init)
                        }],
                        visualMap: {
                            max: this.visualMax,
                            min: this.visualMin,
                            range: [this.visualMin, this.visualMax]
                        }
                    })
                } else {
                    this.myChart.setOption({
                        series: [{
                            data: this.convertData(data.PositionFirstType[newVal].map)
                        }],
                        visualMap: {
                            max: data.PositionFirstType[newVal].max,
                            min: data.PositionFirstType[newVal].min,
                            range: [data.PositionFirstType[newVal].min, data.PositionFirstType[newVal].max]
                        }
                    })
                }
            }
        },
        methods: {
            initMap() {
                let echarts = this.$echarts
                let myChart = echarts.init(document.getElementsByClassName('mainMap')[0]);
                echarts.registerMap('zhongguo', geoJson);
                this.myChart = myChart



                myChart.setOption({
                    tooltip: {
                        show: false,
                        formatter: '{b}',
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },

                    visualMap: {
                        type: 'continuous',
                        show: true,
                        left: '10%',
                        min: this.visualMin,
                        max: this.visualMax,
                        dimension: 2,
                        inverse: true,
                        textStyle: {
                            fontSize: 14,
                            color: '#fff'
                        },
                        text: ['Max', 'Min'],
                        realtime: false,
                        calculable: true,
                        hoverLink: false,
                        inRange: {
                            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53']
                        }
                    },

                    geo: {
                        map: 'china',
                        roam: true,
                        zoom: 1.2,
                        tooltip: {
                            show: false,
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1.5,
                                borderColor: 'rgb(147,235,248)',
                                color: 'rgba(25,25,25,1)',
                            },
                            emphasis: {
                                show: true,
                                areaColor: 'rgb(25,25,25)',
                            }
                        }
                    },
                    series: [
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: this.convertData(data.Init),
                            symbolSize: (data) => {
                                return data[2];
                            },
                            symbolRotate: 35,
                            showEffectOn: 'render',
                            effectType: "ripple",
                            rippleEffect: {
                                period: 6,
                                scale: 2.5,
                                brushType: 'stroke',
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            tooltip: {
                                show: true,
                                formatter: function(item){
                                    return item.name+': '+item.value[3];
                                },
                                backgroundColor: "#fff",
                                borderColor: '#ccc',
                                borderWidth: .5,
                                textStyle: {color: "#000"}
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,255,127,0.8)',
                                }
                            }
                        },

                    ]
                })
            },
            convertData(data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name:data[i].name,
                            value:geoCoord.concat(data[i].value).concat(data[i].data)
                        });
                    }
                }
                return res;
            }
        },
        mounted() {
            this.initMap()
        }
    }
</script>

<style scoped>

</style>
