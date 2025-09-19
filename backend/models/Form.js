import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	location: { type: String },
	lookingFor: { type: String },
	message: { type: String },
}, { timestamps: true });

const Form = mongoose.model("Form", formSchema);
export default Form;
