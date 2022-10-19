import { map, filter, head } from "lodash-es";
import { useProfileStore } from "@/core/store/profile";

/**
 * 查詢角色資源屬性字串清單
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doQryRoleRsrcTextAttrs(rsrcId: string, attrKey: string) {
  const profileStore = useProfileStore();
  const roleRsrcAttrList = profileStore.optUserProfile.roleRsrcAttrList || [];

  return map(
    filter(roleRsrcAttrList, (row) => {
      return row.rsrcId === rsrcId && row.attrKey === attrKey;
    }),
    (row) => {
      return row.attrVal;
    }
  );
}

/**
 * 查詢角色資源屬性JSONObject|JSONArray清單
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doQryRoleRsrcJsonAttrs(rsrcId: string, attrKey: string) {
  const roleRsrcAttrList = doQryRoleRsrcTextAttrs(rsrcId, attrKey);

  return map(roleRsrcAttrList, (row) => {
    return JSON.parse(row);
  });
}

/**
 * 查詢角色資源屬性字串
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doGetRoleRsrcTextAttr(rsrcId: string, attrKey: string) {
  const roleRsrcAttrList = doQryRoleRsrcTextAttrs(rsrcId, attrKey);

  return head(roleRsrcAttrList) || null;
}

/**
 * 查詢角色資源屬性JSONObject|JSONArray
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doGetRoleRsrcJsonAttr(rsrcId: string, attrKey: string) {
  return JSON.parse(doGetRoleRsrcTextAttr(rsrcId, attrKey) as string);
}
