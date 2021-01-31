import { Schema, Model } from "./index";
// jest.unmock("realm");

const carSchema = new Schema({
    name: "Car",
    properties: {
        make: { type: "string" },
        model: { type: "string", indexed: true, unique: true },
        miles: { type: "int", default: 0 },
    },
});

let carModel = new Model(carSchema, "finq.realm", 4);

type sampleObj = { make: string, model: string, miles?: number };

describe("should test CRUD", () => {
    it("should get schema", () => {
        const car = carModel;
        expect(car.schema).toBeDefined();
    });

    it("should create rec for model", () => {
        const newCarSchema: sampleObj = { make: "BWM", model: "Good4" };
        const newCar: sampleObj = carModel.create(newCarSchema);
        expect(newCar.model).toBe(newCarSchema.model);
    });

    it("should find doc by id", () => {
        const id = "5fd371f50606aa3727985e2b";
        const getCar = carModel.findById(id);
        expect(getCar.model).toBe("Good2");
    });

    it("should find one doc", () => {
        const getCar = carModel.findOne("model == $0", "Good2");
        expect(getCar.model).toBe("Good2");
    });

    it("should find all doc", () => {
        const getCar = carModel.find("model == $0", ["Good2", "Good3"]);
        expect(getCar.length).toBeGreaterThan(1);
    });

    it("should validate the schema", () => {
        const newCarSchema = { make: "BWM", model: "Good3", miles: 200 };
        const valid = carModel.validate(newCarSchema);
        expect(valid).toBe(true);
    });

    it("should update the object", () => {
        const id = "5fd371f50606aa3727985e2b";
        const getByIdandUpdate: any = carModel.findByIdAndUpdate(id, { model: "Good 5", miles: 1000 });
        expect(getByIdandUpdate.model).toBe("Good 5");
    })

    it("should delete the record", () => {
        const id = "5fd371f50606aa3727985e2b";
        const deleteById = carModel.deleteById(id);
        expect(deleteById).toBeTruthy();
    })

    it("should find and delete one record", () => {
        const deleteOne = carModel.deleteOne("model == $0", "Good2");
        expect(deleteOne).toBeTruthy();
    })

    it("should find and delete all matching records", () => {
        const deleteAll = carModel.deleteOne("model == $0", "Good2");
        expect(deleteAll).toBeTruthy();
    })

    it("should have recOptions on retrurn obj", () => {
        const id = "5fd371f50606aa3727985e2b";
        const getCar = carModel.findById(id);
        expect(getCar.update).toBeDefined();
    })
});
