"use strict";
const request = require("supertest");
const app = require("../app");


const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /auth/token", function () {
    test("works", async function () {
        const resp = await request(app).post("/auth/token").send({
            username: "testuser",
            password: "123123123",
        });
        expect(200);
    });
});

test("unauth if no such user", async function () {
    const resp = await request(app).post("/auth/token").send({
        username: "noUser",
        password: "shouldntmatter",
    });
    expect(401);
});

test("unauth if wrong password", async function () {
    const resp = await request(app).post("/auth/token").send({
        username: "jdoe",
        password: "wrong",
    });
    expect(401);
});

test("bad request with missing data", async function () {
    const resp = await request(app).post("/auth/token").send({
        username: "jdoe",
    });
    expect(resp.statusCode).toEqual(400);
});



test("bad request with invalid data", async function () {
    const resp = await request(app).post("/auth/token").send({
        username: 42,
        password: "password",
    });
    expect(resp.statusCode).toEqual(400);
});



describe("POST /auth/register", function () {
    test("works", async function () {
        const resp = await request(app).post("/auth/register").send({
            username: "newUser",
            password: "password",
            firstName: "Test",
            lastName: "User",
            email: "testUser@email.com",
            city: "San Mateo",
            state: "CA",
            country: "USA",
            zipCode: 94010,
            latitude: 37.555,
            longitude: -122.323,
            hobbies: "hiking",
            interests: "music",
        });
        // console.log(resp.body);
        expect(201);
    });
});