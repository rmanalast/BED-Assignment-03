import request from "supertest";
import app from "../src/app";
import { branchSchema } from "../src/api/v1/schemas/branchSchema";

describe("Branch Validation", () => {
  it("should pass validation for a valid branch", () => {
    const validBranch = {
      id: "1",
      name: "Vancouver Branch",
      address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
      phone: "604-456-0022"
    };

    const { error } = branchSchema.validate(validBranch);
    expect(error).toBeUndefined();
  });

  it("should fail validation for missing required fields", () => {
    const invalidBranch = {
      id: "",
      name: "",
      address: "Short",
      phone: "abc123",
    };

    const { error } = branchSchema.validate(invalidBranch);
    expect(error).toBeDefined();
    expect(error?.details.length).toBeGreaterThan(0);
  });

  it("should return 400 for invalid branch data", async () => {
    const response = await request(app).post("/api/v1/branches").send({
      id: "",
      name: "",
      address: "Short",
      phone: "wrong-number",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
