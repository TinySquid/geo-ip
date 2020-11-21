const request = require("supertest");
const app = require("../server");

const mockAxios = require("axios");

describe("GET /", () => {
  it("returns status code 200", async () => {
    await request(app).get("/").expect(200);
  });

  it("has correct content type", async () => {
    await request(app).get("/").expect("Content-Type", /json/);
  });

  it("has correct response body", async () => {
    //* Expected output:
    /*
      { success: true, message: "running"}
    */

    await request(app).get("/").expect({ success: true, status: "running" });
  });
});

describe("GET /ip", () => {
  it("returns status code 200", async () => {
    await request(app).get("/ip").expect(200);
  });

  it("has correct content type", async () => {
    await request(app).get("/ip").expect("Content-Type", /json/);
  });

  it("has correct response body", async () => {
    // ip returned will be different so expect any string value for the key
    const res = await request(app).get("/ip");

    expect(res.body).toEqual(
      expect.objectContaining({ success: true, req: expect.any(String) })
    );
  });
});

describe("GET /location", () => {
  beforeAll(() => {
    // Data from thirdparty api endpoint
    mockAxios.get.mockImplementation(() => {
      return {
        data: {
          ip: "8.8.8.8",
          city: "Mountain View",
          state_prov: "California",
          zipcode: "94041",
          timezone: "-8",
          isp: "Level 3 Communications",
          latitude: "37.42290",
          longitude: "-122.08500",
          time_zone: {
            offset: -8,
          },
        },
      };
    });
  });

  it("returns status code 200", async () => {
    await request(app).get("/location?host=8.8.8.8").expect(200);
  });

  it("calls third-party API route", async () => {
    await request(app).get("/location?host=8.8.8.8");

    expect(mockAxios.get).toHaveBeenCalled();
  });

  it("has correct content type", async () => {
    await request(app)
      .get("/location?host=8.8.8.8")
      .expect("Content-Type", /json/);
  });

  it("has correct response body", async () => {
    const res = await request(app).get("/location?host=8.8.8.8");

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        ip: "8.8.8.8",
        location: "Mountain View, California 94041",
        timezone: "UTC -8",
        isp: "Level 3 Communications",
        latlon: ["37.42290", "-122.08500"],
        timestamp: expect.any(Number),
      })
    );
  });

  it("returns status code 400 when missing query param", async () => {
    await request(app).get("/location").expect(400);
  });
});
