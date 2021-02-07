"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
// jest.unmock("realm");
index_1.default.Promise = global.Promise;
index_1.default.path = "finq.realm";
var engineSchema = index_1.default.Schema({
    name: "Engine",
    properties: {
        type: { type: "string" },
        origin: { type: "string" },
        year: { type: "int" },
    },
});
var carSchema = index_1.default.Schema({
    name: "Car",
    properties: {
        make: { type: "string" },
        model: { type: "string", indexed: true, unique: true },
        miles: { type: "int", default: 0 },
        engine: "Engine",
    },
});
var CarModel = index_1.default.Model(carSchema);
describe("should test CRUD", function () {
    it("should get schema", function () {
        var car = carSchema;
        console.log(carSchema);
        expect(car.schema).toBeDefined();
    });
    it("should get model", function () {
        console.log(CarModel);
        var newCar = CarModel({ make: "BMW", model: "Sedan", miles: 1000 });
        console.log(newCar);
        expect(CarModel).toBeDefined();
    });
});
