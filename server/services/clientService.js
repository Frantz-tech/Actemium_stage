import { Repository } from '../repository/clientRepository.js';

const createClient = async clientData => {
  return await Repository.createClient(clientData);
};
const getAllClients = async () => {
  return await Repository.getAllClients();
};
const getClientById = async id => {
  return await Repository.getClientById(id);
};
const updateClient = async (id, clientData) => {
  return await Repository.updateClient(id, clientData);
};
const deleteClient = async id => {
  return await Repository.deleteClient(id);
};

export const Service = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
