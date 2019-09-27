const mysql = require("mysql");

async function columns(tableName) {


  const query = `show columns from ${tableName}`;
  const cols = [];
  const data = await queryDb(query);

  // build and array of cols
  data.forEach( col => {
    cols.push( col.Field );
  });

  return cols;

}

function queryDb(q, callback) {

  const conn = mysql.createConnection({
    host: "docker.usc.edu",
    user: "csdatapr",
    password: "csdatapr.What is my pw?",
    port: 50001,
    database: "CMS"
  });

  conn.connect( err => {
    if (err) throw err;
  });

  return new Promise(resolve => {

    conn.query(q, (err, result) => {
      if (err) throw err;
      resolve(result);
    });

    conn.end();

  });
}

async function getColumns() {

  const tables = require("./tableNames").tableNames;

  fields = {};

  for(var i = 0, len = tables.length; i < len; i++) {

    const table = tables[i];
    const cols = await columns(table);
    fields[table] = cols;
  }
  
  return fields;
}

module.exports.getColumns = getColumns;
