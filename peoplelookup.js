const pg = require('pg');
const settings = require("./settings");
let argName = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((error) => {
  if(error){
    return console.error("Connection Error", error)
  }
  client.query(`SELECT * FROM famous_people
                WHERE first_name
                = '${argName}'
                OR last_name
                = '${argName}'`,
    (error, results) => {
      if(error){
        return console.error("error running query", error);
      }
      console.log('Searching....');
      console.log(`Found 1 person(s) by the name '${argName}'`); //output: 1
      for (var i = 0; i < results.rows.length; i++){
        var birthdate = `${results.rows[i].birthdate.getFullYear()}-${results.rows[i].birthdate.getMonth()}-${results.rows[i].birthdate.getDate()}`;
        console.log(`- ${results.rows[i].id}: ${results.rows[i].first_name} ${results.rows[i].last_name}, born ${birthdate}`);
      }
      client.end();
    }
  );
});
