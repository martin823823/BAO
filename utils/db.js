/**
 * Created by mac on 17/4/26.
 */

var mongo = require('../db');
var ObjectID = require('mongodb').ObjectID;

function userInfo(name) {
    this.name = name;
}

module.exports = userInfo;

userInfo.saveInfor = function(username, password, openid, callback) {
    var user = {
        nameuser: username,
        password: password,
        openid: openid
    }
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("users", function(err, collection) {
          if(err) {
              return callback(err)
          }

            collection.save(user, function(err) {
                if(err) {
                    return callback(err);
                }
                var res = "关联成功"
                return callback(null, res);
            })

        })
    })
}

userInfo.checkInfo = function(openid, callback) {
    mongo.open(function (err, db) {
        if(err) {
            return callback(err)
        }

        db.collection("users", function(err, collection) {
            if(err) {
                return callback(err);
            }
            var query = {}

            if(openid) {
                query.openid = openid
            }

            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
                return callback(null, docs);
            })
        })

    })
}


userInfo.saveCompany = function(username, place, manager, callback) {
    var company = {
        name: username,
        //place: place,
        //managers: manager
    }
    console.log(username)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("CompanyList", function(err, collection) {
            if(err) {
                return callback(err)
            }

            //var query = {}
            //if(username) {
            //    query.name = username
            //}

            collection.save(company, function(err) {
                if(err) {
                    return callback(err)
                }
                return callback(null)
            })

        })
    })
}

userInfo.saveNews = function(time, topic, picture ,content, callback) {
    var News = {
        time: time,
        topic: topic,
        picture: picture,
        content: content
    }
    //console.log(username)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("News", function(err, collection) {
            if(err) {
                return callback(err)
            }

            collection.save(News, function(err) {
                if(err) {
                    return callback(err)
                }
                return callback(null)
            })

        })
    })
}

userInfo.savePay = function(data, callback) {
    var pay = {
        openid: data.openid,
        out_trade_no: data.out_trade_no,

    }
    //console.log(username)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("pays", function(err, collection) {
            if(err) {
                return callback(err)
            }

            collection.save(pay, function(err) {
                if(err) {
                    return callback(err)
                }
                return callback(null)
            })

        })
    })
}

userInfo.findCompany = function(callback) {

    //console.log(username)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("CompanyList", function(err, collection) {
            if(err) {
                return callback(err)
            }

            //var query = {}
            //if(username) {
            //    query.name = username
            //}

            collection.find({}).toArray(function(err, docs){
                if(err) {
                    return callback(err)
                }
                return callback(null, docs)
            })

        })
    })
}

userInfo.deletCompany = function(_id ,callback) {
    var relId = ObjectID(_id)

    console.log(relId)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("CompanyList", function(err, collection) {
            if(err) {
                return callback(err)
            }

            //var query = {}
            //if(username) {
            //    query.name = username
            //}

            collection.remove({_id: relId}, function(err) {
                if(err) {
                    return callback(err)
                }
                return callback(null)
            })

        })
    })
}

userInfo.findCheck = function(callback) {

    //console.log(username)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("Business", function(err, collection) {
            if(err) {
                return callback(err)
            }

            //var query = {}
            //if(username) {
            //    query.name = username
            //}

            collection.find({}).toArray(function(err, docs){
                if(err) {
                    return callback(err)
                }
                return callback(null, docs)
            })

        })
    })
}

userInfo.findCheckIndex = function(openid ,callback) {

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("Business", function(err, collection) {
            if(err) {
                return callback(err)
            }
            var query = {}
            if(openid) {
                query.priveteId = openid
            }
           collection.findOne(query, function(err, docs) {
               if(err) {
                   return callback(err)
               }
               return callback(null, docs.materialInfor);
           })
        })
    })
}

userInfo.checkPay = function(data ,callback) {
    var openid = data.openid;
    var out_trade_no = data.out_trade_no

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("Business", function(err, collection) {
            if(err) {
                return callback(err)
            }


            collection.update({"priveteId":openid , materialInfor:{$elemMatch:{out_trade_no:out_trade_no}}}, {$set:{"materialInfor.$.isCheck":"true"}},{w:0},function(err) {

               if(err) {
                   return callback(err)
               }
               return callback(null);
           })
        })
    })
}

userInfo.checkIsPay = function(data ,callback) {
    var openid = data.openid;
    var out_trade_no = data.out_trade_no

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("Business", function(err, collection) {
            if(err) {
                return callback(err)
            }


            collection.update({"priveteId":openid , materialInfor:{$elemMatch:{out_trade_no:out_trade_no}}}, {$set:{"materialInfor.$.isPay":"true"}},{w:0},function(err) {

               if(err) {
                   return callback(err)
               }
               return callback(null);
           })
        })
    })
}