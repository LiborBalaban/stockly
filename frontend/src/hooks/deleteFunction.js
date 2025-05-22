import { useState } from 'react';
import axios from 'axios';

const useDeleteData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(url, { withCredentials: true,
        headers: {
              Authorization: `Bearer ${token}`,
          },
       });
      console.log('Úspěšně smazáno:', response);
      alert(response.data.message);
      return response.data;
    } catch (err) {
      console.error('Chyba při odesílání:', err);
      setError(err.message || 'Něco se pokazilo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;