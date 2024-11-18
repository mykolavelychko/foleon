import axios from 'axios';

const AUTH_API = 'https://api.foleon.com/oauth';

interface AuthResponse {
  access_token: string;
}

export const authenticate = async ({login, password}: {login: string, password: string}): Promise<string> => {
  try {
    delete axios.defaults.headers.common['Authorization'];

    const response = await axios.post<AuthResponse>(AUTH_API, {
      client_id: login,
      client_secret: password,
      grant_type: 'client_credentials'
    });

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    throw new Error('Authentication failed. Please check your credentials and try again.');
  }
};