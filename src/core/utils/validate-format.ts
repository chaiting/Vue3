import isBlank from "is-blank";

/**
 * 驗證統一編號是否正確
 */
export function checkTaxIdValid(taxId: string): boolean {
  const logic = [1, 2, 1, 2, 1, 2, 4, 1];
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
}

/**
 * 檢查信用卡卡號是否正確
 * @param cardNumber - 15 or 16碼卡號
 */
export function isValidCreditCardNumber(cardNumber: string): boolean {
  // 檢查信用卡卡號
  if (isBlank(cardNumber)) {
    return false;
  }

  if (!new RegExp("^(?=[0-9]*$)(?:.{15}|.{16})$").test(cardNumber)) {
    return false;
  }

  // 最後一碼 等於 最後一碼卡號正確值
  return (
    getLastCardNumber(cardNumber.substring(0, cardNumber.length - 1)) ===
    cardNumber.substring(cardNumber.length - 1)
  );
}

/**
 * 取得最後一碼卡號
 * @param cardNumber - 前14 or 15碼卡號
 */
function getLastCardNumber(cardNumber: string) {
  // 檢查信用卡卡號
  if (isBlank(cardNumber)) {
    return "";
  }

  if (!new RegExp("^(?=[0-9]*$)(?:.{14}|.{15})$").test(cardNumber)) {
    return "";
  }

  let reverseCardNumber = cardNumber.split("").reverse().join("");

  let resultSum = 0;
  for (let i = 0; i < reverseCardNumber.length; i++) {
    let mul = 1;

    // 偶數位需*2
    if (i % 2 == 0) {
      mul = 2;
    }

    let sum = Number(reverseCardNumber.charAt(i)) * mul;

    // 大於10須將十位與個位相加
    if (sum >= 10) {
      sum -= 9;
    }

    resultSum += sum;
  }

  return ((10 - (resultSum % 10)) % 10).toString();
}

/**
 * 檢查身分證字號是否正確
 */
export function checkIdNumberValid(idNumber: string) {
  const pidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const pidIdInts = [
    1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56,
    65, 74, 83, 21, 3, 12, 30,
  ];

  const pidResidenyFirstInt = [
    1, 10, 9, 8, 7, 6, 5, 4, 9, 3, 2, 2, 11, 10, 8, 9, 8, 7, 6, 5, 4, 3, 11, 3,
    12, 10,
  ];

  const pidResidenySecondInt = [
    0, 8, 6, 4, 2, 0, 8, 6, 2, 4, 2, 0, 8, 6, 0, 4, 2, 0, 8, 6, 4, 2, 6, 0, 8,
    4,
  ];

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
}
