import request from "supertest";
import app from "../app";

describe("GET /authors", () => {
  it("should return list of all authors", async () => {
    const response = await request(app).get("/authors");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should return details of the given author", async () => {
    const response = await request(app).get("/authors/4");
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();
    expect(response.body.data).toHaveProperty("id");
  });
});
