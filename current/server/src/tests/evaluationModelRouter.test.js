const assert = require('assert')
const sequelize = require('../db/connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/evaluationModelRouter')

describe('Evaluation Model Router', () =>{
    it("should return 200 (GET)", () => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/evaluationModel"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 200 (POST) ", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluationModel",
            body: {
                model: "Test",
                idCycle: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 200)
    })

    it("should return 400 (POST)", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluationModel",
            body: {
                model: "Test"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        assert(res.statusCode == 400)
    })

    it("should return 200 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluationModel",
            body: {
                id: 1,
                model: "Test",
                idCycle: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 400 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluationModel",
            body: {
                model: "Test",
                idCycle: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })

    it("should return 200 (DELETE) ", () => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/evaluationModel",
            query: {
                id: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 400 (DELETE) ", () => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/evaluationModel",
            body: {
                notAnID: 3
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })
})