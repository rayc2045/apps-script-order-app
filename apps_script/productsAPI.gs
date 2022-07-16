function doGet() {
  const menuSheet = SpreadsheetApp
    .openById('1yBMVAMrvUvh24VWS_bAwR5_34ARMQEwfRDhOa0pLv2w')
    .getSheetByName('Menu')

  const data = getSheetData(menuSheet)
  // Logger.log(data)

  return getJSONContent(data)
}

function getSheetData(sheet) {
  const rows = sheet.getDataRange().getValues()
  const keys = rows.shift().map(key => key.toLowerCase())

  return rows.map(row => {
    const obj = {}
    for (const i in keys) obj[keys[i]] = row[i]
    return obj
  })
}

function getJSONContent(content) {
  return ContentService
    .createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON)
}
