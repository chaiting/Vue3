<template>
  <Form
    :model="form"
    :rules="formRules"
    ref="formRef"
    @on-validate="validateHandle"
    :label-width="90"
  >
    <Row :gutter="12">
      <Col>
        <FormItem prop="customerId" label="顧客ID">
          <Input v-model="form.customerId"></Input>
        </FormItem>
      </Col>
      <Col>
        <FormItem prop="companyId" label="統一編號">
          <Input v-model="form.companyId"></Input>
        </FormItem>
      </Col>
      <Col> <Button type="primary" @click="submit">送出</Button></Col>
    </Row>
  </Form>
  <pre>{{ form }}</pre>
</template>
<script setup lang="ts">
import isBlank from "is-blank";
import { reactive, ref } from "vue";
import { useFormValidate } from "@/core/hook/useFormValidate";
import type { FormRefType, ValidatorType } from "@/core/type/form-types";

const formRef = ref<FormRefType>();
const { validateHandle, flushErrorFields } = useFormValidate(formRef);

/**
 * 驗證顧客ID
 */
const customerIdValidator: ValidatorType<string> = (rule, value, callback) => {
  if (isBlank(value) && isBlank(form.companyId)) {
    callback(new Error("顧客ID不可為空"));
  }

  flushErrorFields();
  return callback();
};

/**
 * 驗證統一編號
 */
const companyIdValidator: ValidatorType<string> = (rule, value, callback) => {
  if (isBlank(value) && isBlank(form.customerId)) {
    return callback(new Error("統一編號不可為空"));
  }

  flushErrorFields();
  return callback();
};

// 表單欄位
const form = reactive({
  customerId: "",
  companyId: "",
});

// 表單規則
const formRules = {
  customerId: { validator: customerIdValidator },
  companyId: { validator: companyIdValidator },
};

function submit() {
  formRef.value?.validate();
}
</script>
