# Google Ads Remover – Browser Extension

A lightweight browser extension that removes ads from Google Search results in real-time.

## Features

- Automatically detects and removes:
  - Text ads (`data-text-ad`)
  - Visual snippets (`data-aavs`)
  - Top ad slots (`data-ta-slot`)
  - Video carousel ads (`div.vdQmEd` under `data-hveid`)
- Runs continuously with a `MutationObserver` to remove dynamically loaded ads

---

## Installation

### As a Browser Extension

#### Chrome / Edge

1. Clone or download this repository.
2. Go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle at top-right).
4. Click **Load unpacked**.
5. Select the extension folder.

**Or install from the Chrome Web Store:**

[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/placeholder)

#### Firefox

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` file inside the extension folder.

**Or install from the Firefox Add-ons Store:**

[Install from Firefox Add-ons](https://addons.mozilla.org/firefox/addon/placeholder)

---

## Usage as Tampermonkey / Violentmonkey Userscript (Untested)

You can try using the script as a userscript in Tampermonkey or Violentmonkey, but note that this method **has not been tested** and might not work as expected.

```javascript
// ==UserScript==
// @name         Google Ads Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes text and visual ads from Google search results
// @author       You
// @match        *://www.google.com/search*
// @grant        none
// ==/UserScript==

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
```

To use:

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) browser extension.
2. Create a new userscript and paste the code above.
3. Save and navigate to a Google Search results page.

---

## File Structure (for the extension)

```
google-ads-remover-extension/
├── manifest.json
├── content.js
└── README.md
```

---

### Example `manifest.json` for Chrome/Edge (Manifest v3)

```json
{
  "manifest_version": 3,
  "name": "Google Ads Remover",
  "version": "1.0",
  "description": "Removes ads from Google search results.",
  "permissions": [],
  "content_scripts": [
    {
      "matches": ["*://www.google.com/search*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

---

## License

MIT License

---

> **Disclaimer:** This project is for educational and personal use only. Removing ads may violate the terms of service of certain websites. Use at your own risk.
