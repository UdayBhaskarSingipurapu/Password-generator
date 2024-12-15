import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [splAllowed, setSplAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numAllowed) str += '0123456789';
    if(splAllowed) str += '!@#$%&*';
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, splAllowed])

  const copyTextToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, splAllowed])

  return (
    <div className="py-24 bg-gradient-to-r  flex  justify-center">
      <div className="w-full max-w-lg bg-gray-700 shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Password Generator</h1>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={password}
            placeholder="Your Password"
            ref = {passRef}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
          <button onClick={copyTextToClipboard}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between">
            <input
              type="range"
              id="length"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-1/2"
            />
            <label htmlFor="length" className="text-white font-medium">Password Length: {length}</label>
          </div>

          <div className="flex flex-wrap items-center gap-x-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={() => setNumAllowed((prev) => !prev)}
                className="form-checkbox text-blue-600 rounded"
              />
              <span className="ml-2">Include Numbers</span>
            </label>

            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={splAllowed}
                onChange={() => setSplAllowed((prev) => !prev)}
                className="form-checkbox text-blue-600 rounded"
              />
              <span className="ml-2">Include Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
