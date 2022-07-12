<template>
  <Menu width="250">
    <div v-for="(item, index) in leftMenus" :key="index">
      <Submenu v-if="item.subMenuList.length > 0" :name="item.menuSeqNo">
        <template #title> <Icon :type="item.iconText" />{{ item.itemNm }} </template>
        <MenuItem
          v-for="(subItem, index) in item.subMenuList"
          :key="index"
          :name="subItem.itemUri"
          :to="subItem.itemUri"
          :target="subItem.redirectTypeCd == 'P' ? '_self' : '_blank'"
        >
          <Icon :type="item.iconText" /> {{ item.itemNm }}
        </MenuItem>
      </Submenu>
      <MenuItem
        v-else
        :name="item.itemUri"
        :to="item.itemUri"
        :target="item.redirectTypeCd == 'P' ? '_self' : '_blank'"
      >
        <Icon :type="item.iconText" /> {{ item.itemNm }}
      </MenuItem>
    </div>
  </Menu>
</template>

<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";

interface Menu {
  menuSeqNo: string;
  itemNm: string;
  itemUri: string;
  iconText: string;
  redirectTypeCd: string;
  subMenuList: any[];
}

const profileStore = useProfileStore();
const leftMenus = computed<Menu[]>(() => profileStore.leftMenus);

onMounted(() => {
  console.log(leftMenus.value);
});
</script>
