import RealmQuery from "realm-query";
import realmoose from "../index";
import CarModel from "./sampleModel.mock";

realmoose.connect("test.realm");

describe("should create a connect", () => {
  it("should validate obj", () => {
    const newCar = { make: "BMW", model: "V5", miles: 120 };
    const newModel = CarModel.validate(newCar);
    expect(newModel).toBeTruthy();
  });
  it("should fail to validate obj", () => {
    try {
      const newCar = { make: "BMW", model: "Good2", miles: 120 };
      const newModel = CarModel.validate(newCar);
      expect(newModel).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("should create connect", () => {
    const newCar = { make: "BMW", model: "V5", miles: 120 };
    const newModel = CarModel.create(newCar);
    expect(newModel.make).toBe(newCar.make);
  });

  it("should update Document", () => {
    const newCar = { make: "BMW", model: "V5", miles: 120 };
    let newModel = CarModel.create(newCar);
    newModel.model = "Good3";
    newModel.save();
    expect(newModel.model).toBe("Good3");
  });

  it("should delete Document", () => {
    const newCar = { make: "BMW", model: "V5", miles: 120 };
    let newModel = CarModel.create(newCar);
    const deleteRec = newModel.delete();
    expect(deleteRec).toBeTruthy();
  });

  it("should query model", () => {
    const getCar = CarModel.query();
    expect(getCar).toBeInstanceOf(RealmQuery);
  });
});
