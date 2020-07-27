const db = require('../api/connect');
const helper = require('../api/helper');

// Get canteen entries from the database
const getCanteen = async (req, res) => {
  let data = req.params;
  let stmt = "SELECT * FROM canteen ";
  if (helper.checkEmptyObject(data)) {
    stmt += ";";
  }
  else {
    stmt += `WHERE canteen_id = '${data.canteen_id}';`;
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

// Create a new canteen entry in the database
const createCanteen = async (req, res) => {
  let data = req.body;
  let values = [data.hostel_id, data.time_open, data.time_close];
  let stmt = "INSERT INTO canteen (hostel_id, time_open, time_close) VALUES ($1, $2, $3);";
  let client = await db.connect();
  client
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(201).send({status: 0, message: "New entry created!"}); 
    })
    .catch(error => {
      client.release();
      console.log(error);
    });
}

// Update the canteen profile in the database
const updateCanteen = async (req, res) => {
  let data = req.body;
  let values = [data.canteen_id, data.time_open, data.time_close];
  let stmt = "UPDATE canteen SET time_open = $2, time_close = $3 WHERE canteen_id = $1;";
  client = await db.connect();
  client
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(200).send({ status: 0, message: "Canteen details updated!" });
    })
    .catch(error => {
      client.release();
      console.log(error);
    })
}

// Check if canteen is active
// Acive => Accepting orders
const checkCanteenActive = async (req, res) => {
  let values = [req.params.canteen_id];
  let stmt = "SELECT accepting_orders FROM canteen WHERE canteen_id = $1;";
  let client = await db.connect();
  client
    .query(stmt, values)
    .then(result => {
      client.release();
      console.log(result.rows);
      return res.status(200).send({status: 0, message: (result.rows[0].accepting_orders)});
    })
    .catch(error => {
      client.release();
      console.log(error);
    });
}

// Change canteen status to active 
const makeCanteenActive = async (req, res) => {
  let data = req.body;
  let values = [data.canteen_id];
  let stmt = "UPDATE canteen SET accepting_orders = TRUE WHERE canteen_id = $1;";
  client = await db.connect();
  client 
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(201).send({status: 0, message: "Canteen marked active!"});
    })
    .catch(error => {
      client.release();
      console.log(error);
    })
}

// Change canteen status to inactive 
const makeCanteenInactive = async (req, res) => {
  let data = req.body;
  let values = [data.canteen_id];
  let stmt = "UPDATE canteen SET accepting_orders = FALSE WHERE canteen_id = $1;";
  client = await db.connect();
  client 
    .query(stmt, values)
    .then(result => {
      client.release();
      return res.status(200).send({status: 0, message: "Canteen marked inactive!"});
    })
    .catch(error => {
      client.release();
      console.log(error);
    })
}

exports.getCanteen = getCanteen;
exports.createCanteen = createCanteen;
exports.updateCanteen = updateCanteen;
exports.checkCanteenActive = checkCanteenActive;
exports.makeCanteenActive = makeCanteenActive;
exports.makeCanteenInactive = makeCanteenInactive;
