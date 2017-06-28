window.onload = function(){
    this.chat= {
        socket:null,
        userName:'',
        userId:'',
        editer:document.querySelector('.editer'),
        msgBox:document.querySelector('.msgBox'),

        getTime:function(){
            var date = new Date();
            var M = date.getMonth(),
             D = date.getDay(),
             H = date.getHours(),
             Minutes = date.getMinutes(),
             offsetTime = M +"-"+D+" "+H + ":" + Minutes;
             return offsetTime;
        },
        sendMsg:function(){// 发消息
            var obj = {};// 发送的数据对象
            obj.userName = this.userName||'konh';
            obj.userId = this.userId;
            obj.msgText = this.editer.value;
            obj.time = this.getTime();
            this.socket.emit('message',obj);
            this.editer.value = '';
        },
        showMsg:function(obj){//显示接收的消息
            var section = document.createElement('section');
            console.log(this.userId+"-"+obj.userId);
            if(obj.userId == this.userId){
            section.className = "msgWrap msgRight";
        }else{
            section.className = "msgWrap msgLeft";
        }
            var html = ' <div class="msgHead"> \
                     <span>{{userName}}</span> \
                     <span>{{time}}</span> \
                </div> \
                <span class="msgText">{{msgText}}</span>';
                html = html.replace('{{userName}}',obj.userName);
                html = html.replace('{{time}}',obj.time);
                html = html.replace('{{msgText}}',obj.msgText);
                section.innerHTML = html;
                this.msgBox.appendChild(section);
        },
        getUid:function(){
            return new Date().getTime()+Math.floor(Math.random()*100);
        },
        init:function(){
            this.socket = io();
            this.userId = this.getUid();
            var self = this;
            this.socket.on('chat message',function(obj){
                 self.showMsg(obj);
            })
        }
    }
    chat.init();// 实例化socket
    document.addEventListener('keydown',function(e){

        if (e.keyCode == 13) {
            if(chat.editer.value==""){
                alert('输入不允许为空');
                return false;
            }else{
                chat.sendMsg();
            }

        }
    })
}();
