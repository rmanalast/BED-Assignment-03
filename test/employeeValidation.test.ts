import request from "supertest";
import app from "../src/app";
import { employeeSchema } from "../src/api/v1/schemas/employeeSchema";

describe("Employee Validation", () => {
  it("should pass validation for a valid employee", () => {
    const validEmployee = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchId: "1",
    };

    const { error } = employeeSchema.validate(validEmployee);
    expect(error).toBeUndefined();
  });

  it("should fail validation for missing required fields", () => {
    const invalidEmployee = {
      id: "",
      name: "",
      position: "",
      department: "",
      email: "invalid-email",
      phone: "abc123",
      branchId: 123,
    };

    const { error } = employeeSchema.validate(invalidEmployee);
    expect(error).toBeDefined();
    expect(error?.details.length).toBeGreaterThan(0);
  });

  it("should return 400 for invalid employee data", async () => {
    const response = await request(app).post("/api/v1/employees").send({
      id: "",
      name: "",
      position: "",
      department: "",
      email: "not-an-email",
      phone: "abc123",
      branchId: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
