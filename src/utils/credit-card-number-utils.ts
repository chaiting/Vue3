import isBlank from "is-blank";

export default {
  /**
   * 檢查信用卡卡號是否正確
   * @param 15 or 16碼卡號
   */
  isValidCreditCardNumber: function (cardNumber: string) {
    // 檢查信用卡卡號
    if (isBlank(cardNumber)) {
      return false;
    }

    if (!new RegExp("^(?=[0-9]*$)(?:.{15}|.{16})$").test(cardNumber)) {
      return false;
    }

    // 最後一碼 等於 最後一碼卡號正確值
    return (
      this.getLastCardNumber(cardNumber.substring(0, cardNumber.length - 1)) ===
      cardNumber.substring(cardNumber.length - 1)
    );
  },
  /**
   * 取得最後一碼卡號
   * @param 前14 or 15碼卡號
   */
  getLastCardNumber: function (cardNumber: string) {
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
  },
};
