// doPost: 入力フォームからスプレッドシートに記録
// doGet: スプレッドシートから入力フォームに表示
declare var google: any;

const prop = PropertiesService.getScriptProperties().getProperties();
const SPREADSHEET_FARM_ID = prop.SPREADSHEET_FARM_ID;
const reportSheet =
  SpreadsheetApp.openById(SPREADSHEET_FARM_ID).getSheetByName("farmland");
const lastRow = reportSheet!.getLastRow();

function textOut(obj: any) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(obj));
  return output;
}

function doPost(e: any) {
  let postArray = [
    [
      e.parameter.crop_name,
      e.parameter.damage_target,
      e.parameter.damege_status,
    ],
  ];
  reportSheet!
    .getRange(lastRow, 7, 1, postArray[0].length)
    .setValues(postArray);
  return textOut("記録しました！");
  // return google.script.host.close();
}

function doGet(e: any) {
  const sheetData = reportSheet!.getRange(lastRow, 1, 1, 5).getValues();
  let response = sheetData[0][0];
  return textOut(response);
}

// フォーム
// <h1>GET Request</h1>
// <form
// 	method="GET"
// 	action=""
// 	<p>get_param1</p>
// 	<input name="get_param1" type="text" />
// 	<p>get_param2</p>
// 	<input name="get_param2" type="text" />
// 	<p>get_param3</p>
// 	<input name="get_param3" type="text" />
// 	<p>get_param4</p>
// 	<input name="get_param4" type="text" />
// 	<br />
// 	<button type="submit">get</button>
// </form>
