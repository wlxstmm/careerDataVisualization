<template>
    <div class="navMenu"></div>
</template>

<script>
    import data from '../../data/navMenu.json'

    export default {
        name: "navMenu",
        data() {
            let arr = [],
                farr = []
            data.PositionFirstType.map(item => {
                let obj = {}
                obj.name = item.name
                obj.value = item.value
                farr.push(obj)
                item.children.map(mitem => {
                    arr.push(mitem)
                })
            })
            return {
                arr, farr
            }
        },
        methods: {
            menuInit() {
                let option = {
                    title: {
                        text: '导航总览',
                        textStyle: {
                            color: 'white',
                            fontSize: '100%'
                        },
                        subtext: '点击扇面切换' + '\n' + '相应数据维度',
                        subtextStyle: {
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '80%'
                        },
                        left: '5%'
                    },
                    series: [{
                        name: 'test2',
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['25%', '45%'],
                        data: this.farr,
                        hoverAnimation: true,
                        color:[
                            '#48ACDE','#5AC7CF','#6BF1BF', '#C7F895', '#E6D349','#F8A065', '#F08080'
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            show: false,
                            position: 'center',
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '80%',
                                    fontWeight: 'bold'
                                },
                                formatter: item => {
                                    return item.name + '\n' + item.value[1] + '个'
                                }
                            }
                        }
                    }, {
                        name: 'test1',
                        type: 'pie',
                        roseType: 'area',
                        center: ['50%', '50%'],
                        radius: ['60%', '90%'],
                        hoverAnimation: true,
                        color:[
                            '#48ACDE','#5AC7CF','#6BF1BF', '#C7F895', '#E6D349','#F8A065'
                        ],
                        data: this.arr,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            show: false,
                            position: 'center',
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '80%',
                                    fontWeight: 'bold'
                                },
                                formatter: item => {
                                    if (item.value[1]) {
                                        return item.name + '\n' + item.value[1] + '个'
                                    } else {
                                        return item.name + '\n' + item.percent + '%'
                                    }
                                }
                            }
                        }
                    }]
                }
                let navMenu = this.$echarts.init(document.getElementsByClassName('navMenu')[0])
                navMenu.setOption(option)
                navMenu.on('click', e => {
                    this.menu_click(e, navMenu)
                })
            },
            menu_click(e, navMenu) {
                if (e.data.value[0] == 1) {
                    let option = {
                        series: [{
                            data: this.farr
                        }, {
                            data: this.arr,
                            roseType: 'area',
                        }]
                    }
                    this.$emit("changeMap", "initMap")
                    this.$emit("changeRadar", 7)
                    navMenu.setOption(option)
                } else if (e.componentIndex == 0) {
                    let arr = []
                    data.PositionFirstType[e.dataIndex].children.map(item => {
                        arr.push({
                            name: item.name,
                            value: item.value[1]
                        })
                    })
                    let option = {
                        series: [{
                            data: [{
                                name: e.name,
                                value: [1, e.value[1]]
                            }]
                        },{
                            data: arr,
                            roseType: ''
                        }]
                    }
                    navMenu.setOption(option)
                    this.$emit("changeMap", e.dataIndex)
                    this.$emit("changeRadar", e.dataIndex)
                } else {
                    let target,
                        arr = [],
                        num = 0,
                        mnum = 0,
                        aim,
                        maim
                    data.PositionFirstType.map(item => {
                        mnum = 0
                        item.children.map(mitem => {
                            if (mitem.name == e.name) {
                                target = item
                                aim = num
                                maim = mnum
                            }
                            mnum++
                        })
                        num++
                    })

                    target.children.forEach(item => {
                        arr.push({
                            name: item.name,
                            value: item.value[1]
                        })
                    })
                    let option = {
                        series: [{
                            data: [{
                                name: target.name,
                                value: [1, target.value[1]]
                            }]
                        }, {
                            data: arr,
                            roseType: ''
                        }]
                    }
                    navMenu.setOption(option)
                    this.$emit("changeMap", aim)
                    this.$emit("changeRadar", aim)
                    this.$emit("changeCharts", [aim, maim])
                }
            }
        },
        mounted() {
            this.menuInit()
        }
    }
</script>

<style lang="css">

</style>
