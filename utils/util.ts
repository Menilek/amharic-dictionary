import axios from 'axios';

export const getWords = async () => {
    try {
      const res = await axios.get(`https://dictionary-api-two.vercel.app/api/words`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
};

// https://dictionary-api-two.vercel.app/api/csv
// http://localhost:3000/api/csv
export const submitWords = async (words: unknown) => {
  try {
    const result = await fetch('https://dictionary-api-two.vercel.app/api/csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(words),
    })
    return result.status === 200;
  } catch (err) {
    console.error(err);
    return err;
  }
};
