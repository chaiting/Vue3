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

function onopenpreprocess() {
  console.log(fireOpenCounter.value++);
  console.log(`[onopenpreprocess]`);
}
function onsignerchange() {
  console.log(`[onsignerchange]`);
}
function onsubmitpreprocess() {
  console.log(`[onsubmitpreprocess]`);
}
function onstartpreprocess() {
  console.log(`[onstartpreprocess]`);
}
function onstartcomplete() {
  console.log(`[onstartcomplete]`);
}
function onsendpreprocess() {
  console.log(`[onsendpreprocess]`);
}
function onrevokepreprocess() {
  console.log(`[onrevokepreprocess]`);
}
function onclosepreprocess() {
  console.log(`[onclosepreprocess]`);
}
function onoperatecomplete() {
  console.log(`[onoperatecomplete]`);
}
function onreturned() {
  console.log(`[onreturned]`);
}
function onrevoked() {
  console.log(`[onrevoked]`);
}
function onclosed() {
  console.log(`[onclosed]`);
}
function oncancel() {
  console.log(`[oncancel]`);
}
function onreturnpreprocess() {
  console.log(`[onreturnpreprocess]`);
}
function onreturnorginpreprocess() {
  console.log(`[onreturnorginpreprocess]`);
}
function ondelegatepreprocess() {
  console.log(`[ondelegatepreprocess]`);
}
</script>
