import { QuestionType } from '../constants/Data';
import client from './client';

export const getQuizzesByUserId = async (user_id: number) => {
  try {
    const result = await client.get('/api/subjectquiz/' + user_id);
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
    const result = await client.get('/api/quiz/' + subject_id);
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

export const createQuizBySubjectId = async (
  subject_id: number,
  question: QuestionType[]
) => {
  try {
    const result = await client.post('/api/quiz', {
      subject_id,
      question,
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