import React from 'react';
import echarts from 'echarts/lib/echarts';

// 引入柱状图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.renderChart();
    }

    renderChart() {
        let myChart = echarts.init(document.getElementById('chartContainer'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }

    render() {
        return (
            <div className="chart-container" id="chartContainer" style={{ width: '500px', height: '500px' }}>

            </div>
        )
    }

}

export default Chart;