import React, { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [participants, setParticipants]=useState([]);

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setParticipants([...participants,phoneNumber]);
    setSubmitted(true);
    setPhoneNumber('');
  };

  const handleShowParticipants=() => {
    alert(`참가자 목록: \n ${participants.join('\n')}`);
  };

  return (
    <div className="App">
      <h1>전화번호 입력 폼</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">전화번호:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="전화번호를 입력하세요"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">제출</button>
      </form>
      {submitted && (
        <div className="result">
          <h2>참가 완료!</h2>
          <p>입력된 전화번호: {phoneNumber}</p>
          <button onClick={handleShowParticipants}>참가현황</button>
        </div>
      )}
    </div>
  );
}

export default App;