import isBlank from "is-blank";

const pidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const pidIdInts = [
  1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65,
  74, 83, 21, 3, 12, 30,
];

const pidResidenyFirstInt = [
  1, 10, 9, 8, 7, 6, 5, 4, 9, 3, 2, 2, 11, 10, 8, 9, 8, 7, 6, 5, 4, 3, 11, 3,
  12, 10,
];

const pidResidenySecondInt = [
  0, 8, 6, 4, 2, 0, 8, 6, 2, 4, 2, 0, 8, 6, 0, 4, 2, 0, 8, 6, 4, 2, 6, 0, 8, 4,
];

export default {
  /**
   * 檢查身分證字號是否正確
   */
  checkIdNumberValid: function (idNumber: string) {
    if (isBlank(idNumber)) {
      return false;
    }

    let verifyNum = 0;

    idNumber = idNumber.toUpperCase();

    // 1. 檢查身分證字號 --------------------------------------------------------------------------------------------------
    if (new RegExp("^[A-Z]{1}[1-28-9]{1}[0-9]{8}$").test(idNumber)) {
      // 1.1 檢查第一碼
      verifyNum = verifyNum + pidIdInts[pidChars.indexOf(idNumber.charAt(0))];

      // 1.2 檢查第二~九碼 ------------------------------------------------------------------------------------------------
      let i, j;
      for (i = 1, j = 8; i < 9; i++, j--) {
        verifyNum += Number(idNumber.charAt(i)) * j;
      }

      // 1.3 檢查碼 ------------------------------------------------------------------------------------------------------
      verifyNum = (10 - (verifyNum % 10)) % 10;
      return verifyNum === parseInt(idNumber.charAt(9));
    }

    // 2. 檢查統一證(居留證)編號 ------------------------------------------------------------------------------------------
    verifyNum = 0;
    if (new RegExp("^[A-Z]{1}[A-D]{1}[0-9]{8}$").test(idNumber)) {
      // 2.1 檢查第一碼 --------------------------------------------------------------------------------------------------
      verifyNum += pidResidenyFirstInt[pidChars.indexOf(idNumber.charAt(0))];

      // 2.2 檢查第二碼 --------------------------------------------------------------------------------------------------
      verifyNum += pidResidenySecondInt[pidChars.indexOf(idNumber.charAt(1))];

      // 2.3 檢查第三~八碼 -----------------------------------------------------------------------------------------------
      let i, j;
      for (i = 2, j = 7; i < 9; i++, j--) {
        verifyNum += Number(idNumber.charAt(i)) * j;
      }

      // 2.4 檢查碼 ------------------------------------------------------------------------------------------------------
      verifyNum = (10 - (verifyNum % 10)) % 10;

      return verifyNum === parseInt(idNumber.charAt(9));
    }

    return false;
  },
};
