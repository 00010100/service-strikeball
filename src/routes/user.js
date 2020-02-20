const {Router} = require('express')
const {userController} = require('../controllers')

const router = Router()

/**
 * @apiName get all users
 * @api {GET} /api/v1/user Get all users
 * @apiVersion 0.0.1
 * @apiGroup user
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/user'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": [
      {
        "confirmed": false,
        "team": null,
        "role": "player",
        "_id": "5e4e5d4c8704e5623a74200f",
        "email": "e0001101004+admin@gmail.com",
        "name": "admin",
        "password": "$2b$10$wg4qezO/B2RO34vELqqA5uO1VrCZAs1/Nix7J/CLb8Rk2GXpUOsie",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTkyNjgsImV4cCI6MTU4MjI4NTY2OH0.AnDV0TLQPvilBfX5htTXIQnnsSeZR5GFGwd8zN-RHn8",
        "createdAt": "2020-02-20T10:19:56.699Z",
        "updatedAt": "2020-02-20T11:47:48.361Z",
        "__v": 0
      }
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
router.get('/', userController.getAllUsers)

/**
 * @apiName get user by id
 * @api {GET} /api/v1/user/:id Get user by id
 * @apiVersion 0.0.1
 * @apiGroup user
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} id user id
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/user/5e4e6e721894220189079b67'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "confirmed": false,
        "team": null,
        "role": "player",
        "_id": "5e4e5d4c8704e5623a74200f",
        "email": "e0001101004+admin@gmail.com",
        "name": "admin",
        "password": "$2b$10$wg4qezO/B2RO34vELqqA5uO1VrCZAs1/Nix7J/CLb8Rk2GXpUOsie",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTkyNjgsImV4cCI6MTU4MjI4NTY2OH0.AnDV0TLQPvilBfX5htTXIQnnsSeZR5GFGwd8zN-RHn8",
        "createdAt": "2020-02-20T10:19:56.699Z",
        "updatedAt": "2020-02-20T11:47:48.361Z",
        "__v": 0
    }
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 404,
    "message": "Information not found",
    "body": {}
 * }
 */
router.get('/:id', userController.getUserById)

/**
 * @apiName remove user by id
 * @api {DELETE} /api/v1/user/:id Delete user by id
 * @apiVersion 0.0.1
 * @apiGroup user
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} id user id
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/user/5e4e6e721894220189079b67'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X DELETE
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "confirmed": false,
        "team": null,
        "role": "player",
        "_id": "5e4e5d4c8704e5623a74200f",
        "email": "e0001101004+admin@gmail.com",
        "name": "admin",
        "password": "$2b$10$wg4qezO/B2RO34vELqqA5uO1VrCZAs1/Nix7J/CLb8Rk2GXpUOsie",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTkyNjgsImV4cCI6MTU4MjI4NTY2OH0.AnDV0TLQPvilBfX5htTXIQnnsSeZR5GFGwd8zN-RHn8",
        "createdAt": "2020-02-20T10:19:56.699Z",
        "updatedAt": "2020-02-20T11:47:48.361Z",
        "__v": 0
    },
    "message": "User has been deleted"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 400,
    "message": "Sent data is not valid",
    "body": {}
 * }
 */
router.delete('/:id', userController.deleteUserById)

module.exports = router
