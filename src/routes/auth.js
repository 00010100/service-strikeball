const {Router} = require('express')
const {userController} = require('../controllers')

const router = Router()

/**
 * @apiName sign up
 * @api {POST} /api/v1/auth/signUp Registration
 * @apiVersion 0.0.1
 * @apiGroup auth
 * @apiHeader {String} Content-Type=application/json
 *
 * @apiParam {String} email email
 * @apiParam {String{6...}} password password
 * @apiParam {String} [name] name
 * @apiParam {Enum[String]} [role] player | manager | admin
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/signUp'
 * -H "Content-Type: application/json"
 * -X POST
 * -d {"email": "test@test.com", "password": "some-test-password", "name": "some-name"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "confirmed": false,
        "team": null,
        "role": "player",
        "_id": "5e4e5d4c8704e5623a74211f",
        "email": "some-email@mail.com",
        "name": "some-name",
        "password": "$2b$10$wg4qezO/B2RO24vELqqA5uO1VrCZAs1/Nix7J/CLb8Rk2GXpUOsie",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IbxXVCJ9.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTM5OTYsImV4cCI6MTU4MjI4MDM5Nn0.R_Z0e0aG2N84MJcRXdh-7Rk88pmt03ZC1Xg7hx--D_Y",
        "createdAt": "2020-02-20T10:19:56.699Z",
        "updatedAt": "2020-02-20T10:19:56.699Z",
        "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IxpXVCJ8.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTM5OTYsImV4cCI6MTU4MjI4MDM5Nn0.R_Z0e0aG2N84MJcRXdh-7Rk88pmt03ZC1Xg7hx--D_Y"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 409,
    "message": "Conflict. Data already exist",
    "body": {}
 * }
 */
router.post('/signUp', userController.signUp)

/**
 * @apiName login
 * @api {POST} /api/v1/auth/login Login
 * @apiVersion 0.0.1
 * @apiGroup auth
 * @apiHeader {String} Content-Type=application/json
 *
 * @apiParam {String} email email
 * @apiParam {String{6...}} password password
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/login'
 * -H "Content-Type: application/json"
 * -X POST
 * -d {"email": "test@test.com", "password": "some-test-password"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "email": "some-email@test.com",
        "role": "player"
    },
    "accessToken": "eyJhbGciOiJIUzI1NbIsIsR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTRlNWQ0Yzg3MDRlNTYyM2E3NDIwMGYiLCJpYXQiOjE1ODIxOTUxMzUsImV4cCI6MTU4MjI4MTUzNX0.Hg39EqtTj7fcMPvSsQgtIba74DXS3U1hdH9sl7L4xRs"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 404,
    "message": "Information not found",
    "body": {}
 * }
 */
router.post('/login', userController.login)

// router.get('/confirmation/:token', userController.confirmationUserEmail)

module.exports = router
