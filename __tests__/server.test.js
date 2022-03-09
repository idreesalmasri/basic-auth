'use strict';
const server = require('../server.js');
const supertest = require('supertest');
const request = supertest(server.app);
const {db}=require("../auth/models/index");

beforeAll( async () =>{
    await db.sync();
})
//after the test done drop the cinnect whoth pg sql server if i dont do that error happen in the test say timeout
afterAll( async () =>{
    await db.drop();
})
describe('testing the homeroute',()=>{
    it('testing 404 bad route',async()=>{
        const response = await request.get('/wrongpath');
        expect(response.status).toBe(404) 
    })
    it('testing 404',async()=>{
        const response = await request.post('/');
        expect(response.status).toBe(404) 
    })
});

describe("testing the routes",()=>{
it("test signup",async()=>{
    const response=await request.post("/signup").send({
        "username":"test",
        "password":"test"
    })
    expect(response.status).toEqual(201);
})
it("test signin insert valid username and password",async()=>{
    
    const response=await request.post("/signin").auth('test','test');
    expect(response.status).toEqual(200);
})
it("test signin insert invalid password",async()=>{
    
    const response=await request.post("/signin").auth('test','wrongPassword');
    expect(response.status).toEqual(500);
})
// it("test signin insert invalid username",async()=>{
    
//     const response=await request.post("/signin").auth('wrongUsername','test');
//     expect(response.status).toBe(500);
// })
})
