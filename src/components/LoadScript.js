const loadScript = (callback) => {
  const existingScript = document.getElementById('googleTranlate');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.id = 'googleTranlate';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadScript;
