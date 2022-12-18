import axios from 'axios';

const getAccessToken = async (userCode: string) => {
  const response = await axios(
    `/api/v1/click-up/access-token?client_id=${
      import.meta.env.VITE_CLICKUP_CLIENT_ID
    }&client_secret=${
      import.meta.env.VITE_CLICKUP_CLIENT_SECRET
    }&code=${userCode}`
  );

  return response?.data;
};

export default getAccessToken;
