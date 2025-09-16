import { useState } from 'react';

const useRadioFilter = (value) => {
  const [radio, setRadio] = useState(value);

  const onChangeRadio = (e) => setRadio(e.target.value);

  return {
    radio,
    onChangeRadio,
    setRadio,
  };
};

export default useRadioFilter;
