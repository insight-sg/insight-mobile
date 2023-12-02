import client from './client';

export const formatFrontBackFromOpenAI = async (text_chunk: []) => {
  try {
    const result = await client.post('/api/generateflashcard', {
      text_chunk,
    });

    if (result.status === 200) {
      console.log('result.data : ', result.data.data);
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const formatQuestionAnswerFromOpenAI = async (text_chunk: []) => {
  try {
    const result = await client.post('/api/generatequiz', {
      text_chunk,
    });

    if (result.status === 200) {
      console.log('result.data : ', result.data.data);
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};