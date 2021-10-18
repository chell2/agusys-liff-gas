// doPost: 入力フォームからスプレッドシートに記録
// doGet: スプレッドシートから対象の農地IDを取得
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
// 	<p>get_param</p>
// 	<input name="get_param" type="text" />
// 	<br />
// 	<button type="submit">get</button>
// </form>
