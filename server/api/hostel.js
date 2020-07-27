const db = require('../api/connect');
const helper = require('../api/helper');

const getHostel = async (req, res) => {
  let data = req.params;
  let stmt = "SELECT * FROM hostel ";
  if (helper.checkEmptyObject(data)) {
    stmt += ";";
  }
  else {
    stmt += `WHERE hostel_number = '${data.hostel_id}';`;
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

const createHostel = async (req, res) => {
  let data = req.body;
  let values = [data.hostel_number, data.hostel_name];
  let stmt = "INSERT INTO hostel (hostel_number, hostel_name) VALUES ($1, $2);";
  let client = await db.connect();
  client
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(201).send({status: 0, message: "New entry created!" });
    })
    .catch(error => {
      client.release();
      console.log(error);
    });
}

exports.getHostel = getHostel;
exports.createHostel = createHostel;
