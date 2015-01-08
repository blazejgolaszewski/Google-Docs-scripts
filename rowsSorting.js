function sortRows() {
  var WIDTH_COLUMN_COUNT = 9;
  var START_ROWN_NUM = 2;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheets()[1]);

  var sheet = SpreadsheetApp.getActiveSheet();
  SpreadsheetApp.setActiveSheet(sheet)
  Logger.log(sheet.getName());
  var numRowsWithoutHeader = sheet.getDataRange().getNumRows() - 1;
  var firstRange = sheet.getRange(START_ROWN_NUM, 1, numRowsWithoutHeader, WIDTH_COLUMN_COUNT);
  var secondRange = sheet.getRange(START_ROWN_NUM, WIDTH_COLUMN_COUNT, numRowsWithoutHeader, WIDTH_COLUMN_COUNT);
  var firstHalf = firstRange.getValues();
  var secondHalf = secondRange.getValues();
  
  var dataToSort = firstHalf.concat(secondHalf);
  
  Logger.log("Start sort");
  dataToSort.sort(function(a, b){
    var SORT_COLUMN = 4;
    if (a[SORT_COLUMN] > b[SORT_COLUMN]){
      return 1;
    }
    if (a[SORT_COLUMN] < b[SORT_COLUMN]) {
      return -1;
    }
    return 0;
  });
  Logger.log("End sort");
  
  dataToSort.map(function(x, i, ar){
    ar[i][1] = i + 1;
  });
  Logger.log("Added counter");
  
  firstHalf = dataToSort.slice(0, firstHalf.length);
  secondHalf = dataToSort.slice(firstHalf.length);
  Logger.log("Revert copy");
  
  firstRange.setValues(firstHalf);
  secondRange.setValues(secondHalf);
};
