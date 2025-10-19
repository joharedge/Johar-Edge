import { useState } from 'react';

const styles = `
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.container {
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
  padding: 20px;
}

header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  padding-top: 20px;
}

header h1 {
  font-size: 3.5rem;
  margin-bottom: 10px;
  font-weight: 800;
}

header h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 300;
}

header p {
  font-size: 1rem;
  margin: 5px 0;
  opacity: 0.9;
}

.copyright {
  font-size: 0.9rem;
  margin-top: 10px;
  opacity: 0.8;
}

main {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.card label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.input-box {
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
}

.input-box:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.output-box {
  width: 100%;
  min-height: 120px;
  padding: 15px;
  background: linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%);
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-break: break-all;
  direction: rtl;
}

.arrow {
  text-align: center;
  font-size: 2rem;
  color: white;
  opacity: 0.7;
  margin: 10px 0;
}

.guide {
  max-width: 800px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}

.guide-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.guide-card h3 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.guide-card ul {
  list-style: none;
}

.guide-card li {
  padding: 8px 0;
  color: #333;
  font-size: 0.95rem;
  font-family: 'Noto Sans Masaram Gondi', monospace;
}

footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  padding-bottom: 20px;
  font-size: 0.9rem;
  opacity: 0.8;
}

footer a {
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
}

footer a:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  header h1 {
    font-size: 2rem;
  }

  header h2 {
    font-size: 1.1rem;
  }

  .output-box {
    font-size: 1.8rem;
  }

  .card {
    padding: 15px;
  }

  .guide {
    grid-template-columns: 1fr;
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default function MasamGondiKeyboard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Consonants without inherent vowel
  const consonantsBase = {
    'k': '𑴌', 'kh': '𑴍', 'g': '𑴎', 'gh': '𑴏', 'ng': '𑴚',
    'c': '𑴑', 'ch': '𑴒', 'j': '𑴓', 'jh': '𑴔', 'ny': '𑴟',
    't': '𑴛', 'th': '𑴜', 'd': '𑴝', 'dh': '𑴞', 'n': '𑴟',
    'p': '𑴠', 'ph': '𑴡', 'b': '𑴢', 'bh': '𑴣', 'm': '𑴤',
    'y': '𑴥', 'r': '𑴦', 'l': '𑴧', 'w': '𑴨', 'v': '𑴨',
    's': '𑴫', 'sh': '𑴪', 'x': '𑴮', 'h': '𑴬', 'q': '𑴌',
    'f': '𑴡', 'z': '𑴓',
  };

  // Add uppercase versions
  const allConsonants = {};
  Object.keys(consonantsBase).forEach(key => {
    allConsonants[key] = consonantsBase[key];
    allConsonants[key.toUpperCase()] = consonantsBase[key];
  });

  // Independent vowels
  const independentVowels = {
    'a': '𑴀', 'aa': '𑴁', 'i': '𑴂', 'ii': '𑴃', 'u': '𑴄', 'uu': '𑴅',
    'e': '𑴆', 'ai': '𑴈', 'au': '𑴋',
  };

  // Vowel matras (signs that combine with consonants)
  const matras = {
    'a': '', // inherent - no matra
    'aa': '𑴺',
    'i': '𑴲',
    'ii': '𑴳',
    'u': '𑴴',
    'uu': '𑴵',
    'e': '𑴺',
    'o': '𑴽',
    'ai': '𑴼',
    'au': '𑴿',
  };

  const convertToGondi = (text) => {
    // Clean input - only allow a-z, A-Z, space
    const cleanText = text.replace(/[^a-zA-Z\s]/g, '');
    let result = '';
    let i = 0;

    while (i < cleanText.length) {
      // Handle spaces
      if (cleanText[i] === ' ') {
        result += ' ';
        i++;
        continue;
      }

      const currentCharLower = cleanText[i].toLowerCase();
      const twoCharLower = cleanText.substring(i, i + 2).toLowerCase();
      const threeCharLower = cleanText.substring(i, i + 3).toLowerCase();

      // Skip standalone 'a' - it's inherent in consonants
      if (currentCharLower === 'a') {
        i++;
        continue;
      }

      // Check for three-character consonants first (like 'kha', 'gha')
      if (allConsonants[threeCharLower]) {
        // Look ahead to see what comes next
        const nextChar = cleanText.substring(i + 3, i + 4).toLowerCase();
        
        if (matras.hasOwnProperty(nextChar)) {
          // Next char is a vowel - add consonant + vowel matra
          result += allConsonants[threeCharLower] + matras[nextChar];
          i += 4;
          continue;
        } else {
          // Next char is consonant or end - add consonant with inherent 'a'
          result += allConsonants[threeCharLower];
          i += 3;
          continue;
        }
      }

      // Check for two-character consonants
      if (allConsonants[twoCharLower]) {
        const nextChar = cleanText.substring(i + 2, i + 3).toLowerCase();
        
        if (matras.hasOwnProperty(nextChar)) {
          // Next char is a vowel - add consonant + vowel matra
          result += allConsonants[twoCharLower] + matras[nextChar];
          i += 3;
          continue;
        } else {
          // Next char is consonant or end - add consonant with inherent 'a'
          result += allConsonants[twoCharLower];
          i += 2;
          continue;
        }
      }

      // Single character consonant
      if (allConsonants[currentCharLower]) {
        const nextChar = cleanText.substring(i + 1, i + 2).toLowerCase();
        
        // Check if next char is also a consonant (for conjuncts)
        if (allConsonants[nextChar]) {
          // Next is consonant - add current with virama
          result += allConsonants[currentCharLower] + '𑵄';
          i++;
          continue;
        }
        
        if (matras.hasOwnProperty(nextChar)) {
          // Next char is a vowel - add consonant + vowel matra
          result += allConsonants[currentCharLower] + matras[nextChar];
          i += 2;
          continue;
        } else {
          // Next char is end of word - add consonant with inherent 'a'
          result += allConsonants[currentCharLower];
          i++;
          continue;
        }
      }

      // Check for two-character independent vowels (aa, ii, uu)
      if (independentVowels.hasOwnProperty(twoCharLower)) {
        result += independentVowels[twoCharLower];
        i += 2;
        continue;
      }

      // Single independent vowel
      if (independentVowels.hasOwnProperty(currentCharLower)) {
        result += independentVowels[currentCharLower];
        i++;
        continue;
      }

      // Unknown character - skip
      i++;
    }

    return result;
  };

  const handleConvert = (text) => {
    setInput(text);
    const converted = convertToGondi(text);
    setOutput(converted);
  };

  return (
    <div className="container">
      <header>
        <h1>Johar Edge</h1>
        <h2>Masaram Gondi ITRANS Keyboard</h2>
        <p>Type in English from left to right</p>
        <p className="copyright">© Umesh Porte</p>
      </header>

      <main>
        <div className="card">
          <label>English Input (Left to Right)</label>
          <textarea
            value={input}
            onChange={(e) => handleConvert(e.target.value)}
            placeholder="Type: ka, kha, go, rama, lav, etc."
            className="input-box"
          />
        </div>

        <div className="arrow">→</div>

        <div className="card">
          <label>Masaram Gondi Output</label>
          <div className="output-box" style={{ fontFamily: "'Noto Sans Masaram Gondi', sans-serif" }}>
            {output || 'Output appears here'}
          </div>
        </div>
      </main>

      <div className="guide">
        <div className="guide-card">
          <h3>Examples</h3>
          <ul>
            <li>ka → 𑴌</li>
            <li>khi → 𑴍𑴲</li>
            <li>go → 𑴎𑴽</li>
            <li>lav → 𑴧𑴨</li>
            <li>rama → 𑴦𑴀𑴤𑴀</li>
          </ul>
        </div>

        <div className="guide-card">
          <h3>Vowels</h3>
          <ul>
            <li>a, aa, i, ii, u, uu</li>
            <li>e, o, ai, au</li>
          </ul>
        </div>
      </div>

      <footer>
        <p>Using Google Fonts • Noto Sans Masaram Gondi</p>
        <p>License: MIT • <a href="https://github.com/joharedge/Johar-Edge">GitHub</a></p>
      </footer>
    </div>
  );
}
