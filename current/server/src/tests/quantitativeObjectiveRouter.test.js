const assert = require('assert')
const sequelize = require('../db/connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/quantitativeObjectiveRouter')

describe('Quantitative Objective Router', () =>{
    it("should return 200 (GET)", () => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/objective"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 200 (POST) ", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/objective",
            body: {
                objective: "Test",
                idAnswerType: 1,
                idObjectiveType: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 200)
    })

    it("should return 400 (POST)", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/objective"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
       
        assert(res.statusCode == 400)
    })

    it("should return 200 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/objective",
            body: {
                id: 1,
                objective: "NewTest",
                idAnswerType: 1,
                idObjectiveType: 1
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 400 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/objective",
            body: {
                whatId: 3,
                objective: "NewTest"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })

    it("should return 200 (DELETE) ", () => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/objective",
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
            url: "/objective",
            body: {
                whatId: 3
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })
})