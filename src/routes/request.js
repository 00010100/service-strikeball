const {Router} = require('express')
const {requestController} = require('../controllers')
const {auth} = require('../middlewares')

const router = Router()

/**
 * @apiName get all requests
 * @api {GET} /api/v1/request Get all requests
 * @apiVersion 0.0.1
 * @apiGroup request
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/request'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": [
        {
            "status": "pending",
            "_id": "5e4fbbf420350d176d29b7ff",
            "title": "want join to team",
            "to": "some-email+manager@gmail.com",
            "teamName": "first team",
            "type": "join",
            "from": "some-email+player@gmail.com",
            "createdAt": "2020-02-21T11:16:04.057Z",
            "updatedAt": "2020-02-21T11:16:04.057Z",
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
router.get('/', requestController.getAll)

/**
 * @apiName create request
 * @api {POST} /api/v1/request Create request
 * @apiVersion 0.0.1
 * @apiGroup request
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {String} title title
 * @apiParam {String} to recipient email
 * @apiParam {String} teamName team title
 * @apiParam {Enum[String]} type join | change | leave
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/request'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X POST
 * -d {"title": "want join to team", "type": "join", "to": "some-email-manager@gmail.com", "teamName": "first team"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "status": "pending",
        "_id": "5e4fbbf420350d176d29b7ff",
        "title": "want join to team",
        "to": "some-email+manager@gmail.com",
        "teamName": "first team",
        "type": "join",
        "from": "some-email+player@gmail.com",
        "createdAt": "2020-02-21T11:16:04.057Z",
        "updatedAt": "2020-02-21T11:16:04.057Z",
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
router.post('/', requestController.create)

/**
 * @apiName get request by id
 * @api {GET} /api/v1/request/:id Get request by id
 * @apiVersion 0.0.1
 * @apiGroup request
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/request/5e4fbbf420350d176d29b7ff'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X GET
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "status": "pending",
        "_id": "5e4fbbf420350d176d29b7ff",
        "title": "want join to team",
        "to": "some-email+manager@gmail.com",
        "teamName": "first team",
        "type": "join",
        "from": "some-email+player@gmail.com",
        "createdAt": "2020-02-21T11:16:04.057Z",
        "updatedAt": "2020-02-21T11:16:04.057Z",
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
router.get('/:id', requestController.getById)

/**
 * @apiName delete request
 * @api {DELETE} /api/v1/request/:id Delete request
 * @apiVersion 0.0.1
 * @apiGroup request
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/request/5e4fbbf420350d176d29b7ff'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X DELETE
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "status": "pending",
        "_id": "5e4fbbf420350d176d29b7ff",
        "title": "want join to team",
        "to": "some-email+manager@gmail.com",
        "teamName": "first team",
        "type": "join",
        "from": "some-email+player@gmail.com",
        "createdAt": "2020-02-21T11:16:04.057Z",
        "updatedAt": "2020-02-21T11:16:04.057Z",
        "__v": 0
    },
    "message": "Request successfully deleted"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 404,
    "message": "Information not found",
    "body": {}
 * }
 */
router.delete('/:id', requestController.cancel)

/**
 * @apiName update request
 * @api {PUT} /api/v1/request/:id Update request
 * @apiVersion 0.0.1
 * @apiGroup request
 * @apiHeader {String} Content-Type=application/json
 * @apiHeader {String} x-access-token=token
 *
 * @apiParam {Enum[String]} status approved | declined
 *
 * @apiExample {curl} Example usage:
 * curl 'http://localhost:5000/api/v1/request/5e4fbcd320350d176d29b7ff'
 * -H "Content-Type: application/json"
 * -H "x-access-token: some token"
 * -X PUT
 * -d {"status": "approved"}
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": null,
    "message": "Request successfully approved"
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * {
    "code": 404,
    "message": "Information not found",
    "body": {}
 * }
 */
router.put('/:id', auth.grantAccess('update', 'request'), requestController.update)

module.exports = router
