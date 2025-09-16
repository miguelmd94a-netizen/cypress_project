const { useEffect } = require('react');

const useGoogleTranslate = () => {
  const googleTranslateElementInit = () => {
    window.google.translate.TranslateElement(
      { pageLanguage: 'en', layout: window.google.translate.TranslateElement },
      'google_translate_element'
    );
  };

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
};

export default useGoogleTranslate;
