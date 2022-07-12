import axios from "axios";

export default {
  // 取得登入者基本資料
  doFetchLoginUserProfile: async function () {
    let result = await axios.post("/user_profile/01");
    console.log(result);
    return result.data.body;
  },
};
