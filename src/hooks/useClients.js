import { useState, useEffect } from 'react';
import axios from 'axios';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClient = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('/api/clients');
      setClients(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (clientData) => {
    try {
      const response = await axios.post('/api/clients', clientData);
      setClients((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateClient = async (id, clientData) => {
    try {
      const response = await axios.put(`/api/clients/${id}`, clientData);
      setClients((prev) =>
        prev.map((client) => (client.id === id ? response.data : client))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`/api/clients/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients: clients,
    loading,
    error,
    addClient: addClient,
    updateClient: updateClient,
    deleteClient: deleteClient,
    refreshClient: fetchClient,
  };
};
