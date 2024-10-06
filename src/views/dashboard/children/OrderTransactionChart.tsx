import React, { useEffect, useRef, useState } from 'react'
import styles from '@/views/dashboard/index.module.less'
import { Button, Card } from 'antd'
import { EChartsManager } from '@/context/EChartsManager.ts'
import { ReloadOutlined } from '@ant-design/icons'
import { log } from '@/common/loggerProvider.ts'
import * as echarts from 'echarts'

const OrderTransactionChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  // const { isDarkEnable } = useZustandStore()

  const [loading, setLoading] = useState(false)

  const eChartsOption = {
    color: ['#80FFA5', '#00DDFF'],
    title: { text: `${new Date().getFullYear()}`, left: 'right' },
    legend: {},
    tooltip: {
      trigger: 'axis',

      formatter: function (params: any) {
        return params
          .map((item: { seriesName: any; value: any }) => {
            const { seriesName, value } = item
            let unit = ''
            if (seriesName === '订单数量') unit = '单'
            if (seriesName === '交易金额') unit = '元'
            return `${seriesName}: ${value} ${unit}`
          })
          .join('<br/>')
      },
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '订单数量',
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [500, 863, 1000, 980, 1300, 1100, 950, 1400, 1500, 1600, 1700, 500],
      },
      {
        name: '交易金额',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [820, 930, 400, 689, 1244, 3000, 788, 1600, 1944, 5600, 7900, 8000],
      },
    ],
  }

  useEffect(() => {
    const resizeChart = () => {
      const instance = EChartsManager.getInstanceIfNotPresent(chartRef)
      if (instance) {
        instance.setOption(eChartsOption)
        instance.resize() // Resize the chart on window resize
      }
    }
    const animationFrameId = requestAnimationFrame(resizeChart) // To prevent flickering
    window.addEventListener('resize', resizeChart) // Listen for window size changes
    return () => {
      cancelAnimationFrame(animationFrameId) // Clean up the animation frame
      EChartsManager.destroy(chartRef) // Destroy the chart instance when component unmounts
      window.removeEventListener('resize', resizeChart) // Remove the resize event listener
    }
  }, [])

  function onReloadClicked() {
    log.info('Reloading chart data')
    setLoading(!loading)
    setTimeout(() => setLoading(false), 1500) // Simulate loading time
  }

  return (
    <div className={styles.chart}>
      <Card
        title={<span>交易趋势</span>}
        extra={
          <Button
            icon={<ReloadOutlined />}
            shape={'circle'}
            loading={loading}
            size={'large'}
            color={'primary'}
            variant={'text'}
            onClick={onReloadClicked}
          />
        }
      >
        <div id="lineChart" ref={chartRef} className={styles.itemLine} />
      </Card>
    </div>
  )
}

export default OrderTransactionChart