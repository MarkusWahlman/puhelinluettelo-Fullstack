import mongoose, { Schema, Model, Document } from "mongoose";

const url: string = process.env.MONGODB_URI;

if (!url) {
  throw new Error("MONGODB_URI is not defined in env variables.");
}

mongoose.connect(url).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

type Person = {
  name: string;
  number: string;
};

const personSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v: string): boolean {
        return /^(\d{2,3})-(\d{5,})$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person: Model<Person> = mongoose.model<Person>("Person", personSchema);

export { Person };
