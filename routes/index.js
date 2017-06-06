
//校网模拟登陆
var superagent = require('superagent-charset').agent(); //一个的请求代理模块api，可处理get,post,put,delete,head请求
var cheerio = require('cheerio'); //装载已爬取的html网页，类似jQuery，方便获取网页指定数据。
var nodecr = require('nodecr'); //解析验证码
var fs = require('fs');
var TFDB = require('../utils/db.js');

var loginUrl = 'http://urp.tf-swufe.net:8080/cas/login?service=http://spoc.tfswufe.edu.cn/Home/Login'; //登录网址
var validateImgUrl = 'http://urp.tf-swufe.net:8080/cas/code/code.jsp'; //验证码网址
var ur = 'http://www.tfswufe.edu.cn'
var url_singn = 'http://spoc.tfswufe.edu.cn/xuegong/signin/index'  //签到首页
var url_singn3 = 'http://spoc.tfswufe.edu.cn/xuegong/signin'  //签到首页
var recoder  = 'https://spoc.tfswufe.edu.cn/Xuegong/Attendance/AttendanceStudentList?pageIndex=1&semesterName=2016-2017-2&courseName=&_=1494205380040' //考勤 (pageIndex为页数)

var url_signinrecord = 'http://spoc.tfswufe.edu.cn/xuegong/signin/signinrecord' //签到记录页面
var url_singrecord2  = 'http://spoc.tfswufe.edu.cn/XueGong/Signin/SigninRecordList?pageIndex=1&_=1482044953648' //签到记录 (pageIndex为页数)
var url_course1 = 'http://spoc.tfswufe.edu.cn/JiaoXue/CourseKnowledgePoint/StudentKnowledgePointIndex?courseId=5313&classId=43035'
var url_discuss  ='http://spoc.tfswufe.edu.cn/JiaoXue/Forum/ForumList?forumId=7647&pageIndex=2&_=1482046225103' //(pageIndex是页面)

var url_invation = 'http://spoc.tfswufe.edu.cn/JiaoXue/Forum/ForumIndex?forumId=7647'
var url_invation2 = 'http://spoc.tfswufe.edu.cn/JiaoXue/Forum/New?ForumId=7647'
var url_invationPage= 'http://spoc.tfswufe.edu.cn/JiaoXue/Forum/GetNewThread'
var url_postContent = 'http://spoc.tfswufe.edu.cn/Jiaoxue/Forum/CreateThread'
var url_singnPost = 'http://spoc.tfswufe.edu.cn/XueGong/Signin/Signin'


var Cookies = ''
var cookie = ''
var cookie2 = ''
var cookie3 = ''
var ticket = ''
var username = "51503244" ;

var lt = '';
var _eventId = 'submit';

//initial session here
var	url6 ='';


module.exports = function(app) {


    app.get('/', function(req, res) {

        // 返回用户名对应的token，简单采用sha1加密
     //   var userName = urlDecode(url_parts.query);
      //  var token = sha1(userName);
        // userHash.set(token, userName);
        // 保存token到redis
        ///.hset(redisKey, token, userName);

        res.render('index');

    });

    app.get('/company', function(req, res) {

        // 返回用户名对应的token，简单采用sha1加密
        //   var userName = urlDecode(url_parts.query);
        //  var token = sha1(userName);
        // userHash.set(token, userName);
        // 保存token到redis
        ///.hset(redisKey, token, userName);

     TFDB.findCompany(function(err, docs) {
         if(err) {
             console.log(err)
         }
         res.render('company', {
            docs: docs
         });
     })



    });

    app.get('/check', function(req, res) {

        TFDB.findCheck(function (err, docs) {
            if(err) {
                console.log(err)
            }
            res.render('check',{
                docs: docs
            })

        })


    });

    app.get('/checkIndex/:checkID', function(req, res) {

        var url = req.url;
        console.log(url)
        var openid = url.replace("/checkIndex/", "");

        TFDB.findCheckIndex(openid, function(err, docs) {
            if(err) {
                console.log(err)
            }
            res.render('checkIndex',{
                docs: docs,
                openid: openid
            })
        })
    });

    app.get('/addnews', function(req, res) {

     TFDB.findCompany(function(err, docs) {
         if(err) {
             console.log(err)
         }
         res.render('addnews');
     })
    });

    app.post('/addnews', function(req, res) {

        var data = req.body;

        console.log(data)

        TFDB.saveNews(data.time, data.topic, data.picture ,data.content, function(err) {
            if(err) {
                console.log(err)
            }
            res.redirect('/addnews')

        })

    });

    app.get('/waitPay/:id', function(req, res) {

        var url = req.url;
        console.log(url)
        var openid = url.replace("/waitPay/", "");


        TFDB.findCheckIndex(openid, function(err, docs) {
            if(err) {
                console.log(err)
            }
            res.render('pay',{
                docs: docs,
                openid: openid
            })
        })
    });

   app.post('/Pay', function(req, res) {

        var data = req.body


        TFDB.checkPay(data, function(err, docs) {
            if(err) {
                console.log(err)
            }
        })
    });

    app.post('/isPay', function(req, res) {

        var data = req.body


        TFDB.checkIsPay(data, function(err, docs) {
            if(err) {
                console.log(err)
            }
        })
    });

    app.post('/delete', function(req, res) {

        // 返回用户名对应的token，简单采用sha1加密
        //   var userName = urlDecode(url_parts.query);
        //  var token = sha1(userName);
        // userHash.set(token, userName);
        // 保存token到redis
        ///.hset(redisKey, token, userName);

        var data = req.body;

        var _id = data._id;

        console.log(data)
        console.log(_id)

        TFDB.deletCompany(_id, function(err) {
            if(err) {
                console.log(err)
            }
        })

    });


    app.post('/company', function(req, res) {
        var data = req.body;

        //console.log(data)

        TFDB.saveCompany(data.name, data.place, data.manager, function(err){
             if(err) {
                 console.log(err)
             }
        })
    });

    app.get('/sign', function(req, res) {

        // 返回用户名对应的token，简单采用sha1加密
        //   var userName = urlDecode(url_parts.query);
        //  var token = sha1(userName);
        // userHash.set(token, userName);
        // 保存token到redis
        ///.hset(redisKey, token, userName);

        res.render('sign');

    });



  app.post('/getSubject', function(req, resonpse5) {

      var data  =req.body
      console.log(data)


 



  })

app.post('/news', function (req, responses) {
    var data = req.body;
    //console.log(data)

    var openid = data.openid;
    var username= ""
    var password= ""

    TFDB.checkInfo(openid, function(err, docs) {
        if(err) {
          console.log(err)
        }
        username = docs.nameuser;
        password = docs.password
    })


})

    app.post('/saveUser', function (req, res) {
        var data = req.body;

        TFDB.saveInfor(data.user, data.password, data.openid, function(err, result) {
            if(err) {
                console.log(err)
            }
            var data= {"result":result}
            res.send(data)
        })
    })

    app.post('/checkopenid', function(req, res) {
        var data = req.body;

        console.log(data)

        TFDB.checkInfo(data.openid, function(err, docs) {
            if(err) {
                console.log(err)
            }
            console.log(docs);
            if(docs==null) {
                res.send("null")
            }else{
                res.send(docs)
            }

        })
    })




}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFile("name.jpg", bitmap, function (err) {
        if (err) {
            //res.send(err);
            console.log("保存失败！");
        } else {
            //res.send("保存成功！");
            console.log("保存成功！");
        }
    });
}