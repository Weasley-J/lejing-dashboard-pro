/* eslint-disable no-console */
import * as echarts from 'echarts'
import { ECharts, EChartsType } from 'echarts'
import { RefObject } from 'react'

export const EChartsManager = {
  /**
   * 获取 ECharts 实例，如果不存在则创建一个新实例
   * @param chartRef React 组件的 ref 对象
   * @returns ECharts 实例或 null
   */
  getInstanceIfNotPresent: (chartRef: RefObject<HTMLDivElement>): ECharts | null => {
    if (!chartRef.current) {
      console.warn('React 组件的 ECharts ref 对象不存在')
      return null
    }
    // 尝试获取现有的 ECharts 实例，如果不存在则创建一个新的实例
    let instance = echarts.getInstanceByDom(chartRef.current)
    if (!instance) {
      instance = echarts.init(chartRef.current)
    }
    return instance
  },

  /**
   * 销毁 ECharts 实例
   * @param instances ECharts 实例或 React ref 对象
   */
  destroy: (...instances: (EChartsType | RefObject<HTMLDivElement>)[]) => {
    instances.forEach(instance => {
      if (instance && 'dispose' in instance && typeof instance.dispose === 'function') {
        instance.dispose()
      } else {
        const instanceRef = instance as RefObject<HTMLDivElement>
        if (instanceRef.current) {
          const chartInstance = echarts.getInstanceByDom(instanceRef.current)
          if (chartInstance) {
            chartInstance.dispose()
          }
        }
      }
    })
  },
}