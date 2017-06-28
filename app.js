var express = require('express'),
	app     = express();
   http = require('http').Server(app),
   path = require('path')
     io = require('socket.io')(http);
app.use(express.static(path.join(__dirname+'/public')));
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html')
})
var onlineUser = [];//在线列表
var onlineNums = 0 ;//Online PersonNumbers
// io.on('connection',(socket)=>{
// 	console.log('a user connected',socket);
// })
io.on('connection', (socket)=>{
  console.log('a user connected')
  socket.on('message', (obj)=>{
 //  	console.dir('message:' + obj)
 	io.emit('chat message',obj)
  });
  socket.on('disconnect',()=>{
   console.log('a user disconnceted')
  })
});
http.listen(80,()=>{
	console.log('Server has created,port:80 ')
})
