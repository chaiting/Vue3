import type MockAdapter from "axios-mock-adapter/types";

/**
 * 
 * @param mock 
 * 
 * bpm-form-api	回傳結果
/bpm_form/do_qry_next_stage_processor/	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[],"stageProcessors":[{"processorId":"19266","processorName":"○○誠"}],"processorType":"people"}}
/bpm_form/do_start_process/	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[],"bpmFormSeqNo":"FORM.20220819.000001"}}
/bpm_form/do_qry_transfer_processor	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[],"stageProcessors":[{"processorId":"21658","processorName":"○○中"}],"processorType":"people"}}
/bpm_form/do_transfer_process	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_send_to_first	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_send_to_previous	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_send_process	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_close_process	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_revoke_process	{"status":"200","spanId":null,"msg":[],"body":{"statusCode":"200","message":[]}}
/bpm_form/do_qry_next_stage_action
 */

export default function (mock: MockAdapter) {
  mock.onPost("/bpm_form/do_transfer_process").reply(200);
  mock.onPost("/bpm_form/do_send_to_first").reply(200);
  mock.onPost("/bpm_form/do_send_to_previous").reply(200);
  mock.onPost("/bpm_form/do_send_process").reply(200);
  mock.onPost("/bpm_form/do_close_process").reply(200);
  mock.onPost("/bpm_form/do_revoke_process").reply(200);

  mock.onPost(/\/bpm_form\/do_start_process\/\w+/).reply(200, {
    msg: [],
    spanId: null,
    body: {
      bpmFormSeqNo: "FORM.20220819.000001",
    },
  });

  mock.onPost(/\/bpm_form\/do_qry_next_stage_processor\/\w+/).reply(200, {
    msg: [],
    spanId: null,
    body: {
      stageProcessors: [{ processorId: "19266", processorName: "○○誠" }],
      processorType: "people",
    },
  });

  mock.onPost("/bpm_form/do_qry_next_stage_action").reply(200, {
    msg: [],
    spanId: null,
    body: {
      stageAction: [
        {
          ctId: 167,
          typeNm: "表單關卡動作",
          cdId: "2",
          cdNm: "銷案",
          flag01: null,
          flag02: null,
          flag03: null,
          flag04: null,
          flag05: null,
          flag06: null,
          flag07: null,
          flag08: null,
          flag09: null,
          flag10: null,
        },
        {
          ctId: 167,
          typeNm: "表單關卡動作",
          cdId: "3",
          cdNm: "結案",
          flag01: null,
          flag02: null,
          flag03: null,
          flag04: null,
          flag05: null,
          flag06: null,
          flag07: null,
          flag08: null,
          flag09: null,
          flag10: null,
        },
        {
          ctId: 167,
          typeNm: "表單關卡動作",
          cdId: "delegate",
          cdNm: "處理權移轉",
          flag01: null,
          flag02: null,
          flag03: null,
          flag04: null,
          flag05: null,
          flag06: null,
          flag07: null,
          flag08: null,
          flag09: null,
          flag10: null,
        },
      ],
    },
  });
}
