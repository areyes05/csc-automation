const fs = require("fs");
const mysql = require("mysql");
const cm = require("csv-mysql");

// generate the filenames
const d = require("./formatDates").formatDates();
const tables = require("./tableNames").tableNames;

const prePath = '/Users/alex/Desktop/';

var fileNames = [];

// generate fileNames
tables.forEach( table => {

  const fileName = `${d.from} to ${d.to}.${table}.csv`;
  fileNames.push( fileName );
});


// for each filename
fileNames.forEach( file => {

  // if file exists
  fs.access( `${prePath}${file}`, (err) => {


    if(err) console.log(`${file} doesn't exist`);

    if(!err) {
      console.log("Reading");
      enterDb(file);
    }


  });
});

async function enterDb(fileName) {

  const cols = await require("./columnNames").getColumns()
  console.log(cols);
  return;

  const filePath = `${prePath}${fileName}`;

  fs.readFile(filePath, 'utf-8', (err, data) => {

    if(err) throw err;

    const options = { 
      mysql: {
        host: "docker.usc.edu",
        user: "csdatapr",
        password: "csdatapr.What is my pw?",
        port: 50001,
        database: "CMS",
      }, 
      table: 'dagent',
      headers: cols
    };

    //console.log(data)

    cm.import(options, data, (err, rows) => {
      if(err) throw err;
      console.log(rows);
    });
  });

}

/**
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
    console.log("connected");
  });

  return new Promise(resolve => {

    conn.query(q, (err, result) => {
      if (err) throw err;
      resolve(result);
    });

    conn.end();

  });

}
***/
