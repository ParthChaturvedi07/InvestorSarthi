import Form from "../models/Form.js";

export const createForm = async (req, res) => {
  try {
    const { name, phone, email, location, lookingFor, message } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ error: "Name, phone, and email are required." });
    }
    const form = new Form({
      name,
      phone,
      email,
      location,
      lookingFor,
      message,
    });
    await form.save();
    res
      .status(201)
      .json({ message: "Form submitted successfully.", response: form });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit form." });
  }
};
