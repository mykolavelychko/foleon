import axios from 'axios';

const API_URL = 'https://api.foleon.com/oauth';
// FIXME: remove hardcoded credentials
// const CLIENT_ID = 'eVOfzXYAzz';
// const CLIENT_SECRET = 'f467185f0e8ed5c8125929c1d5fbedc15bd9f60b413f7d8629fad65b3ffa7ad5';
const CLIENT_ID = 'b4xfRRj0xL';
const CLIENT_SECRET = 'cb9c3aa77a15392f3bb4455d0194b07dc2953694485ed5ba844743323578ffeb';

interface AuthResponse {
  access_token: string;
}

export const authenticate = async (): Promise<string> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    });

    const { access_token } = response.data;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    console.log('Authentication successful');
    return access_token;
  } catch (error) {
    console.error('Authentication failed', error);
    throw error;
  }
};