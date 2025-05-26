(function() {
  const selectors = '[data-text-ad="1"], [data-aavs], [data-ta-slot], div[data-hveid] div.vdQmEd';
  
  const remove = () => document.querySelectorAll(selectors).forEach(el => el.remove());
  
  const observer = new MutationObserver(() => remove());
  
  const init = () => {
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
      remove();
    } else {
      requestAnimationFrame(init);
    }
  };
  
  init();
  

})();