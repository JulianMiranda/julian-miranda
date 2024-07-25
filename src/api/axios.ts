import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros',
  headers: {
    'Content-Type': 'application/json',
    authorId: '123456',
  },
});

export default instance;
