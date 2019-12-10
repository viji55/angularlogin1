var express = require('express');
var router = express.Router();
const app = express();
const connection = require('.././config/database');
const jwt = require('jsonwebtoken');
const config = require('.././config/config');


router.post('/login',function(req,res,next){

    let data = req.body;
    let email = data.email;
    let password = data.password;
    var sql = "SELECT * from admin where email = ? and password = ?";
    connection.query(sql,[email,password],function(err,result,rows){
        if(err){
            res.json({status:500, message:"something went wrong"})
        }else {
            if(result.length > 0){
                //do jsonwebtoken and save to db
                var token = jwt.sign({id : result[0].id},config.secret,{
                    expiresIn:86400
                } );
                updateAccessToken(res,result[0].id, token);
                console.log(result);
                res.json({status:200, message:"Login Sucess", item:result,token: token})
            } else {
                res.json({status:300, message:"Login failed username or password invalid", item:result});
            }
        }
    });
    console.log(data);
});


function updateAccessToken(res,userId, token){
    var sql = "UPDATE admin set ? where id = ?";
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var data ={
        "access_token": token,
        "updated_date": date
    }
    connection.query(sql,[data,userId],function(err,result,rows){
        if(err){
            console.log('Token update Failed');
            res.json({status : 500, message:"something went wrong when try to update token"});
        }else {
            //res.json({status:200 , message :"Token updated successfully"});
            console.log('Token updated');
        }
    });
}

module.exports = router;