import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { GoIssueReopened } from "react-icons/go";
import { BsArrowClockwise } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";

function App() {
  const [length, setLength] = useState(9);
  const [Uppertext, setUppertext] = useState(false);
  const [Lowertext, setLowertext] = useState(true);
  const [number, setnumber] = useState(false);
  const [pattern, setpattern] = useState(true);
  const [password, setPassword] = useState('');
 
  const[copy,setCopy] = useState(false)

  const generatePassword = () => {
    let chars = '';
    if (Lowertext) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (Uppertext) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) chars += '0123456789';
    if (pattern) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      console.log(chars);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log(result);
    setPassword(result);
    setCopy(false)
  };

  useEffect(()=>{
    generatePassword()
  },[Uppertext,Lowertext,number,pattern,length])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
    setCopy((m)=>!m)
  };


  return (
    <>
      <div className='mainContainer'>
        <div className='divfirst'>
          <div className='one'></div>
          <div className='two'></div>
          <div className='three'></div>
        </div>
        <div className='divsecond'>
          <div className='card'>
            <div className="carditem">
              <h3>Password Generator</h3>
              <span>Create Strong and Secure password to keep</span>
            </div>
            <div className="card2">
              <div className="inputD">
                <input type="text" className='inputshow' value={password} readOnly />
                <button className="input-icon spinning" onClick={generatePassword}>
                <BsArrowClockwise />
                </button>
                <button onClick={copyToClipboard} className='btn'><FaCopy />
                {copy ? 'copied' : 'copy'}</button>
              </div>
              <div className='iteam-card'>
                <label htmlFor="range" className='rangcss'>Password length:{length}</label>
                <div className="range-value"></div>
                <input type="range" id="range" min="4" max="32" value={length} onChange={(e) => setLength(e.target.value)} style={{
                  width: '60%',
                  marginTop: '0px',
                  backgroundColor: '#ddd'
                }} />
                <div className="list">
                  <div className="checkbox-item">
                    <label>Uppercase</label>
                    <input type="checkbox" checked={Uppertext}
                      onChange={() => setUppertext(!Uppertext)} />
                  </div>
                  <div className="checkbox-item">
                    <label>Lowercase</label>
                    <input type="checkbox" checked={Lowertext}
                      onChange={() => setLowertext(!Lowertext)} />
                  </div>
                  <div className="checkbox-item">
                    <label>Numbers</label>
                    <input type="checkbox" checked={number}
                      onChange={() => setnumber(!number)} />
                  </div>
                  <div className="checkbox-item">
                    <label>Special Characters</label>
                    <input type="checkbox" checked={pattern}
                      onChange={() => setpattern(!pattern)} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
