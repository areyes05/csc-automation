
const dates = require("./formatDates");
const tables = require("./tableNames");


const createQuery = (tableName, dateFrom, dateTo) => {
  return `
SELECT * 
    FROM root.${tableName} 
    WHERE row_date between '${dateFrom}' AND '${dateTo}';
`
  ;
};


let generateQuery = (dateFrom, dateTo) => {

  // format dates
  const date = dates.formatDates(dateFrom, dateTo);

  if (date === undefined) { return "ERROR"; }

  let response = "";


  // create query
  tables.tableNames.forEach(tableName => {

    const query = createQuery(tableName, date.from, date.to);
    response += query;
  });

  return response;
};




/**
 * usage 
 *  generate()     : select dateFrom yesterday dateTo yesterday
 *  generate(date) : select dateFrom date dateTo date
 *  generate(f, t) : select dateFrom f dateTo t
**/
//const q = generateQuery('2019-09-20', '2019-09-22');
//console.log( q );

module.exports.q = generateQuery;
