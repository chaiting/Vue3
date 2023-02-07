<template>
  <Space size="large" wrap>
    <DatePicker
      type="date"
      placeholder="起始日期"
      format="yyyy/MM/dd"
      :options="restrictSpecificSDate(form1.eDate)"
      @on-change="form1.sDate = $event"
      style="width: 200px"
    />
    <DatePicker
      type="date"
      placeholder="結束日期"
      format="yyyy/MM/dd"
      :options="restrictSpecificEDate(form1.sDate)"
      @on-change="form1.eDate = $event"
      style="width: 200px"
    />
  </Space>
  <pre>{{ form1 }}</pre>
  <Space size="large" wrap>
    <DatePicker
      type="date"
      placeholder="起始日期"
      format="yyyy/MM/dd"
      :options="restrictPeriodSDate(form2.eDate, 'd', 10)"
      @on-change="form2.sDate = $event"
      style="width: 200px"
    />
    <DatePicker
      type="date"
      placeholder="結束日期"
      format="yyyy/MM/dd"
      :options="restrictPeriodEDate(form2.sDate, 'd', 10)"
      @on-change="form2.eDate = $event"
      style="width: 200px"
    />
  </Space>
  <pre>{{ form2 }}</pre>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  restrictSpecificSDate,
  restrictSpecificEDate,
  restrictPeriodSDate,
  restrictPeriodEDate,
} from "@/core/utils/date-restrict-utils";

// 表單
const form1 = reactive({
  sDate: "",
  eDate: "",
});

// 表單2
const form2 = reactive({
  sDate: "",
  eDate: "",
});
</script>
