import isBlank from "is-blank";

const logic = [1, 2, 1, 2, 1, 2, 4, 1];

export default {
  /**
   * 驗證統一編號是否正確
   */
  checkTaxIdValid: function (taxId: string) {
    if (isBlank(taxId)) {
      return false;
    }

    // 1. 檢查統編格式 ---------------------------------------------------------------------------------------------------
    if (!new RegExp("^[0-9]{8}$").test(taxId)) {
      return false;
    }

    let multiplication = 0;
    let sum = 0;
    let i;
    // 2. 計算邏輯乘數 ---------------------------------------------------------------------------------------------------
    for (i = 0; i < 8; i++) {
      multiplication = Number(taxId.charAt(i)) * logic[i];
      sum += parseInt(String(multiplication / 10)) + (multiplication % 10); // 取出十位數和個位數相加
    }

    // 3. 判斷結果 -------------------------------------------------------------------------------------------------------
    if (sum % 10 == 0) {
      return true;
    }

    if ("7" == taxId.charAt(6) && (sum + 1) % 10 == 0) {
      // 若第七碼為7
      return true;
    }

    return false;
  },
};
