"use strict";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const User = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    adminToken,
    getUserToken,
    userIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

// describe("POST /users", function() {
//     test("works for admins: create non-admin", async function() {
//         const resp = await request(app)
//             .post("/users")
//             .send({
//                 username: "u-new",
//                 firstName: "First-new",
//                 lastName: "Last-newL",
//                 email: "new@email.com",
//                 password: "password-new",
//                 city: "SF",
//                 state: "CA",
//                 country: "US",
//                 zipCode: 94110,
//                 latitude: "000000",
//                 longitude: "000000",
//                 interests: "hiking",
//                 hobbies: "swimming",
//                 isAdmin: false,
//             })
//             .set("authorization", `Bearer ${adminToken}`);
//         expect(201);
//     });
// });

// test("works for admins: create admin", async function () {
//   const res = await request(app)
//     .post("/users")
//     .send({
//       username: "u-new",
//       firstName: "First-new",
//       lastName: "Last-newL",
//       password: "password-new",
//       email: "new@email.com",
//       city: "SF",
//       state: "CA",
//       country: "US",
//       zipCode: 94110,
//       isAdmin: true,
//     })
//     .set("authorization", `Bearer ${adminToken}`);
//   expect(201);
//   expect(res.body).toEqual({
//     user: {
//       username: "u-new",
//       firstName: "First-new",
//       lastName: "Last-newL",
//       password: "password-new",
//       email: "new@email.com",
//       city: "SF",
//       state: "CA",
//       country: "US",
//       zipCode: 94110,
//     },
//     token: expect.any(String),
//   });
//   expect(201);
// });

test("unauth for non-admins", async function() {
    const resp = await request(app).post("/users").send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "new@email.com",
        isAdmin: true,
    });
    expect(401);
});

test("bad request with missing data", async function() {
    const resp = await request(app).post("/users").send({
        username: "u-new",
    });
    expect(400);
});

test("bad request with invalid data", async function() {
    const resp = await request(app)
        .post("/users")
        .send({
            username: "u-new",
            firstName: "First-new",
            lastName: "Last-newL",
            password: "password-new",
            email: "not-an-email",
            isAdmin: true,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(400);
});


/************************************** GET /users */
//Reconfigure this test
// describe("GET /users", function() {
//     test("works for admins", async function() {
//         const resp = await request(app)
//             .get("/users")
//             .set("authorization", `Bearer ${adminToken}`);
//         expect(resp.body).toEqual({
//             users: [{
//                     username: "admin",
//                     firstName: "Admin",
//                     lastName: "Istrator",
//                     email: "admin@admin.com",
//                     city: "SF",
//                     state: "CA",
//                     country: "US",
//                     zipCode: 94110,
//                     latitude: "000000",
//                     longitude: "000000",
//                     interests: "hiking",
//                     hobbies: "swimming",
//                     isAdmin: true,
//                 },
//                 {
//                     username: "u1",
//                     firstName: "U1F",
//                     lastName: "U1L",
//                     email: "user1@email.com",
//                     city: "SF",
//                     state: "CA",
//                     country: "US",
//                     zipCode: 94110,
//                     latitude: "000000",
//                     longitude: "000000",
//                     interests: "hiking",
//                     hobbies: "swimming",
//                     isAdmin: false,
//                 },
//             ],
//         });
//     });

test("unauth for non-admin users", async function() {
    const resp = await request(app)
        .get("/users")
        .set("authorization", `Bearer ${getUserToken}`);
    expect(401);
});

test("unauth for anon", async function() {
    const resp = await request(app).get("/users");
    expect(401);
});

test("fails: test next() handler", async function() {
    await db.query("DROP TABLE users CASCADE");
    const resp = await request(app)
        .get("/users")
        .set("authorization", `Bearer ${adminToken}`);
    expect(500);
});