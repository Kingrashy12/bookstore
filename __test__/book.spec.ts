import request from "supertest";
import app from "../app";

describe("GET /books", () => {
  it("should return list of books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Books fetched successfully");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return the details given book data", async () => {
    const response = await request(app).get("/books/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id", 1);
  });

  it("should return books by the given author", async () => {
    const response = await request(app).get("/books/author/3");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should return list of books in the given category", async () => {
    const response = await request(app).get("/books/category/5");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Books fetched successfully.");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
