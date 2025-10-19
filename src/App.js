import { useState } from 'react';
import './App.css';

export default function MasamGondiKeyboard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const consonants = {
    'k': '𑴌𑵄', 'kh': '𑴍𑵄', 'g': '𑴎𑵄', 'gh': '𑴏𑵄', 'ng': '𑴚𑵄',
    'c': '𑴑𑵄', 'ch': '𑴒𑵄', 'j': '𑴓𑵄', 'jh': '𑴔𑵄', 'ny': '𑴟𑵂',
    't': '𑴛𑵄', 'th': '𑴜𑵄', 'd': '𑴝𑵄', 'dh': '𑴞𑵄', 'n': '𑴟𑵄',
    'p': '𑴠𑵄', 'ph': '𑴡𑵄', 'b': '𑴢𑵄', 'bh': '𑴣𑵄', 'm': '𑴤𑵄',
    'y': '𑴥𑵄', 'r': '𑴦𑵄', 'l': '𑴧𑵄', 'w': '𑴨𑵄', 'v': '𑴨𑵄',
    's': '𑴫𑵄', 'sh': '𑴪𑵄', 'x': '𑴮𑵄', 'h': '𑴬𑵄', 'q': '𑴌𑵂',
    'f': '𑴡𑵂𑵄', 'z': '𑴓𑵂𑵄',
  };

  const allConsonants = {};
  Object.keys(consonants).forEach(key => {
    allConsonants[key] = consonants[key];
    allConsonants[key.toUpperCase()] = consonants[key];
  });

  const independentVowels = {
    'a': '𑴀', 'aa': '𑴁', 'i': '𑴂', 'ii': '𑴃', 'u': '𑴄', 'uu': '𑴅',
    'e': '𑴆', 'o': '𑴉', 'ai': '𑴈', 'au': '𑴋',
  };

  const matras = {
    'i': '𑴲', 'ii': '𑴳', 'u': '𑴴', 'uu': '𑴵', 'e': '𑴺',
    'ai': '𑴼', 'o': '𑴽', 'au': '𑴿',
  };

  const convertToGondi = (text) => {
    const cleanText = text.replace(/[^a-zA-Z\s]/g, '');
    let result = '';
    let i = 0;

    while (i < cleanText.length) {
      if (cleanText[i] === ' ') {
        result += ' ';
        i++;
        continue;
      }

      const currentChar = cleanText[i];
      const currentCharLower = cleanText[i].toLowerCase();
      const twoChar = cleanText.substring(i, i + 2).toLowerCase();
      const threeChar = cleanText.substring(i, i + 3).toLowerCase();

      if (currentCharLower === 'a') {
        i++;
        continue;
      }

      if (twoChar === 'aa') {
        if (result.endsWith('𑵄')) {
          result = result.slice(0, -1) + '𑴺';
        } else if (result.length > 0) {
          result += '𑴺';
        }
        i += 2;
        continue;
      }

      if (allConsonants[threeChar]) {
        result += allConsonants[threeChar];
        i += 3;
        continue;
      }

      if (allConsonants[twoChar]) {
        result += allConsonants[twoChar];
        i += 2;
        continue;
      }

      if (allConsonants[currentCharLower]) {
        result += allConsonants[currentCharLower];
        i++;
        continue;
      }

      if (independentVowels.hasOwnProperty(twoChar)) {
        result += independentVowels[twoChar];
        i += 2;
        continue;
      }

      if (independentVowels.hasOwnProperty(currentCharLower)) {
        result += independentVowels[currentCharLower];
        i++;
        continue;
      }

      if (matras.hasOwnProperty(currentCharLower) && result.length > 0) {
        if (result.endsWith('𑵄')) {
          result = result.slice(0, -1) + matras[currentCharLower];
        } else {
          result += matras[currentCharLower];
        }
        i++;
        continue;
      }

      i++;
    }

    if (result.endsWith('𑵄')) {
      result = result.slice(0, -1);
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
            placeholder="Type: ka, kha, lav, rama, etc."
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

      <footer>
        <p>Using Google Fonts • Noto Sans Masaram Gondi</p>
        <p>License: MIT • <a href="https://github.com/joharedge/Johar-Edge">GitHub</a></p>
      </footer>
    </div>
  );
}
