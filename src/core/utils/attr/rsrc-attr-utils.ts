import { map, filter, head } from "lodash-es";
import { useProfileStore } from "@/core/store/profile";

/**
 * 查詢資源屬性字串清單
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doQryRsrcTextAttrs(rsrcId: string, attrKey: string) {
  const profileStore = useProfileStore();
  const rsrcAttrList = profileStore.optUserProfile.rsrcAttrList || [];

  return map(
    filter(rsrcAttrList, (row) => {
      return row.rsrcId === rsrcId && row.attrKey === attrKey;
    }),
    (row) => {
      return row.attrVal;
    }
  );
}

/**
 * 查詢資源屬性JSONObject|JSONArray清單
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doQryRsrcJsonAttrs(rsrcId: string, attrKey: string) {
  const rsrcAttrList = doQryRsrcTextAttrs(rsrcId, attrKey);

  return map(rsrcAttrList, (row) => {
    return JSON.parse(row);
  });
}

/**
 * 查詢資源屬性字串
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doGetRsrcTextAttr(rsrcId: string, attrKey: string) {
  const rsrcAttrList = doQryRsrcTextAttrs(rsrcId, attrKey);

  return head(rsrcAttrList) || null;
}

/**
 * 查詢資源屬性JSONObject|JSONArray
 * @param rsrcId 資源代碼, Ref EIAM.TB_RESOURCE.RSRC_ID
 * @param attrKey 屬性鍵
 */
export function doGetRsrcJsonAttr(rsrcId: string, attrKey: string) {
  return JSON.parse(doGetRsrcTextAttr(rsrcId, attrKey) as string);
}
