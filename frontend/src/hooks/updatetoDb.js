import axios from 'axios';

export const updateData = async (url, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(url, formData, { withCredentials: true,
      headers: {
              Authorization: `Bearer ${token}`,
          },
     });
    console.log('Úspěšně odesláno:', response.data.message);
    //alert(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Chyba při odesílání:', error);
    throw error; // Optional: rethrow the error if you want to handle it higher up
  }
};
