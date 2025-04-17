import mongoose from 'mongoose';

const ContratSchema = new mongoose.Schema({
  code: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
});

const Contrat = mongoose.model('Contrat', ContratSchema);

export default Contrat;
