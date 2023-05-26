'use strict';

const express = require('express');
const redis = require("redis");
const app = express();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// 레디스 클라이언트 생성
const client = redis.createClient({
  host: "redis-server",
  port: 6379
})

// 숫자는 0 부터 시작합니다.
client.set('number', 0);

app.get('/', (req, res) => {
  client.get('number', (err, number) => {
    // 현재 숫자를 가져와서 1씩 올려줍니다.
    client.set('number', parseInt(number) + 1)
    res.send('count +1' + number)
  })
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});