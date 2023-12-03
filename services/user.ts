import client from './client';

export const loginUser = async (username: string, password: string) => {
  try {
    const result = await client.get('/api/loginuser', {
      params: {
        username: username,
        password: password,
      },
    });
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

export const registerUser = async (
  username: string,
  password: string,
  email: string,
  name: string
) => {
  try {
    const result = await client.post('/api/registeruser', {
      username,
      password,
      email,
      name,
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
