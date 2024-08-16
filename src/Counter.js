import React, { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [participants, setParticipants]=useState([]);
  const [quizAnswer, setQuizAnswer]=useState('');

  const correctAnswer="비트코인"

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeQuizAnswer= (event) => {
    setQuizAnswer(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(phoneNumber===''){
      alert('전화번호를 입력해주세요.');
      return;
    }
    if(quizAnswer.toLowerCase() !==correctAnswer.toLowerCase()){
      alert("뮈즈 정답이 틀렸습니다. 다시 시도해주세요.");
      return;
    }

    setParticipants([...participants,phoneNumber]);
    setSubmitted(true);
    setPhoneNumber('');
    setQuizAnswer('');
  };

  const handleShowParticipants=() => {
    alert(`참가자 목록: \n ${participants.join('\n')}`);
  };

  return (
    <div className="App">
      <h1>추첨 참가</h1>
      <h4>아래 양식을 채워주세요!</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='quiz'>블록체인 기술을 기반으로 만들어진 세계 최초 온라인 암호화폐는?</label>
          <input
            type="text"
            id="quiz"
            name="quiz"
            placeholder="정답을 입력하세요"
            value={quizAnswer}
            onChange={handleChangeQuizAnswer}
            required
          />
        </div>
        
        <div>
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
        </div>
        <button type="submit" disabled={submitted}>제출</button>
      </form>
      {submitted && (
        <div className="result">
          <h2>참가 완료!</h2>
          <button onClick={handleShowParticipants}>참가현황</button>
        </div>
      )}
    </div>
  );
}

export default App;