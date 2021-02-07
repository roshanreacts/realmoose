import realmoose from "../index";
import CarModel from "./sampleModel.mock";

realmoose.connect("test.realm");

describe("should create a connect", () => {
  it("should create connect", () => {
    const newCar = { make: "BMW", model: "V5", miles: 120 };
    const newModel = CarModel.create(newCar);
    console.log(newModel);
    expect(newModel.make).toBe(newCar.make);
  });
});
