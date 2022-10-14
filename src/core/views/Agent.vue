<template>
  <Card style="width: 500px">
    <Row :gutter="30" align="middle">
      <Col span="20">
        <Form
          ref="agentProfileRef"
          :model="agentProfile"
          :label-width="170"
          :rules="ruleInline"
          label-position="left"
          class="agent-form"
        >
          <FormItem prop="adAccount" label="被代理人AD帳號">
            <Input
              type="text"
              v-model="agentProfile.adAccount"
              :maxlength="20"
            />
          </FormItem>
        </Form>
      </Col>
      <Button type="primary" @click="doSwitchIdentify">送出</Button>
    </Row>
  </Card>
</template>

<script setup lang="ts">
import type { FormRef } from "@/core/type/form-types";
import userProfileApi from "@/core/api/user-profile-api";
import { getCurrentInstance, reactive, ref } from "vue";
import { toUpper } from "lodash-es";

const app = getCurrentInstance();
const agentProfileRef = ref<FormRef>();
const agentProfile = reactive({
  adAccount: "",
});

const ruleInline = reactive({
  adAccount: [
    { required: true, message: "請輸入被代理人AD帳號", trigger: "blur" },
  ],
});

/**
 * 代理人身份切換
 */
function doSwitchIdentify() {
  agentProfileRef.value!.validate(async (valid) => {
    if (valid) {
      const userProfile = await userProfileApi.doSwitchIdentify({
        adAccount: toUpper(agentProfile.adAccount),
      });
      userProfile
        ? app?.appContext.config.globalProperties.$Message.info("身份切換完成")
        : app?.appContext.config.globalProperties.$Message.error(
            "被代理人資料不存在"
          );
    }
  });
}
</script>

<style lang="scss" scoped>
.agent-form {
  margin-top: 24px;
}
</style>
