import { QuestionType } from '../constants/Data';
import intialiseClient from './client';

export const getQuizzesByUserId = async (user_id: number) => {
  try {
    const client = await intialiseClient();

    if (!client) {
      return null;
    }
    const result = await client.get('/api/subjects/quiz/' + user_id);
    if (result.status === 200) {
      console.log('result.status');
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getQuizzesBySubjectId = async (subject_id: number) => {
  try {
    const client = await intialiseClient();

    if (!client) {
      return null;
    }
    const result = await client.get('/api/quiz/' + subject_id);
    if (result.status === 200) {
      console.log('result.status', result.data);
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getQuestionByQuizId = async (quiz_id: number) => {
  try {
    const client = await intialiseClient();

    if (!client) {
      return null;
    }
    const result = await client.get('/api/question/' + quiz_id);
    if (result.status === 200) {
      console.log('result.status', result.data);
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const createQuizBySubjectId = async (
  subject_id: number,
  quiz_title: string,
  quiz: []
) => {
  try {
    const client = await intialiseClient();

    if (!client) {
      return null;
    }
    const result = await client.post('/api/quiz', {
      subject_id,
      quiz_title,
      quiz,
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

export const updateQuizScoreByQuizId = async (
  quiz_id: number,
  quiz_score: number
) => {
  try {
    const client = await intialiseClient();

    if (!client) {
      return null;
    }
    const result = await client.post('/api/quizscore', {
      quiz_id,
      quiz_score,
    });
    console.log('[updateQuizScoreByQuizId] result :', result);
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
