import axios from 'axios';

export const postData = async (url, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(url, formData, { withCredentials: true, headers: {
              Authorization: `Bearer ${token}`,
          }, });

    console.log('Úspěšně odesláno:', response.data.message);
    //alert(response.data.message)
    return response.data;
  } catch (error) {
    console.error('Chyba při odesílání:', error);
    throw error;
  }
};
