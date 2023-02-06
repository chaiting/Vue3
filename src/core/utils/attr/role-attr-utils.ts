import { map, filter, head } from "lodash-es";
import { useProfileStore } from "@/core/store/profile";

/**
 * 查詢角色屬性字串清單
 * @param attrKey 屬性鍵
 */
export function doQryRoleTextAttrs(attrKey: string) {
  const profileStore = useProfileStore();
  const roleAttrList = profileStore.optUserProfile.roleAttrList || [];

  return map(
    filter(roleAttrList, (row) => {
      return row.attrKey === attrKey;
    }),
    (row) => {
      return row.attrVal;
    }
  );
}

/**
 * 查詢角色屬性JSONObject|JSONArray清單
 * @param attrKey 屬性鍵
 */
export function doQryRoleJsonAttrs(attrKey: string) {
  const roleAttrList = doQryRoleTextAttrs(attrKey);

  return map(roleAttrList, (row) => {
    return JSON.parse(row);
  });
}

/**
 * 查詢角色屬性字串
 * @param attrKey 屬性鍵
 */
export function doGetRoleTextAttr(attrKey: string) {
  const roleAttrList = doQryRoleTextAttrs(attrKey);

  return head(roleAttrList) || null;
}

/**
 * 查詢角色屬性JSONObject|JSONArray
 * @param attrKey 屬性鍵
 */
export function doGetRoleJsonAttr(attrKey: string) {
  return JSON.parse(doGetRoleTextAttr(attrKey) as string);
}
