import realmoose from "../index";

const CarSchema = realmoose.Schema({
  make: { type: "string" },
  model: { type: "string", indexed: true, unique: true },
  miles: { type: "int", default: 0 },
});

const CarModel = realmoose.Model("Car", CarSchema, 0);
export default CarModel;
