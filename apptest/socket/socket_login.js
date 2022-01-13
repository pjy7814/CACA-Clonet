const { json } = require('express');
var express = require('express');
const { syncBuiltinESMExports } = require('module');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var mysql = require("mysql"); // mysql 모듈을 불러옵니다.

connections = [];



server.listen(process.env.PORT || 3000);
console.log('Server is running ...');

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connect: %s sockets are connected', connections.length);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnect: %s sockets are connected', connections.length);
    });
    
    
    //로그인
    socket.on('login', function(data){

        var jsonLogin = JSON.parse(data);
        console.log(jsonLogin);

        var login_result = loginService(jsonLogin.user_id, jsonLogin.user_pw);
        console.log(login_result);

             
        connections.splice(connections.indexOf(socket),1);
    });

    //회원가입
    socket.on('signup', function(data){

        // console.log(data);
        var jsonSignup = JSON.parse(data);
        console.log(jsonSignup);

        // signupID = jsonSignup.user_id;
        // signupPW = jsonSignup.user_pw;
        // signupName = jsonSignup.user_name;
        // signupEmail = jsonSignup.user_email;

        // signupService(signupID, signupPW, signupName, signupEmail);
    });
});



var mysql = require("mysql"); // mysql 모듈을 불러옵니다.
var userMember = "";        //유저 회원의 정보를 저장

// 커넥션을 정의합니다.
// RDS Console 에서 본인이 설정한 값을 입력해주세요.
var con = mysql.createConnection({
    host: "-",
    user: "-",
    password: "-",
    database: "clonet_database"
});


function loginService(id, pw){

    // var login_result = "err";
    var query = "SELECT user_id, user_pw FROM user " + "where user_id = \'" + id + "\' " +  "and user_pw = \'" + pw + "\'" ;
    
    // RDS에 접속합니다.
    con.connect(function(err) {
        if (err) {
            console.log("database connection err")
            // return "err" // throw err; // 접속에 실패하면 에러를 throw 합니다.
        } else { // 접속시 쿼리를 보냅니다.
            // console.log("before");
            // setTimeout(() => console.log("after"), 3000);
            con.query(query, function(err, rows, fields) {
                console.log("rows : " + String(rows))
                console.log("rows : " + rows)
                console.log("err : " + err)
                console.log("fields : " + fields)

                if(String(rows) == "[object Object]"){
                    console.log("--COMPLETE--")
                    io.sockets.emit("login_result", "true");
                    return "COMPLETE"
                }else{
                    io.sockets.emit("login_result", "false");
                    return "false"
                }
            });
            }
    });
}

// function signupService(id, pw, name, email) {

//     connection.connect(function(err) {
//         if (err) {
//           throw err; // 접속에 실패하면 에러를 throw 합니다.
//         } else {
//           // 접속시 쿼리를 보냅니다.
//           connection.query("INSERT INTO user (user_id, user_pw, user_name, user_email) VALUES ("+id+","+pw+","+name+","+email+")", function(err, result) {
//             if (err) throw err;      //멤버 정보 저장
//             console.log("1 record inserted");
//           });
//         }
//       });

    
// }