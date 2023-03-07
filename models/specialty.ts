import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Specialty = mongoose.models.Specialty || mongoose.model('Specialty', specialtySchema);

export default Specialty;