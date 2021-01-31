"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
// jest.unmock("realm");
var carSchema = new index_1.Schema({
    name: "Car",
    properties: {
        make: { type: "string" },
        model: { type: "string", indexed: true, unique: true },
        miles: { type: "int", default: 0 },
    },
});
var carModel = new index_1.Model(carSchema, "finq.realm", 4);
describe("should test CRUD", function () {
    it("should get schema", function () {
        var car = carModel;
        expect(car.schema).toBeDefined();
    });
    it("should create rec for model", function () {
        var newCarSchema = { make: "BWM", model: "Good4" };
        var newCar = carModel.create(newCarSchema);
        expect(newCar.model).toBe(newCarSchema.model);
    });
    it("should find doc by id", function () {
        var id = "5fd371f50606aa3727985e2b";
        var getCar = carModel.findById(id);
        expect(getCar.model).toBe("Good2");
    });
    it("should find one doc", function () {
        var getCar = carModel.findOne("model == $0", "Good2");
        expect(getCar.model).toBe("Good2");
    });
    it("should find all doc", function () {
        var getCar = carModel.find("model == $0", ["Good2", "Good3"]);
        expect(getCar.length).toBeGreaterThan(1);
    });
    it("should validate the schema", function () {
        var newCarSchema = { make: "BWM", model: "Good3", miles: 200 };
        var valid = carModel.validate(newCarSchema);
        expect(valid).toBe(true);
    });
    it("should update the object", function () {
        var id = "5fd371f50606aa3727985e2b";
        var getByIdandUpdate = carModel.findByIdAndUpdate(id, { model: "Good 5", miles: 1000 });
        expect(getByIdandUpdate.model).toBe("Good 5");
    });
    it("should delete the record", function () {
        var id = "5fd371f50606aa3727985e2b";
        var deleteById = carModel.deleteById(id);
        expect(deleteById).toBeTruthy();
    });
    it("should find and delete one record", function () {
        var deleteOne = carModel.deleteOne("model == $0", "Good2");
        expect(deleteOne).toBeTruthy();
    });
    it("should find and delete all matching records", function () {
        var deleteAll = carModel.deleteOne("model == $0", "Good2");
        expect(deleteAll).toBeTruthy();
    });
    it("should have recOptions on retrurn obj", function () {
        var id = "5fd371f50606aa3727985e2b";
        var getCar = carModel.findById(id);
        expect(getCar.update).toBeDefined();
    });
});
