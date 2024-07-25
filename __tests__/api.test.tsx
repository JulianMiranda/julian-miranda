import MockAdapter from 'axios-mock-adapter';
import instance from '../src/api/axios';

describe('Axios Instance', () => {
  it('should be configured with the correct baseURL and headers', () => {
    expect(instance.defaults.baseURL).toBe(
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros',
    );
    expect(instance.defaults.headers['Content-Type']).toBe('application/json');
    expect(instance.defaults.headers.authorId).toBe('123456');
  });

  it('should make a GET request and return data', async () => {
    const mock = new MockAdapter(instance);
    const data = {response: true};

    mock.onGet('/test-endpoint').reply(200, data);

    const response = await instance.get('/test-endpoint');

    expect(response.status).toBe(200);
    expect(response.data).toEqual(data);
  });

  it('should handle errors correctly', async () => {
    const mock = new MockAdapter(instance);
    const errorMessage = 'Network Error';

    mock.onGet('/error-endpoint').networkError();

    await instance.get('/error-endpoint').catch(error => {
      expect(error.message).toBe(errorMessage);
    });
  });
});
