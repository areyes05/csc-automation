module.exports.formatDates = (dateFrom, dateTo) => {

  let d = new Date();

  // if dateTo is undefined
  if(dateTo === undefined) {
    
    // yesterday
    d.setDate( d.getDate() - 1 );
  } 
  else {

    // date
    d = new Date(dateTo);
  }

  // extract components
  let year  = d.getFullYear();
  let month = d.getMonth() + 1;
  let day   = d.getDate();

  if (isNaN(day)) { return undefined; }

  // prepend zeros
  day   = day   < 10 ? `0${day}`   : `${day}`;
  month = month < 10 ? `0${month}` : `${month}`;

  // format
  dateTo = `${year}-${month}-${day}`;
  
  // if dateFrom is undefined
  if ( dateFrom === undefined) { dateFrom = dateTo; }

  // todo: validate
  else {

    let stamp = Date.parse(dateFrom);
    if (isNaN(stamp)) { return undefined; }
  }

  return {from: dateFrom, to: dateTo };

};
