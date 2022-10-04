## 問題一

##### - 參數與 swagger-ui 不一致時？ _info-card-api.ts_

```ts
export default {
  /**
   * 系統撥號
   * @param {*} payload 撥號參數
   * @param {*} payload.cname 人員名稱
   * @param {*} payload.employeeNo 員工編號
   * @param {*} payload.deptPhoneNo 單位電話
   * @param {*} payload.userExtension 撥號參數
   * @param {*} payload.officePhoneext 單位分機
   * @param {*} payload.isCreditCardMember 是否為卡處人員
   */
  callAutoDial: async function (payload: callAutoDialReqPayload): callAutoDialResPayload {
    let result = await axios.post("/info_card/02", {
      callingNumber: payload.userExtension,
      calledId: payload.employeeNo,
      calledInfo: payload.cname,
      calledNumber:
        payload.isCreditCardMember === "Y" // Y: 卡處人員
          ? payload.officePhoneext
          : payload.deptPhoneNo,
      calledNumberSrcField: payload.isCreditCardMember === "Y" ? "Z1" : "Z3", // Z1: 個人分機, Z3: 單位簡碼
      calledObjType: payload.isCreditCardMember === "Y" ? "B" : "D" // B: 同仁,  D: 大樓
    });

    return result.data.body;
  }
};
```

##### - 非單一 payload 參數 _bpm-form-api.ts_

```ts
export default {
  /**
   * 起單作業
   * @param flowCode 流程代碼
   * @param payload 起單參數
   */
  doStartProcess: async function (
    flowCode: string,
    payload: StartProcessPayload
  ): doStartProcessResPayload {
    let result = await axios.post("/bpm_form/do_start_process/" + flowCode, payload);
    return result.data.body;
  }
};
```
https://jsdoc.app/tags-param.html

https://jsdoc.app/tags-returns.html

