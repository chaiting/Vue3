<template>
  <div>
    <Modal
      v-model="isVisible"
      @on-visible-change="$emit('update:value', $event)"
      width="40vh"
      class="esun-alert"
    >
      <div class="alert-background" :class="classes"></div>
      <!-- 標題 -->
      <template #header>
        <p>{{ title }}</p>
      </template>

      <!-- 內文, slot的優先權大於content -->
      <p>
        <slot>
          <template v-if="Array.isArray(content)">
            <ul class="content-list">
              <li v-for="(item, i) in content" :key="i">
                {{ item }}
              </li>
            </ul>
          </template>
          <template v-else> {{ content }} </template>
        </slot>
      </p>

      <!-- Button -->
      <template #footer>
        <div>
          <Button
            class="cus-btn"
            type="primary"
            size="large"
            @click="closeModal"
          >
            確定
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const emit = defineEmits(["update:value", "on-ok"]);

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
    type: [String, Array],
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

/**
 * alert樣式類型
 */
const classes = computed(() => {
  return props.type + "-background";
});

/**
 * 關閉alert
 */
function closeModal() {
  emit("on-ok");
  isVisible.value = false;
}

/**
 * 監聽是否開啟alert
 */
watch(
  () => props.value,
  (newValue) => (isVisible.value = newValue)
);
</script>

<style lang="less">
.esun-alert {
  text-align: center;
  background-color: red;
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
    background-image: url("@/assets/images/ic_big_green_success.svg");
    margin-bottom: 20px;
  }
  .error-background {
    background-image: url("@/assets/images/ic_big_red_x.svg");
    margin-bottom: 20px;
  }
  .info-background {
    background-image: url("@/assets/images/ic_big_red_alert.svg");
    margin-bottom: 20px;
  }
  .cus-btn {
    width: 40%;
  }
  .content-list {
    list-style: none;
  }
}
</style>
