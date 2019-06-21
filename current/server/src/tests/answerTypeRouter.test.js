const assert = require('assert')
require('../db/test-connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/answerTypeRouter')

describe('Answer Type Router', () =>{
    it("should return 200 (GET)", async (next) => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/answerType"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
        next()
    })

    it("should return 200 (POST) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/answerType",
            body: {
                type: "Test"
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
            url: "/answerType"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
       
        assert(res.statusCode == 400)
        next()
    })

    it("should return 200 (PATCH) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/answerType",
            body: {
                id: 1,
                type: "NewTest"
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
            url: "/answerType",
            body: {
                whatId: 3,
                NotAType: "NewTest"
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
            url: "/answerType",
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
            url: "/answerType",
            body: {
                whatId: 3
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
        next()
    })
})