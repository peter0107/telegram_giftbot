const express = require('express');
const mysql = require('mysql');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 80;

const db=mysql.createConnection({
    host: 'giftbot-database.cc0lokhfxaeb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'junemoiscute',
    database: 'giftbot'
});

db.connect(err => {
    if(err){
        console.error('MySQL 연결 에러:', err);
        return;
    }
    console.log('MySQL 연결 성공');
})

//데이터 저장하는 엔드포인트
app.post('/api/participants', (req, res) => {
    console.log(req);
    const { phoneNumber } = req.body;
  
    const query = 'INSERT INTO participants (phoneNumber) VALUES (?)';
    db.query(query, [phoneNumber], (err, result) => {
      if (err) {
        console.error('데이터베이스 저장 오류:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ message: 'Participant added successfully', id: result.insertId });
    });
  });

// 데이터 조회하는 엔드포인트
app.get('/api/participants', (req,res) => {
    db.query('SELECT * FROM participants', (err, results) => {
      if (err) {
        console.error('데이터베이스 조회 오류:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(200).json(results);
    });
  });

app.get('/',(req,res) =>{
    res.send("Server Success");
})

app.listen(PORT,()=>{
    console.log(`Server run : giftbot-database.cc0lokhfxaeb.us-east-2.rds.amazonaws.com:${PORT}/`)
})

