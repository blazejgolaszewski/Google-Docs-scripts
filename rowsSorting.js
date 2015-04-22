var SORT_COLUMN = 0;

function sortBusy() {
  sortRows("BUSY");  
}

function sortTiry() {
  sortRows("TABELA"); 
}

function sortRows(sheetName) {
  var WIDTH_COLUMN_COUNT = getColumnNumber("PAL", 2) - 1;
  var START_ROWN_NUM = 2;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 
  var sheet = ss.getSheetByName(sheetName);
  
  SpreadsheetApp.setActiveSheet(sheet)
  Logger.log(sheet.getName());
  var numRowsWithoutHeader = sheet.getDataRange().getNumRows() - 1;
  var firstRange = sheet.getRange(START_ROWN_NUM, 1, numRowsWithoutHeader, WIDTH_COLUMN_COUNT);
  var secondRange = sheet.getRange(START_ROWN_NUM, WIDTH_COLUMN_COUNT + 1, numRowsWithoutHeader, WIDTH_COLUMN_COUNT);
  var firstHalf = firstRange.getValues();
  var secondHalf = secondRange.getValues();
  
  var dataToSort = firstHalf.concat(secondHalf);
  var dataToSortWithoutDuplicates = [];
  
  SORT_COLUMN = getColumnOffset("PLZ", 1);
  
  Logger.log("Remove empty lines");
  
  for (row in dataToSort) {
    if (dataToSort[row][SORT_COLUMN].length > 0) {
      dataToSortWithoutDuplicates.push(dataToSort[row]);
    }
  }
  
  dataToSort = dataToSortWithoutDuplicates;
  
  Logger.log("Start sort");
  
  dataToSort.sort(function(a, b){
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
  
  var halfDataArray = Math.floor(dataToSort.length/2);

  firstHalf = dataToSort.slice(0, halfDataArray);
  secondHalf = dataToSort.slice(dataToSort.length - halfDataArray);
  Logger.log("Revert copy");
  
  firstRange.clearContent();
  var newFirstRange = firstRange.offset(0, 0, firstHalf.length, WIDTH_COLUMN_COUNT)
  newFirstRange.setValues(firstHalf);
  
  secondRange.clearContent();
  var newSecondRange = secondRange.offset(0, 0, secondHalf.length, WIDTH_COLUMN_COUNT)
  newSecondRange.setValues(secondHalf);
};

function getColumnOffset(columnName, numberOfOccurance) {
  var occuranceCount = 0;
  var occurance = numberOfOccurance ? numberOfOccurance : 1;

  lastColumn = SpreadsheetApp.getActiveSheet().getLastColumn();
  var range = SpreadsheetApp.getActiveSheet().getRange(1,1,1,lastColumn);

  for (var i = 0; i < range.getLastColumn(); i++) {
    if (range.offset(0, i, 1, 1).getValue() == columnName) {
      occuranceCount++;
      
      if (occuranceCount === numberOfOccurance) {
        return i;
      }
    } 
  }
}

function setCarBackground() {
  
}

function getColumnNumber(columnName, numberOfOccurance) {
  return getColumnOffset(columnName, numberOfOccurance) + 1;
}