const assert = require('assert')
const sequelize = require('../db/connection')
const httpMocks = require('node-mocks-http')
const routeHandler = require('../routers/evaluationCycleRouter')

describe('Evaluation Cycle Router', () =>{
    it("should return 200 (GET)", () => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/evaluationCycle"
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 200 (POST) ", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluationCycle",
            body: {
                startDate: "01/01/2019",
                endDate: "12/31/2019"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 200)
    })

    it("should return 400 (POST)", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/evaluationCycle",
            body: {
                start_date: "01/01/2019",
                end_date: "31/12/2019"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })

    it("should return 200 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluationCycle",
            body: {
                id: 1,
                startDate: "01/01/2019",
                endDate: "12/31/2019"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)

        assert(res.statusCode == 200)
    })

    it("should return 400 (PATCH) ", () => {
        const req = httpMocks.createRequest({
            method: "PATCH",
            url: "/evaluationCycle",
            body: {
                startDate: "01/01/2019",
                endDate: "12/31/2019"
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })

    it("should return 200 (DELETE) ", () => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/evaluationCycle",
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
            url: "/evaluationCycle",
            body: {
                notAnID: 3
            }
        })
        const res = httpMocks.createResponse()

        routeHandler(req, res)
        
        assert(res.statusCode == 400)
    })
})