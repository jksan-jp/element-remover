document.getElementById('removeElementButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: removeElements
      });
    });
  });
  
  function removeElements() {
    const selectors = [
      'body > div.logged-in.env-production.page-responsive.height-full.d-flex.flex-column > div.position-relative.js-header-wrapper > header'
      ,"#memex-root > div.BaseStyles__Base-sc-nfjs56-0.dTpwHV > div.Box-sc-g0xbh4-0.jsQPBQ > div > div > main > div.Box-sc-g0xbh4-0.hlUAHL > div > div.Box-sc-g0xbh4-0.cUuqYa",
      "#memex-project-view-root > div.Box-sc-g0xbh4-0.cMngVv",
      "#project-view\\:\\:rc\\: > div.Box-sc-g0xbh4-0.jlZOsF"
    ];
    selectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    });
  }
