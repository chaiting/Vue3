<template>
  <Form
    :model="form"
    :rules="formRules"
    ref="formRef"
    @on-validate="validateHandle"
  >
    <FormItem prop="sDate" label="起始日期">
      <DatePicker
        v-model="form.sDate"
        format="yyyy/MM/dd"
        @on-change="form.sDate = $event"
      ></DatePicker>
    </FormItem>
    <FormItem prop="eDate" label="結束日期">
      <DatePicker
        v-model="form.eDate"
        format="yyyy/MM/dd"
        @on-change="form.eDate = $event"
      ></DatePicker>
    </FormItem>
  </Form>
  <pre>{{ form }}</pre>
</template>
<script setup lang="ts">
import isBlank from "is-blank";
import moment from "moment";
import { reactive, ref } from "vue";
import { useFormValidate } from "@/core/hook/useFormValidate";
import type { FormRefType, ValidatorType } from "@/core/type/form-types";

const formRef = ref<FormRefType>();
const { validateHandle, flushErrorFields } = useFormValidate(formRef);

/**
 * 驗證起始日期
 */
const verifySdate: ValidatorType<string> = (rule, value, callback) => {
  if (isBlank(value)) {
    return callback(new Error("選擇起始日期"));
  }

  if (moment(form.eDate) < moment(value)) {
    return callback(new Error("結束不可早於起始日期"));
  }

  flushErrorFields();
  return callback();
};

/**
 * 驗證結束日期
 */
const verifyEdate: ValidatorType<string> = (rule, value, callback) => {
  if (isBlank(value)) {
    return callback(new Error("選擇結束日期"));
  }

  if (moment(form.sDate) > moment(value)) {
    return callback(new Error("結束不早於起始日期"));
  }

  flushErrorFields();
  return callback();
};

// 表單欄位
const form = reactive({
  sDate: "",
  eDate: "",
});

// 表單規則
const formRules = {
  sDate: { validator: verifySdate, trigger: "change" },
  eDate: { validator: verifyEdate, trigger: "change" },
};
</script>
