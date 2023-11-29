import client from './client';

export const getNotesBySubjectId = async (subject_id: number) => {
  try {
    const result = await client.get('/api/notes/' + subject_id);
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

export const createNotesBySubjectId = async (
  note_title: string,
  subject_id: number,
  file: any
) => {
  try {
    const formData = new FormData();
    formData.append('note_title', note_title);
    formData.append('subject_id', subject_id.toString());
    formData.append('pdfFile', file);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const result = await client.post('/api/notes', formData, config);
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