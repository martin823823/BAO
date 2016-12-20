
//校网模拟登陆
var superagent = require('superagent').agent(); //一个的请求代理模块api，可处理get,post,put,delete,head请求
var cheerio = require('cheerio'); //装载已爬取的html网页，类似jQuery，方便获取网页指定数据。
var nodecr = require('nodecr'); //解析验证码
var fs = require('fs');

var loginUrl = 'http://urp.tf-swufe.net:8080/cas/login?service=http://spoc.tfswufe.edu.cn/Home/Login'; //登录网址
var validateImgUrl = 'http://urp.tf-swufe.net:8080/cas/code/code.jsp'; //验证码网址
var ur = 'http://www.tfswufe.edu.cn'
var url_singn = 'http://spoc.tfswufe.edu.cn/xuegong/signin/index'  //签到首页
var url_singn3 = 'http://spoc.tfswufe.edu.cn/xuegong/signin'  //签到首页
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
var username = "41403245" ;
//var username = "41403245" ;
//var password = "823305" ;
//
//var username = "31501334" ;
//var password = "726142" ;

var lt = '';
var _eventId = 'submit';

//initial session here
var	url6 ='';


module.exports = function(app) {


    app.get('/getSubject', function(req, res) {

        // 返回用户名对应的token，简单采用sha1加密
     //   var userName = urlDecode(url_parts.query);
      //  var token = sha1(userName);
        // userHash.set(token, userName);
        // 保存token到redis
        ///.hset(redisKey, token, userName);

        res.render('index');

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



    app.post('/sign', function(req, res6) {
        var data  =req.body

        console.log(data)

        superagent.get(ur)
            .set('Referer','https://www.google.com.hk/')
            .end(function(err, res) {
                if(err) {
                    console.log(err)
                }
                //cookie2 = res.headers['set-cookie'];
                //console.log(res)

                superagent.get(loginUrl)
                    //.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
                    //.set('Host','urp.tf-swufe.net:8080')
                    //.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
                    //.set('Accept-Encoding','gzip,deflate,sdch')
                    //.set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4')
                    //.set('Cache-Control','max-age=0')
                    //.set('Connection','keep-alive')
                    //.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                    //.set('Upgrade-Insecure-Requests','1')
                    //.set('Referer','http://portal.tf-swufe.net/web/guest/243')
                    .end(function (err, res) {
                        if (err) {
                            console.log('connection failure');
                        }
                        //console.log(res)
                        Cookies = res.headers['set-cookie'];
                        var $ = cheerio.load(res.text);
                        // console.log(res.text)
                        lt = $('[name=lt]').attr('value');
                        //console.log(Cookies);
                        //superagent validation image
                        var req = superagent.get(validateImgUrl); //获取验证码图片
                        //req.set('Cookie', Cookies); //设置cookie，保证同一个会话验证码
                        req.end(function (err1, res1) {
                            if (err1) {
                                console.log("request code failure");
                            }
                            //验证码解析
                            var s64 = Buffer(res1.body).toString('base64'); //将获取数据流转为buffer后在转为base64编码数据流
                            base64_decode(s64, username); //函数实现将base64编码数据流转为.jpg格式图片到本目录下
                            /*
                             *nodecr包实现对图片解析得到验证码
                             */
                            nodecr.process("name.jpg", function (err2, result) {
                                if (err2) {
                                    console.log(err2);
                                } else {
                                    //scmulate login
                                    //console.log(result)
                                    var req2 = superagent.post(loginUrl).type('form'); //表单提交实现伪登录
                                    ////
                                    // req2.set('Accept', 'application/json');
                                    //req2.set('Accept-Encoding', 'gzip, deflate, sdch');
                                    //req2.set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4');
                                    // req2.set('Connection', 'keep-alive');
                                    //req2.set('Host', 'urp.tf-swufe.net:8080');
                                    //req2.set('Referer', 'http://spoc.tfswufe.edu.cn/');
                                    //req2.set('Upgrade-Insecure-Requests', '1');
                                    //req2.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                    //req2.set('User-Agent', "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 LBBROWSER");
                                    //req2.set('Cookie', Cookies);


                                    var params = {
                                        'username': data.number,
                                        'password': data.password,
                                        'lt': lt,
                                        '_eventId':_eventId,
                                        'code': result
                                    };
                                    req2.send(params).set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')

                                        .set('Host','spoc.tfswufe.edu.cn')
                                        .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                        .set('Accept','application/json')
                                        .set('Accept-Encoding','gzip, deflate, sdch')
                                        .set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4')
                                        .set('Cache-Control','max-age=0')
                                        .set('Connection','keep-alive')
                                        .set('Cookie', Cookies)
                                        //.set('Upgrade-Insecure-Requests','1')

                                        //.redirects(0)

                                        //.set('Referer','http://spoc.tfswufe.edu.cn/home/index')
                                        //.redirects(1)

                                        //.redirects(0)
                                        //.redirects(1)
                                        .end(function (err3, res3) {
                                            if (err3) {
                                                console.log("dfdf"+err3);
                                            }

                                            console.log("School network login sucess");
                                            var $ = cheerio.load(res3.text);

                                          // console.log(res3)

                                            var getcookie = res3.text;

                                            //var cookie = Cookie.parse();
                                            //console.
                                            // log(cookie)
                                            //cookie.value = 'somethingdifferent';
                                            //header = cookie.toString();

                                            //var cookiejar = new tough.CookieJar();
                                            //cookiejar.setCookie(cookie,url6, cb);
// ...

                                            url6 =res3.redirects[1];
                                            var location = res3.header.location



                                            cookie = res3.headers['set-cookie']

                                            var forumId = {
                                                'forumId': '7647'
                                            }
                                            var postContent = {
                                                forumId:'7647',
                                                postSubject:'请问一下大数据那个软件怎么安装?谢谢了',
                                                postContent: '请问一下大数据那个软件怎么安装?谢谢了',
                                                postType:'2',
                                                Points:''
                                            }

                                            //签到页面
                                            superagent.get(url_singn3)
                                                //.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36').set('Cookie', Cookies)
                                                //.set('Connection','keep-alive')
                                                //.set('Cookie', cookie3)
                                                //.set('Referer','http://spoc.tfswufe.edu.cn/XueGong/signin/signinrecord')
                                                //.set('Cookie', Cookies)
                                                //.redirects(0)
                                                //.send(params)
                                                //.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                                .end(function(err,response){
                                                    if (err) {
                                                        // console.log("dfdfdfd")
                                                        console.log(err);
                                                    } else {
                                                        //console.log("dfdfdfd")
                                                        var $ = cheerio.load(response.text);
                                                        var signintaskid = $("#btnSignin").attr("signintaskid")
                                                      //  console.log($("#btnSignin").attr("signintaskid"))

                                                        //$("#330199").attr("checked", true);// or
                                                        //$("#btnSignin").click()
                                                        //
                                                        //console.log(response.text)
                                                        if(typeof signintaskid == "undefined") {

                                                            console.log($(".tab-content").text())
                                                            //res6.redirect('http://spoc.tfswufe.edu.cn/xuegong/signin/index')

                                                        }else {
                                                            var sign_post = {
                                                                signinTaskId : signintaskid
                                                            }

                                                           // 签到
                                                            superagent.post(url_singnPost)
                                                                .type('form')
                                                                .send(sign_post)
                                                                //.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36').set('Cookie', Cookies)
                                                                //.set('Connection','keep-alive')
                                                                //.set('Cookie', cookie3)
                                                                //.set('Referer','http://spoc.tfswufe.edu.cn/XueGong/signin/signinrecord')
                                                                //.set('Cookie', Cookies)
                                                                //.redirects(0)
                                                                //.send(params)
                                                                //.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                                                .end(function(err,response){
                                                                    if (err) {
                                                                        // console.log("dfdfdfd")
                                                                        console.log(err);
                                                                    } else {
                                                                        //console.log("dfdfdfd")
                                                                        var $ = cheerio.load(response.text);
                                                                        //$("#330199").attr("checked", true);// or
                                                                        //$("#btnSignin").click()
                                                                        //
                                                                        console.log(response.text)

                                                                       // res6.redirect('http://spoc.tfswufe.edu.cn/xuegong/signin/index')
                                                                        //console.log(cookie)

                                                                    }
                                                                });
                                                        }

                                                    }
                                                });

                                        });


                                }
                            });

                        });
                    });
            });


    });
  app.post('/getSubject', function(req, resonpse5) {

      var data  =req.body
      console.log(data)

      superagent.get(ur)
          .set('Referer','https://www.google.com.hk/')
          .end(function(err, res) {
              if(err) {
                  console.log(err)
              }
              cookie2 = res.headers['set-cookie'];
              console.log(res)

              superagent.get(loginUrl)
                  //.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
                  //.set('Host','urp.tf-swufe.net:8080')
                  //.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
                  //.set('Accept-Encoding','gzip,deflate,sdch')
                  //.set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4')
                  //.set('Cache-Control','max-age=0')
                  //.set('Connection','keep-alive')
                  //.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                  //.set('Upgrade-Insecure-Requests','1')
                  //.set('Referer','http://portal.tf-swufe.net/web/guest/243')
                  .end(function (err, res) {
                      if (err) {
                          console.log('connection failure');
                      }
                      //console.log(res)
                      Cookies = res.headers['set-cookie'];
                      var $ = cheerio.load(res.text);
                      // console.log(res.text)
                      lt = $('[name=lt]').attr('value');
                      //console.log(Cookies);
                      //superagent validation image
                      var req = superagent.get(validateImgUrl); //获取验证码图片
                      //req.set('Cookie', Cookies); //设置cookie，保证同一个会话验证码
                      req.end(function (err1, res1) {
                          if (err1) {
                              console.log("request code failure");
                          }
                          //验证码解析
                          var s64 = Buffer(res1.body).toString('base64'); //将获取数据流转为buffer后在转为base64编码数据流
                          base64_decode(s64, username); //函数实现将base64编码数据流转为.jpg格式图片到本目录下
                          /*
                           *nodecr包实现对图片解析得到验证码
                           */
                          nodecr.process("name.jpg", function (err2, result) {
                              if (err2) {
                                  console.log(err2);
                              } else {
                                  //scmulate login
                                  //console.log(result)
                                  var req2 = superagent.post(loginUrl).type('form'); //表单提交实现伪登录
                                  ////
                                  // req2.set('Accept', 'application/json');
                                  //req2.set('Accept-Encoding', 'gzip, deflate, sdch');
                                  //req2.set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4');
                                  // req2.set('Connection', 'keep-alive');
                                  //req2.set('Host', 'urp.tf-swufe.net:8080');
                                  //req2.set('Referer', 'http://spoc.tfswufe.edu.cn/');
                                  //req2.set('Upgrade-Insecure-Requests', '1');
                                  //req2.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                  //req2.set('User-Agent', "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 LBBROWSER");
                                  //req2.set('Cookie', Cookies);


                                  var params = {
                                      'username': username,
                                      'password': password,
                                      'lt': lt,
                                      '_eventId':_eventId,
                                      'code': result
                                  };
                                  req2.send(params).set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')

                                      .set('Host','spoc.tfswufe.edu.cn')
                                      .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                      .set('Accept','application/json')
                                      .set('Accept-Encoding','gzip, deflate, sdch')
                                      .set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4')
                                      .set('Cache-Control','max-age=0')
                                      .set('Connection','keep-alive')
                                      .set('Cookie', Cookies)
                                      //.set('Upgrade-Insecure-Requests','1')

                                      //.redirects(0)

                                      //.set('Referer','http://spoc.tfswufe.edu.cn/home/index')
                                      //.redirects(1)

                                      //.redirects(0)
                                      //.redirects(1)
                                      .end(function (err3, res3) {
                                          if (err3) {
                                              console.log("dfdf"+err3);
                                          }

                                          console.log("School network login sucess");
                                          var $ = cheerio.load(res3.text);

                                          var getcookie = res3.text;

                                          //var cookie = Cookie.parse();
                                          //console.
                                          // log(cookie)
                                          //cookie.value = 'somethingdifferent';
                                          //header = cookie.toString();

                                          //var cookiejar = new tough.CookieJar();
                                          //cookiejar.setCookie(cookie,url6, cb);
// ...

                                          url6 =res3.redirects[1];
                                          var location = res3.header.location



                                          cookie = res3.headers['set-cookie']

                                          var forumId = {
                                              'forumId': '7647'
                                          }
                                          var postContent = {
                                              forumId: data.selectVal ,
                                              postSubject: data.getTitle,
                                              postContent: data.getContent,
                                              postType:'2',
                                              Points:''
                                          }


                                          //发帖
                                          superagent.post(url_postContent)
                                          	.type('form')
                                          	.send(postContent)
                                          	//	.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
                                          	//   //
                                          	//	.set('Origin','http://spoc.tfswufe.edu.cn')
                                          	//	.set('Host','spoc.tfswufe.edu.cn')
                                          	//	.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                          	//	.set('Accept','*/*')
                                          	//	.set('Accept-Encoding','gzip, deflate')
                                          	//	.set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4')
                                          	//	.set('Cache-Control','max-age=0')
                                          	//	//.set('Content-Length','12')
                                          	//	.set('X-Requested-With', 'XMLHttpRequest')
                                          	////	.set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36').set('Cookie', Cookies)
                                          	//	.set('Connection','keep-alive')
                                          	//	//.set('Cookie', cookie3)
                                          	//	.set('Referer','http://spoc.tfswufe.edu.cn/JiaoXue/CourseKnowledgePoint/StudentKnowledgePointIndex?courseId=5313&classId=43035')
                                          	//	//.set('Cookie', Cookies)
                                          	//	//.redirects(0)
                                          	//	//.send(params)
                                          	//	.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
                                          	.end(function (err, response) {
                                          		if (err) {
                                          			// console.log("dfdfdfd")
                                          			console.log(err);
                                          		} else {
                                          			//console.log("dfdfdfd")
                                          			//var $ = cheerio.load(response.text);
                                          			//$("#txtPostSubject").value = "excel"
                                          			//$('#txtaContentNormal').value = "excel 在以后工作用处有哪些?"

                                          			//console.log(response.body.threadId)
                                          			var threa = data.selectVal
                                                    var dataPOst = {
                                          				'currentForumId':'9798',

                                          				'threadId':threa
                                          			}

                                          			superagent.post('http://spoc.tfswufe.edu.cn/Jiaoxue/Forum/Post?currentForumId=9798&&threadId='+threa)
                                          				.type('form')
                                          				.send(dataPOst)
                                          				.end(function(err, res3) {
                                          					if(err) {
                                          						console.log(err)
                                          					} else {
                                          						//console.log(res3)
                                                                resonpse5.redirect('/tf')
                                          					}

                                          				})
                                          			//console.log(cookie)
                                          			//console.log("dfdfd"+Points)
                                          		}
                                          	});
                                      });


                              }
                          });

                      });



  })


          });
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