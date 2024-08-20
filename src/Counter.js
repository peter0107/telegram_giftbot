import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const response=await axios.post('https://3.133.86.21:4000/api/participants',{
        phoneNumber
      },{
        header: {
          'Content-Type': 'applicaiton/json'
        }
      });

      //정상적인 경우
      if(response.status===201){
        alert("SUCCESS");
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
        alert("전화번호가 성공적으로 저장되었습니다.");
      }
    } catch(error){
      console.error("참여 실패: ",error);
      
       // 오류 메시지를 사용자에게 더 자세히 표시
       if (error.response) {
        // 서버 응답이 있는 경우 (4xx, 5xx 응답)
        alert(`참여에 실패했습니다. 서버 응답: ${error.response.status} - ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        // 요청이 전송되었으나 응답을 받지 못한 경우
        alert('참여에 실패했습니다. 서버로부터 응답이 없습니다. 네트워크 문제일 수 있습니다.');
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        alert(`참여에 실패했습니다. 오류 메시지: ${error.message}`);
      }
    }
    
  };

  const handleShowParticipants= async () => {
    try {
      const response = await axios.get('https://3.133.86.21:4000/api/participants');
      const participantList = response.data.map(participant => participant.phoneNumber).join('\n');
      alert(`참가자 목록: \n${participantList}`);
    } catch (error) {
      console.error("참가자 목록을 가져오는 데 실패했습니다: ", error);
      alert('참가자 목록을 가져오는 데 실패했습니다.');
    }

  };

  return (
    <div className="App">
      <h1 className='Title'>추첨 참가</h1>
      <h4>아래 양식을 채워주세요!</h4>
      <form onSubmit={handleSubmit}>
        <div className='quiz'>
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
        <button type="submit" disabled={submitted} className='submit'>제출</button>
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