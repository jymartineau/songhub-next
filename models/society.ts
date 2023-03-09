import mongoose from 'mongoose';

const societySchema = new mongoose.Schema({
  group: String,
  name: String,
});

const Society = mongoose.models.Society || mongoose.model('Society', societySchema);

export default Society;