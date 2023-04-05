import ky from 'ky';

const client = ky.create({
  prefixUrl: 'http://localhost:3001',
  credentials: 'include'
});

export default client;