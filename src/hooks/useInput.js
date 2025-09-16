import { useState, useEffect } from 'react';

const useInput = (initialValue = '', submitting, validatePass, parse) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!value && submitting) {
      setError('This Field is required!');
    } else if (!validatePass) {
      setError('');
    }
    // eslint-disable-next-line
  }, [submitting, value]);

  const onChange = (e) => {
    setValue(!parse ? e.target.value : parse(e.target.value));
  };

  return {
    value,
    error,
    onChange,
    setError,
    setValue,
  };
};

export default useInput;
