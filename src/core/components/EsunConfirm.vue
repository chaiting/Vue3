<template>
  <div>
    <Modal
      v-model="isVisible"
      @on-visible-change="$emit('update:value', $event)"
      @on-cancel="cancel"
      width="40vh"
      class="esun-confirm"
    >
      <div class="alert-background" :class="classes"></div>
      <!-- 標題 -->
      <template #header>
        <p>{{ title }}</p>
      </template>

      <!-- 內文, slot的優先權大於content -->
      <p>
        <slot>{{ content }}</slot>
      </p>

      <!-- Button -->
      <template #footer>
        <div>
          <Button class="cus-btn" type="info" size="large" @click="cancel">
            取消
          </Button>
          <Button class="cus-btn" type="primary" size="large" @click="ok">
            確定
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const emit = defineEmits(["on-ok", "on-cancel", "update:value"]);

const props = defineProps({
  // 是否顯示訊息彈跳示窗
  value: {
    type: Boolean,
    required: true,
  },
  // 標題
  title: {
    type: String,
    default: "標題",
    required: false,
  },
  // 內容
  content: {
    type: String,
    default: "",
    required: false,
  },
  // 樣式
  type: {
    type: String,
    default: "info",
    required: false,
  },
});

// 是否顯示modal
const isVisible = ref(false);

const classes = computed(() => {
  return props.type + "-background";
});

/**
 * 取消修改
 */
function cancel() {
  isVisible.value = false;
  emit("on-cancel");
}
/**
 * 確認修改
 */
function ok() {
  isVisible.value = false;
  emit("on-ok");
}
watch(
  () => props.value,
  (newValue) => {
    isVisible.value = newValue;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
.esun-confirm {
  text-align: center;
  .ivu-modal-header {
    border-bottom: 0;
  }
  .ivu-modal-footer {
    border-top: 0;
  }
  .ivu-modal-body {
    padding: 20px 60px 60px 60px;
    font-size: 22px;
    line-height: 1.5;
  }
  .alert-background {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 100px;
  }
  .success-background {
    background-image: url(../../assets/images/ic_big_green_success.svg);
    margin-bottom: 20px;
  }
  .error-background {
    background-image: url(../../assets/images/ic_big_red_x.svg);
    margin-bottom: 20px;
  }
  .info-background {
    background-image: url(../../assets/images/ic_big_red_alert.svg);
    margin-bottom: 20px;
  }
  .cus-btn {
    width: 40%;
  }
}
</style>
