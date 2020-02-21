const {Router} = require('express')
const {teamController} = require('../controllers')

const router = Router()

/**
 * @apiName get all team
 * @api {GET} /api/v1/team Get all team
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
      "data": [
         {
            "playersId": [],
            "playersCount": 0,
            "managerId": null,
            "_id": "5e4e6e721894220189079b67",
            "title": "first team",
            "createdAt": "2020-02-20T11:33:06.575Z",
            "updatedAt": "2020-02-20T11:33:06.575Z",
            "__v": 0
         }
      ]
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
   "code": 409,
   "message": "Conflict. Data already exist",
   "body": {}
 * }
 */
router.get('/', teamController.getAllTeams)

/**
 * @apiName create team
 * @api {POST} /api/v1/team Create team
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} title title
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X POST
 * -d {"title": "some title"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
      "data": {
         "playersId": [],
         "playersCount": 0,
         "managerId": null,
         "_id": "5e4e6e721894220189079b67",
         "title": "first team",
         "createdAt": "2020-02-20T11:33:06.575Z",
         "updatedAt": "2020-02-20T11:33:06.575Z",
         "__v": 0
      }
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
      "code": 409,
      "message": "Conflict. Data already exist",
      "body": {}
 * }
 */
router.post('/', teamController.createTeam)

/**
 * @apiName request adding player to team
 * @api {POST} /api/v1/team/requestToTeam Request adding player to team
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} title title
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team/requestToTeam'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X POST
 * -d {"title": "some title"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
      "data": {
         "playersId": ["5e4e5e721894320189079b61"],
         "playersCount": 1,
         "managerId": "5e4e6e721894320189079b62",
         "_id": "5e4e6e721894220189079b67",
         "title": "first team",
         "createdAt": "2020-02-20T11:33:06.575Z",
         "updatedAt": "2020-02-20T11:33:06.575Z",
         "__v": 0
      }
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
      "code": 409,
      "message": "Conflict. Data already exist",
      "body": {}
 * }
 */
router.post('/requestToTeam', teamController.requestToTeam)

// router.get('/approveUserToTeam', teamController.approveUserToTeam)

/**
 * @apiName get players by team
 * @api {GET} /api/v1/team/players Get players by team
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team/players'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
     "data": [
     {
          "confirmed": false,
          "team": "5e4f9c99429f9442a2042060",
          "role": "player",
          "blocked": false,
          "_id": "5e4fbc7acbedfd181495260e",
          "email": "some-email_player@gmail.com",
          "name": "player",
          "password": "some-pass",
          "accessToken": "some-token",
          "createdAt": "2020-02-21T11:18:18.950Z",
          "updatedAt": "2020-02-21T14:11:50.880Z",
          "__v": 0
     },
     ]
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 404,
    "message": "Information not found",
    "body": {}
 * }
 */
router.get('/players', teamController.getPlayersByTeam)

/**
 * @apiName add manager to team
 * @api {POST} /api/v1/team/addManagerToTeam Add manager to team
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} title title
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team/addManagerToTeam'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X POST
 * -d {"title": "some title"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
      "data": {
         "playersId": [],
         "playersCount": 0,
         "managerId": "5e4e6e721894320189079b62",
         "_id": "5e4e6e721894220189079b67",
         "title": "first team",
         "createdAt": "2020-02-20T11:33:06.575Z",
         "updatedAt": "2020-02-20T11:33:06.575Z",
         "__v": 0
      }
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
      "code": 409,
      "message": "Conflict. Data already exist",
      "body": {}
 * }
 */
router.post('/addManagerToTeam', teamController.addManagerToTeam)

/**
 * @apiName get team by id
 * @api {GET} /api/v1/team/:id Get team by id
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} id team id
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team/5e4e6e721894220189079b67'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
      "data": {
         "playersId": [],
         "playersCount": 0,
         "managerId": null,
         "_id": "5e4e6e721894220189079b67",
         "title": "first team",
         "createdAt": "2020-02-20T11:33:06.575Z",
         "updatedAt": "2020-02-20T11:33:06.575Z",
         "__v": 0
      }
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
   "code": 409,
   "message": "Conflict. Data already exist",
   "body": {}
 * }
 */
router.get('/:id', teamController.getTeamById)

/**
 * @apiName remove team by id
 * @api {DELETE} /api/v1/team/:id Delete team by id
 * @apiVersion 0.0.1
 * @apiGroup team
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} id team id
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/team/5e4e6e721894220189079b67'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X DELETE
 *
 * @apiSuccessExample {json} Success-Response:
 * {
   "data": {
      "playersId": [],
      "playersCount": 0,
      "managerId": null,
      "_id": "5e4e6e721894220189079b67",
      "title": "first team",
      "createdAt": "2020-02-20T11:33:06.575Z",
      "updatedAt": "2020-02-20T11:33:06.575Z",
      "__v": 0
   },
   "message": "Team has been deleted"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
      "code": 400,
      "message": "Sent data is not valid",
      "body": {}
 * }
 */
router.delete('/:id', teamController.deleteTeamById)

module.exports = router
