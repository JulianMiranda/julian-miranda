import {useState, useEffect} from 'react';
import {useDebounce} from './useDebounce';
import axios from '../api/axios';

export const useVerifyId = (id: string) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debouncedId = useDebounce(id, 500);

  useEffect(() => {
    if (debouncedId) {
      const verifyId = async () => {
        try {
          const response = await axios.get(
            `/bp/products/verification?id=${debouncedId}`,
          );
          setIsAvailable(!response.data);
          setError(null);
        } catch (err) {
          setIsAvailable(null);
          setError('Error verifying ID');
        }
      };

      verifyId();
    } else {
      setIsAvailable(null);
      setError(null);
    }
  }, [debouncedId]);

  return {isAvailable, error};
};
