<template>
  <div>
    <div ref="domRef">
      <div class="pdf-wrap" v-for="item in list" :key="item">
        <h1 class="title">收據</h1>
        <div class="container">
          <span>
            茲收到中華電信股份有限公司個人家庭分公司 <b>111</b> 年 <b>06</b> 月
            <b>01</b> 日匯費，
            <br />
            計新臺幣 <b>玖佰捌拾</b> 元整
          </span>
          <section class="firm">
            此致
            <br />
            <br />
            <b> 中華電信股份有限公司個人家庭分公司 </b>
          </section>
          <section>
            收款單位: 玉山銀行信用卡<br />
            統一編號: 99343318 <br />
            地址: 新北市三重區中興北街42巷17弄10號<br />
          </section>
          <section class="processor">
            <span> 經辦: <b>歐陽小玉</b> </span>
          </section>
          <section class="date">
            中華民國 <b>111</b> 年 <b>06</b>月 <b>01</b>日
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const domRef = ref(null);
const list = [1];

defineExpose({ dom: domRef });
</script>

<style lang="scss" scoped>
.pdf-wrap {
  padding: 20px;
  border: 1px solid black;
  margin: 20px;
  max-width: 800px;
  background-color: white;
  h1.title {
    text-align: center;
    background: #00ffff66;
    font-weight: normal;
    letter-spacing: 20px;
  }
  .container {
    padding: 20px 30px 0px 30px;
    font-size: 18px;
  }
  section + section {
    margin-top: 20px;
  }
  .firm {
    padding: 20px 0px 30px 0px;
  }
  .processor {
    text-align: right;
  }
  .date {
    text-align: center;
  }
}
</style>
