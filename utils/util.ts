import axios from 'axios';

export const getWords = async () => {
    try {
      const res = await axios.get(`https://dictionary-api-two.vercel.app/api/words`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };