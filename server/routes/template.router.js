const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

//Get Route
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code 
  console.log('inside of /Euphoria GET router side');
  let queryText =
    `SELECT 
    "strain"."id",
  "strain"."strain_name",
  "strain"."image",
  "strain"."description",
  STRING_AGG(CASE WHEN "feelings"."type" = 'positive' THEN "feelings"."feelings" END, ', ') AS "positive_feelings",
  STRING_AGG(CASE WHEN "feelings"."type" = 'negative' THEN "feelings"."feelings" END, ', ') AS "negative_feelings"
FROM "strain"
JOIN "strain_feelings" ON "strain"."id" = "strain_feelings"."strain_id"
JOIN "feelings" ON "strain_feelings"."feelings_id" = "feelings"."id"
GROUP BY "strain"."strain_name", "strain"."image", "strain"."description","strain"."id";`
  //bringing in the pool 
  pool.query(queryText)
    .then((result) => {
      //send table row data 
      res.send(result.rows)
    }).catch((err) => {
      //catch error for get 
      console.log('error getting strains router side', err);
      res.sendStatus(500)
    })
});

//get route for user id 
router.get('/favorites', rejectUnauthenticated, (req, res) => {
  // GET route code 
  console.log('inside of /favorites GET router side');
  let userId = req.user.id
  let queryText =
    `SELECT 
    "strain"."id",
  "strain"."strain_name",
  "strain"."image",
  "strain"."description",
  "favorites"."id" AS fav_id,
  "favorites"."notes",
  STRING_AGG(CASE WHEN "feelings"."type" = 'positive' THEN "feelings"."feelings" END, ', ') AS "positive_feelings",
  STRING_AGG(CASE WHEN "feelings"."type" = 'negative' THEN "feelings"."feelings" END, ', ') AS "negative_feelings"
FROM "strain"
JOIN "strain_feelings" ON "strain"."id" = "strain_feelings"."strain_id"
JOIN "feelings" ON "strain_feelings"."feelings_id" = "feelings"."id"
JOIN "favorites" ON "strain"."id" = "favorites"."strain_id" WHERE "favorites"."user_id" = $1
GROUP BY "strain"."strain_name", "strain"."image", "strain"."description", "strain"."id", "favorites"."id";`
  //bringing in the pool 
  pool.query(queryText, [userId])
    .then((result) => {
      //send table row data 
      res.send(result.rows)
    }).catch((err) => {
      //catch error for get 
      console.log('error getting strains router side', err);
      res.sendStatus(500)
    })
});

//Put Route 
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const idToUpdate = req.params.id;
  console.log('req.body is:',req.body );
  console.log('params.id is :', req.params.id);
  const sqlText = `UPDATE favorites SET notes = $1 WHERE id = $2;`
  pool.query(sqlText, [req.body.note, idToUpdate])
    .then((result) => {
      console.log('result is:', result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});


//Delete Route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //replace id with req.params when you start your client side delete
  let idToDelete = req.params.id
  console.log('ID to delete is :', idToDelete);
  //query text to delete a strain by id and protect against sql injection 
  let queryText = `DELETE FROM "favorites" WHERE "strain_id" = $1;`
  //bringing in the pool 
  pool.query(queryText, [idToDelete])
    .then((result) => {
      console.log('strain deleted router side');
      //sending ok status 
      res.sendStatus(200)
    }).catch((err) => {
      console.log('error deleting strain', err);
      res.sendStatus(500)
    })

})

//Post Route 
router.post('/:id', rejectUnauthenticated, (req, res) => {
  let user_id = req.user.id
  let strain_id = req.params.id
  let like_status = req.body.like
  //query text to update strains like status and sql injection 
  let queryText = `INSERT INTO "favorites" (user_id, strain_id, like_status)
  VALUES($1, $2, $3)`
  const queryValues = [user_id, strain_id, like_status  ];
  //bringing in pool 
  pool.query(queryText, queryValues)
    .then(() => {
      console.log('inside of post request updated like status is:', req.body);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating favorite:', error);
      res.sendStatus(500);
    });
});


module.exports = router;
