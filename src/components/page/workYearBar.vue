<template>
    <div class="workYearBar">
        <div class="workYearCharts"></div>
    </div>
</template>

<script>
    import data from '../../data/positionFirstType'
    export default {
        name: "workYearBar",
        data() {
            let workYearBar;
            let isEdu = true;
            let xAxisData = [];
            let seriesData = [];
            let firstPoint = 0;
            let secondPoint = 0;
            return {
                workYearBar,
                isEdu,
                xAxisData,
                seriesData,
                firstPoint,
                secondPoint
            }
        },
        props: {
            chartsMsg: Array
        },
        watch: {
            chartsMsg: function (newVal) {
                this.updateWorkYearData(newVal)
            }
        },
        methods:{
            getXAxis() {
                let dataList = [],
                    name = "workYear"
                if(this.isEdu){
                    name = "education"
                }
                data.positionFirstType[0].positionType[0][name].map(item=>{
                    dataList.push(item["name"]);
                })
                this.xAxisData = dataList;
            },

            getWorkYearSeriesData(){
                let dataList = [
                    {name: '1K-3K', type: 'bar', stack: '总量',data:[]},
                    {name: '4K-6K', type: 'bar', stack: '总量',data:[]},
                    {name: '7K-9K', type: 'bar', stack: '总量',data:[]},
                    {name: '10K-15K', type: 'bar', stack: '总量',data:[]},
                    {name: '15K-20K', type: 'bar', stack: '总量',data:[]},
                    {name: '20K-30K', type: 'bar', stack: '总量',data:[]},
                    {name: '30K-50K', type: 'bar', stack: '总量',data:[]},
                    {name: '50K-100K', type: 'bar', stack: '总量',data:[]}
                ];
                let name = "workYear",
                    title = "工作经验数量情况",
                    itext = "学历分布数量情况"
                if(this.isEdu){
                    name = "education"
                    title = "学历分布数量情况"
                    itext = "工作经验数量情况"
                }
                data.positionFirstType[this.firstPoint].positionType[this.secondPoint][name].map(item=>{
                    for(let i=0;i<8;i++){
                        let value = item["salary"][i];
                        dataList[i]["data"].push(value);
                    }
                })
                this.seriesData = dataList;
                return {title, itext}
            },
            getBar(){
                let echarts = this.$echarts;
                let workYearBar = echarts.init(document.getElementsByClassName('workYearCharts')[0]);
                this.workYearBar = workYearBar;
                let option = {
                    tooltip:{
                        trigger: 'item',
                        formatter:"{b} : {c}"
                    },
                    title: {
                        text: '移动开发岗位学历分布数量情况',
                        textStyle: {
                            color: 'white',
                            fontSize: '100%'
                        },
                        left: '10%'
                    },
                    toolbox: {
                        show: true,
                        itemSize: 25,
                        right: '15%',
                        feature: {
                            myTool: {
                                show: true,
                                title: '切换为工作经验数量情况',
                                icon: 'path://M120.94976 278.54848l1.42848 102.41024h499.22048c7.43936 0.08192 13.71648 0.03584 21.41184 0.03584 144.15872 0 261.0176 116.864 261.0176 261.02272 0 143.50336-115.79904 259.96288-259.05664 261.01248l-347.70944 0.01536V1003.52h347.70944c199.29088-1.06496 360.50944-162.944 360.50944-362.48064 0-199.54176-161.21856-361.42592-360.50944-362.48576l-524.02176-0.00512z,M49.6384 278.66112C31.88224 290.56512 20.48 309.03296 20.48 329.77408c0 21.36576 12.10368 40.33024 30.7968 52.18304l297.39008 250.79296 64.82944-77.26592-244.3008-204.99456a56.17152 56.17152 0 0 0 0.08704-41.20576L421.376 97.74592 356.54144 20.48 49.6384 278.66112z',
                                iconStyle: {
                                    color: 'rgba(123,123,123,1)'
                                },
                                emphasis: {
                                    iconStyle: {
                                        color: 'rgba(0,255,127,1)',
                                        textFill: 'white'
                                    }
                                },
                                onclick: () => {
                                    if (this.isEdu) {
                                        this.isEdu = false
                                    } else {
                                        this.isEdu = true
                                    }
                                    this.getXAxis()
                                    this.workYearBar.setOption({
                                        xAxis: {
                                            data: this.xAxisData
                                        }
                                    })
                                    this.updateWorkYearData()
                                }
                            }
                        }
                    },
                    barWidth: '60%',
                    yAxis:  {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#FFFFFF',
                            },
                            lineStyle:{
                                color: '#FFFFFF',
                            }
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data:this.xAxisData,
                        axisLabel:{
                            interval:0,
                            rotate:40,
                            textStyle: {
                                color: '#FFFFFF',
                            },
                            lineStyle:{
                                color: '#FFFFFF',
                            }
                        }
                    },
                    color:[
                        '#6989EF','#48ACDE','#5AC7CF','#6BF1BF', '#C7F895', '#E6D349','#F8A065','#FB865A', '#FF6B5F'
                    ],
                    series : this.seriesData
                };
                this.workYearBar.setOption(option);
            },
            updateWorkYearData(indexPoint){
                if (indexPoint) {
                    this.firstPoint = indexPoint[0];
                    this.secondPoint = indexPoint[1];
                }

                let { title, itext } = this.getWorkYearSeriesData()
                this.workYearBar.setOption({
                    title: {
                        text: data.positionFirstType[this.firstPoint].positionType[this.secondPoint]['typeName'] +
                            '岗位' + title
                    },
                    series: this.seriesData,
                    toolbox: {
                        feature: {
                            myTool: {
                                title: '切换为' + itext
                            }
                        }
                    }
                });
            }
        },
        mounted() {
            this.getXAxis()
            this.getWorkYearSeriesData();
            this.getBar();
        }
    }

</script>

<style scoped>

</style>
