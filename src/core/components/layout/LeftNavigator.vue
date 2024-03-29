<template>
  <Menu
    width="250"
    ref="leftMenusRef"
    accordion
    :active-name="activeItem"
    :open-names="openItem"
  >
    <div v-for="(item, index) in leftMenus" :key="index">
      <Submenu v-if="item.subMenuList.length > 0" :name="item.menuSeqNo">
        <template #title>
          <Icon :type="item.iconText" />{{ item.itemNm }}
        </template>
        <MenuItem
          v-for="(subItem, index) in item.subMenuList"
          :key="index"
          :name="subItem.itemUri || ''"
          :to="subItem.itemUri"
          :target="subItem.redirectTypeCd == 'P' ? '_self' : '_blank'"
        >
          <Icon :type="subItem.iconText" /> {{ subItem.itemNm }}
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
import { find } from "lodash-es";
import { computed, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/core/store/global";
import { useProfileStore } from "@/core/store/profile";
import type { MenuListType } from "@/core/type/user-profile-types";

const route = useRoute();
const globalStore = useGlobalStore();
const profileStore = useProfileStore();
// 左側菜單Ref
const leftMenusRef = ref<any>();
// 開啟選項
const openItem = ref<string[]>([]);
// 當前選項
const activeItem = ref("");
// 選項名稱
const itemName = ref("");

const leftMenus = computed<MenuListType>(() => profileStore.leftMenus);

/** Focus左側選單項目 */
function doFocusLeftMenuItem(itemUri: string) {
  leftMenus.value.forEach((element) => {
    // 1. 第一層選單 ------------------------------------------------------------------------------------------------
    if (itemUri && itemUri === element.itemUri) {
      itemName.value = element.itemNm;
      return true;
    }

    // 2. 第二層選單 ------------------------------------------------------------------------------------------------
    const item = find(element.subMenuList, { itemUri: itemUri });
    if (item) {
      itemName.value = item.itemNm;
      openItem.value = [element.menuSeqNo];
      nextTick(() => {
        leftMenusRef.value.updateOpened();
        leftMenusRef.value.updateActiveName();
      });
      return true;
    }
  });

  /** 儲存當前URI功能標題 */
  globalStore.doUpdateFunctionTitle({ title: itemName.value });
}

/**
 * 根據route變化focus菜單選項
 */
watch(route, () => {
  activeItem.value = route.path;
  doFocusLeftMenuItem(route.path);
});
</script>

<style lang="less" scoped>
div {
  text-align: left;
  color: #3c4c5e;
}
.ivu-menu-vertical .ivu-menu-item {
  padding: 8px 15px;
}
.ivu-menu-vertical .ivu-menu-item:hover {
  font-weight: bolder;
  color: #3c4c5e;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: transparent;
  font-weight: bolder;
  margin-left: 3px;
  z-index: 2;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu)::after {
  right: auto;
  width: 3px;
  height: 50%;
  top: 25%;
}
.ivu-icon {
  margin: 5px;
}
.ivu-menu > .ivu-menu-item {
  font-size: 15px;
  color: #3c4c5e;
  padding: 8px 14px !important;
}
.ivu-menu-light {
  padding-top: 8px;
}
:deep(.ivu-menu-submenu-title):hover {
  font-weight: bolder !important;
  color: #3c4c5e !important;
}
:deep(.ivu-menu-submenu) {
  width: 90%;
  margin-left: 15px;
}
:deep(.ivu-menu-submenu-title) {
  padding: 8px 0px !important;
}
:deep(.ivu-menu-submenu-title-icon) {
  right: 0px !important;
}
.ivu-menu-submenu-title > .ivu-icon {
  margin-right: 10px;
}
</style>
