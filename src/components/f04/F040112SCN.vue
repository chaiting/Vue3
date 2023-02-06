<template>
  <BpmSubmitter
    :fireOpenCounter="fireOpenCounter"
    :fireSubmitCounter="fireSubmitCounter"
    :formUrl="formUrl"
    :flowCode="'flowCode'"
    :formId="'formId'"
    :mailParams="mailParams"
    @on-open-preprocess="onopenpreprocess"
    @on-signer-change="onsignerchange"
    @on-submit-preprocess="onsubmitpreprocess"
    @on-start-preprocess="onstartpreprocess"
    @on-start-complete="onstartcomplete"
    @on-send-preprocess="onsendpreprocess"
    @on-revoke-preprocess="onrevokepreprocess"
    @on-close-preprocess="onclosepreprocess"
    @on-operate-complete="onoperatecomplete"
    @on-returned="onreturned"
    @on-revoked="onrevoked"
    @on-closed="onclosed"
    @on-cancel="oncancel"
    @on-return-preprocess="onreturnpreprocess"
    @on-return-orgin-preprocess="onreturnorginpreprocess"
    @on-delegate-preprocess="ondelegatepreprocess"
  ></BpmSubmitter>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fireOpenCounter = ref(0);
const fireSubmitCounter = ref(0);
const formUrl = ref("formUrl");
const mailParams = ref({});

/**
 * onopenpreprocess回調事件
 */
function onopenpreprocess() {
  console.log(fireOpenCounter.value++);
  console.log(`[onopenpreprocess]`);
}
/**
 * onsignerchange回調事件
 */
function onsignerchange() {
  console.log(`[onsignerchange]`);
}
/**
 * onsubmitpreprocess回調事件
 */
function onsubmitpreprocess() {
  console.log(`[onsubmitpreprocess]`);
}
/**
 * onstartpreprocess回調事件
 */
function onstartpreprocess() {
  console.log(`[onstartpreprocess]`);
}
/**
 * onstartcomplete回調事件
 */
function onstartcomplete() {
  console.log(`[onstartcomplete]`);
}
/**
 * onsendpreprocess回調事件
 */
function onsendpreprocess() {
  console.log(`[onsendpreprocess]`);
}
/**
 * onrevokepreprocess回調事件
 */
function onrevokepreprocess() {
  console.log(`[onrevokepreprocess]`);
}
/**
 * onclosepreprocess回調事件
 */
function onclosepreprocess() {
  console.log(`[onclosepreprocess]`);
}
/**
 * onoperatecomplete回調事件
 */
function onoperatecomplete() {
  console.log(`[onoperatecomplete]`);
}
/**
 * onreturned回調事件
 */
function onreturned() {
  console.log(`[onreturned]`);
}
/**
 * onrevoked回調事件
 */
function onrevoked() {
  console.log(`[onrevoked]`);
}
/**
 * onclosed回調事件
 */
function onclosed() {
  console.log(`[onclosed]`);
}
/**
 * oncancel回調事件
 */
function oncancel() {
  console.log(`[oncancel]`);
}
/**
 * onreturnpreprocess回調事件
 */
function onreturnpreprocess() {
  console.log(`[onreturnpreprocess]`);
}
/**
 * onreturnorginpreprocess回調事件
 */
function onreturnorginpreprocess() {
  console.log(`[onreturnorginpreprocess]`);
}
/**
 * ondelegatepreprocess回調事件
 */
function ondelegatepreprocess() {
  console.log(`[ondelegatepreprocess]`);
}
</script>
