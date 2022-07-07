<template>
  <div>
    <h1>info view</h1>
    <Row :gutter="20">
      <Col>
        <Form :model="searchForm" :label-width="100" ref="formRef">
          <FormItem label="顧客ID" prop="customerId">
            <Input v-model="searchForm.customerId"></Input>
          </FormItem>
        </Form>
      </Col>
      <Col>
        <Button type="primary" @click="search">submit</Button>
      </Col>
      <Col>
        <Button @click="reset">reset</Button>
      </Col>
      <Col>
        <Button @click="doQryUsers">doQryUsers</Button>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
import someApi from "@/api/some-api";
import { reactive, ref } from "vue";

const formRef = ref<any>();
const searchForm = reactive({
  customerId: "",
});

async function search() {
  let result = await someApi.doQrySomething(searchForm);
  console.log(result);
}

function reset() {
  formRef.value.resetFields();
}

async function doQryUsers() {
  let result = await someApi.doQryUsers();
  console.log(result);
}
</script>
