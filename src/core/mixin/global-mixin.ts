import $ from "jquery";

export default {
  mounted() {
    const vm: any = this;
    $(
      "input[type=text], input[type=search], input[type=url], input[type=telephone], input[type=email], input[type=password], input[type=select]"
    ).attr("autocomplete", "off");

    $("button, input[type=button], input[type=submit]").on(
      "click",
      function () {
        vm.$nextTick(() => {
          if ($(this).prop("disabled")) {
            return;
          }
          $(this).prop("disabled", true);
          setTimeout(() => {
            $(this).prop("disabled", false);
          }, 250);
        });
      }
    );
  },
};
