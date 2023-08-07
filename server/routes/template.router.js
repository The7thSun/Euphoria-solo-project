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
router.get('/favorites', (req, res) => {
  // GET route code 
  console.log('inside of /favorites GET router side');
  let userId = req.user.id
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
JOIN "favorites" ON "strain"."id" = "favorites"."strain_id" WHERE "favorites"."user_id" = $1
GROUP BY "strain"."strain_name", "strain"."image", "strain"."description", "strain"."id";`
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

//Post Route
router.post('/',rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('inside of Euphoria post for notes', req.body);
  let userId = req.user.id
  let description_notes = req.body.description_notes
  let feelings_notes = req.body.feelings_notes
  //todo strain id imput 

  //query notes for data fields and sql injection 
  const queryText = `INSERT INTO "notes" (description_notes, feelings_notes, userId)
  VALUES ($1, $2, $3)`
  //redeclaring our data fields 
  const queryParams = [description_notes, feelings_notes, userId]
  //bringing in the pool 
  pool.query(queryText, queryParams)
    .then((result) => {
      console.log('post request sent result is', req.body);
      //send ok status 
      res.sendStatus(201)
    }).catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500)
    })
});

//Delete Route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  //replace id with req.params when you start your client side delete
  let idToDelete = 1
  console.log('ID to delete is :', idToDelete);
  //query text to delete a strain by id and protect against sql injection 
  let queryText = `DELETE FROM "strain" WHERE id = $1;`
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

//Put Route 
router.put('/:id', rejectUnauthenticated, (req, res) => {
  let userId = req.user.id
  let strainId = req.params.strainId
  let updatedLikeStatus = req.body.like
  //query text to update strains like status and sql injection 
  let queryText = `UPDATE "favorites" SET "like_status" = TRUE WHERE "user_id" = \$1 AND "strain_id" = \$2 AND "like_status" = \$3;`;
  const queryValues = [updatedLikeStatus, userId, strainId];
  //bringing in pool 
  pool.query(queryText, queryValues)
    .then(() => {
      console.log('inside of put request updated like status is:', req.body);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating favorite:', error);
      res.sendStatus(500);
    });
});


module.exports = router;
