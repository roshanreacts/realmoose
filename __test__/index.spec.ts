import RealmQuery from "realm-query";
import realmoose from "../index";
import CarModel from "./sampleModel.mock";

realmoose.connect({ path: "test.realm" });

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

  it("should find doc by id", function () {
    var id = "5fd371f50606aa3727985e2b";
    var getCar = CarModel.findById(id);
    expect(getCar.model).toBe("Good2");
  });
  it("should find one doc", function () {
    var getCar = CarModel.findOne("model == $0", "Good2");
    expect(getCar.model).toBe("Good2");
  });
  it("should find all doc", function () {
    var getCar = CarModel.find();
    console.log(getCar);
    expect(getCar.length).toBeGreaterThanOrEqual(1);
  });
  it("should validate the schema", function () {
    var newCarSchema = { make: "BWM", model: "Good3", miles: 200 };
    var valid = CarModel.validate(newCarSchema);
    expect(valid).toBe(true);
  });
  it("should update the object", function () {
    var id = "5fd371f50606aa3727985e2b";
    var getByIdandUpdate = CarModel.findByIdAndUpdate(id, {
      model: "Good 5",
      miles: 1000,
    });
    expect(getByIdandUpdate.model).toBe("Good 5");
  });
  it("should delete the record", function () {
    var id = "5fd371f50606aa3727985e2b";
    var deleteById = CarModel.deleteById(id);
    expect(deleteById).toBeTruthy();
  });
  it("should find and delete one record", function () {
    var deleteOne = CarModel.deleteOne("model == $0", "Good2");
    expect(deleteOne).toBeTruthy();
  });
  it("should find and delete all matching records", function () {
    var deleteAll = CarModel.deleteOne("model == $0", "Good2");
    expect(deleteAll).toBeTruthy();
  });
});
