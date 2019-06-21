const assert = require('assert')
require('../db/test-connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/competencyRouter')

describe('Competency Router', () =>{
    it("should return 200 (GET)", async (next) => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/competency"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
        next()
    })

    it("should return 200 (POST) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/competency",
            body: {
                competency: "Test",
                idAnswerType: 1
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
            url: "/competency"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
       
        assert(res.statusCode == 400)
        next()
    })

    it("should return 200 (PATCH) ", async (next) => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/competency",
            body: {
                id: 1,
                competency: "NewTest",
                idAnswerType: 1
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
            url: "/competency",
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
            url: "/competency",
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
            url: "/competency",
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