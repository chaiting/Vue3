<template>
  <div>
    <div>list = {{ list }}</div>
    <Divider></Divider>
    <div class="btn-group">
      <Button @click="case1">case 1</Button>
      <Button @click="case2">case 2</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

let list = reactive<any>([1, 2, 3]);

function case1() {
  list = [4, 5, 6];
}

function case2() {
  list.concat = [4, 5, 6];
}
/**
 * 
mutable
-----------------------
Array.prototype.pop()
Array.prototype.push()
Array.prototype.shift()
Array.prototype.unshift()
Array.prototype.reverse()
Array.prototype.sort()
Array.prototype.splice()

immutable
-----------------------
Array.prototype.slice()
Array.prototype.concat()
Array.prototype.map()
Array.prototype.filter()

 */
</script>
