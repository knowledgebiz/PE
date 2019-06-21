const assert = require('assert')
require('../db/test-connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/evaluationRouter')

describe('Evaluation Router', () =>{
    it("should return 200 (GET)", async (next) => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/evaluation"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
        next()
    })

    it("should return 200 (POST) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluation",
            body: {
                idWorker: 1,
                idEvaluationModel: 1,
                json: "Test"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 200)
        next()
    })

    it("should return 400 (POST)", async (next) => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluation",
            body: {
                json: "Test"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        assert(res.statusCode == 400)
        next()
    })

    it("should return 200 (PATCH) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluation",
            body: {
                id: 1,
                idWorker: 1,
                idEvaluationModel: 1,
                json: "Test"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
        next()
    })

    it("should return 400 (PATCH) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluation",
            body: {
                json: "Test",
                idWorker: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
        next()
    })

    it("should return 200 (DELETE) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/evaluation",
            query: {
                id: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
        next()
    })

    it("should return 400 (DELETE) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/evaluation",
            body: {
                notAnID: 3
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
        next()
    })
})