const db = require('../api/connect');
const helper = require('../api/helper');

const getCanteen = async (req, res) => {
  let stmt = "SELECT * FROM canteen ";
  if (helper.checkEmptyObject(req.params)) {
    stmt += ";";
  }
  else {
    stmt += `WHERE canteen_id = '${req.params.id}';`;
  }
  let client = await db.connect();
  client
    .query(stmt)
    .then(result => {
      client.release();
      return res.status(200).send(result.rows);
    })
    .catch(error => {
      client.release();
      console.log(error);
    });
};

const createCanteen = async (req, res) => {
  let data = req.body;
  let values = [data.hostel_id, data.time_open, data.time_close];
  let stmt = "INSERT INTO canteen (hostel_id, time_open, time_close) VALUES ($1, $2, $3);";
  let client = await db.connect();
  client
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(201).send({message: "New entry created!"}); 
    })
    .catch(error => {
      client.release();
      console.log(error);
    });
}

exports.getCanteen = getCanteen;
exports.createCanteen = createCanteen;