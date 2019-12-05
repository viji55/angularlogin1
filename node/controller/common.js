var connection = require('.././config/database');

//function to be export

module.exports = {

    CHECK: function (res, sql,  callback){
        connection.query(sql,function(err, result){
            if(err){
                console.log(err);
            callback({ "status": 400, "message": 'Error' })
            }else{
            callback({ "status": 200, "message": 'Success', "resultCount": result.length, "result": result })
            }
        });
    },
    QUERY: function ( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            connection.query( sql, args, ( err, result ) => {
                if ( err )
                    return reject( err );
                let results = JSON.parse(JSON.stringify(result));    
                resolve( results);
            } );
        } );
      },


}
