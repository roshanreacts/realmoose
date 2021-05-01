import { Schema, Model } from "../index";

const CarSchema = Schema({
  make: { type: "string" },
  model: { type: "string", indexed: true, unique: true },
  miles: { type: "int", default: 0 },
  available: { type: "boolean" },
});

const CarModel = Model("Car", CarSchema, 0);
export default CarModel;
