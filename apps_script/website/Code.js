function doGet() {
  return getHtmlFile('index')
}

function addSheetRow(dataObj) {
  const orderSheet = SpreadsheetApp
    .openById('1yBMVAMrvUvh24VWS_bAwR5_34ARMQEwfRDhOa0pLv2w')
    .getSheetByName('Order')

  const keys = getSheetRows(orderSheet)[0].map(key => key.toLowerCase())
  const lastRow = orderSheet.getLastRow()

  for (const key of keys) {
    orderSheet
      .getRange(lastRow + 1, keys.indexOf(key) + 1)
      .setValue(dataObj[key])
  }
}

function deleteSheetRow(dataObj) {
  const orderSheet = SpreadsheetApp
    .openById('1yBMVAMrvUvh24VWS_bAwR5_34ARMQEwfRDhOa0pLv2w')
    .getSheetByName('Order')

  const sheetData = getSheetData(orderSheet)
  const rowIdx = getRowIdx(sheetData, dataObj)
  orderSheet.deleteRow(rowIdx)
}

function getHtmlFile(fileName) {
  return HtmlService
    .createTemplateFromFile(fileName)
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function getSheetRows(sheet) {
  return sheet.getDataRange().getValues()
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

function getRowIdx(data, comparedItem) {
  let rowIdx = 2

  for (const item of data) {
    let count = 0
    let loopTime = 0
    const propsNum = Object.keys(item).length

    for (const prop in item) {
      if (item[prop] === comparedItem[prop]) count++
      if (count === propsNum) return rowIdx
      loopTime++
      if (loopTime === propsNum) count = loopTime = 0
    }
    
    rowIdx++
  }

  return -1
}
