import _ from "lodash";
import { ObjectID } from "bson";

interface Realm {
    write(callback: Function): void;
    create(namne: string, schemaObj: any): void;
    objects(): { filtered: Function };
    delete(): void;
}

class Realm {
    constructor() { }
}
Realm.prototype.write = (callback) => {
    callback();
};

Realm.prototype.create = (name, schemaObj) => {
    return schemaObj;
};

Realm.prototype.delete = () => {
    return true;
};

Realm.prototype.objects = () => {
    return { filtered: filtered };
};

const filtered = (
    args: string,
    args2: string,
    args3: string,
    args4: string
) => {

    const val =
        typeof args2 === "object"
            ? ObjectID.isValid(args2)
                ? new ObjectID(args2).toString()
                : args2[0]
            : args2;

    const arr = [
        {
            _id: "5fd371f50606aa3727985e2b",
            make: "BWM",
            model: "Good2",
            miles: 200,
        },
        {
            _id: "5fd3723172bf3a454d019f40",
            make: "BWM",
            model: "Good2",
            miles: 200,
        },
    ];
    const querySplit = args.split("=");

    // Filter the array and return mock data
    return _.filter(arr, [querySplit[0].trim(), val]).map((item) => {
        const method = {
            toJSON: function () {
                return this;
            }
        }
        return Object.assign(item, method);
    });
};

export default Realm;
