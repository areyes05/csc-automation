const types = ["d", "h"];
const tables = [ "agent", "split", "vdn" ];

let tableNames = [];

types.forEach(type => {
  tables.forEach(table => {

    tableNames.push( `${type}${table}` );
  });
});

module.exports.tableNames = tableNames;
