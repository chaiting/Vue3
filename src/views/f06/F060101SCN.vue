<template>
  <Space size="large" wrap>
    <DatePicker
      type="date"
      placeholder="起始日期"
      format="yyyy/MM/dd"
      :options="restrictSpecificSDate(form.eDate)"
      @on-change="form.sDate = $event"
      style="width: 200px"
    />
    <DatePicker
      type="date"
      placeholder="結束日期"
      format="yyyy/MM/dd"
      :options="restrictSpecificEDate(form.sDate)"
      @on-change="form.eDate = $event"
      style="width: 200px"
    />
  </Space>
  <pre>{{ form }}</pre>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  restrictSpecificSDate,
  restrictSpecificEDate,
} from "@/core/utils/date-restrict-utils";

const form = reactive({
  sDate: "",
  eDate: "",
});
</script>
