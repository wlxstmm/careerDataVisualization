<template>
    <div class="eduPie">
        <div class="eduCharts"></div>
    </div>
</template>

<script>
    import data from '../../data/positionFirstType'

    export default {
        name: "eduPie",
        data() {
            let eduPie;
            let isEdu = true;
            let firstPoint = 0;
            let secondPoint = 0;
            return {
                eduPie,
                isEdu,
                firstPoint,
                secondPoint
            }
        },
        props: {
            chartsMsg: Array
        },
        watch: {
            chartsMsg: function (newVal) {
                this.updateEduData(newVal)
            }
        },
        methods:{
            getPie(){
                let echarts = this.$echarts;
                let eduPie = echarts.init(document.getElementsByClassName('eduCharts')[0]);
                this.eduPie = eduPie;
                let name = "workYear";
                if(this.isEdu){
                    name = "education";
                }
                let option = {
                    tooltip:{
                        trigger: 'item',
                        formatter:"{b} : {c} ({d}%)"
                    },
                    title: {
                        text: '移动开发岗位学历分布占比情况',
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
                                title: '切换为 '+ '\n' + '工作经验占比情况',
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
                                    this.updateEduData()
                                }
                            }
                        }
                    },
                    series : [
                        {
                            type: 'pie',
                            radius: ['40%', '58%'],
                            center: ['40%', '50%'],

                            data:data.positionFirstType[this.firstPoint].positionType[this.secondPoint][name],
                            color:[
                                '#6989EF','#48ACDE','#5AC7CF','#6BF1BF', '#C7F895', '#E6D349','#F8A065','#FB865A', '#FF6B5F'
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.eduPie.setOption(option);
            },
            updateEduData(indexPoint){
                if (indexPoint) {
                    this.firstPoint = indexPoint[0];
                    this.secondPoint = indexPoint[1];
                }
                let name,
                    title,
                    itext
                if (this.isEdu) {
                    name = "education"
                    title = "学历分布占比情况"
                    itext = "工作经验占比情况"
                } else {
                    name = "workYear"
                    title = "工作经验占比情况"
                    itext = "学历分布占比情况"
                }
                this.eduPie.setOption({
                    title: {
                        text: data.positionFirstType[this.firstPoint].positionType[this.secondPoint]['typeName'] +
                            '岗位' + title
                    },
                    series: [
                        {
                            data: data.positionFirstType[this.firstPoint].positionType[this.secondPoint][name]
                        }
                    ],
                    toolbox: {
                        feature: {
                            myTool: {
                                title: '切换为' + '\n' + itext
                            }
                        }
                    }
                });
            }
        },
        mounted() {
            this.getPie();
        }
    }
</script>

<style scoped>

</style>
