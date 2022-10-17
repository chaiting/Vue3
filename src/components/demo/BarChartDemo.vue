<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ref } from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const option = ref({
  title: {
    text: "My BarChart",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c}",
  },
  legend: {
    left: 20,
    orient: "vertical",
    data: ["A", "B", "C"],
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "A",
      data: [
        { value: 535, name: "Mon" },
        { value: 310, name: "Tue" },
        { value: 234, name: "Wed" },
        { value: 135, name: "Thu" },
        { value: 748, name: "Fri" },
        { value: 548, name: "Sat" },
        { value: 948, name: "Sun" },
      ],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
    {
      name: "B",
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [
        { value: 335, name: "Mon" },
        { value: 310, name: "Tue" },
        { value: 234, name: "Wed" },
        { value: 135, name: "Thu" },
        { value: 648, name: "Fri" },
        { value: 748, name: "Sat" },
        { value: 148, name: "Sun" },
      ],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
    {
      name: "C",
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [
        { value: 335, name: "Mon" },
        { value: 310, name: "Tue" },
        { value: 234, name: "Wed" },
        { value: 135, name: "Thu" },
        { value: 148, name: "Fri" },
        { value: 248, name: "Sat" },
        { value: 348, name: "Sun" },
      ],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
