import mongoose from 'mongoose';

const ExpertiseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true },
});

const Expertise = mongoose.model('Expertise', ExpertiseSchema);

export default Expertise;
