function generateIndex(sessionID, req, res) {

    fs.readFile('../views/index.ejs', 'UTF-8', function(err, data) {
        data = data.replace(/SESSIONID/g, sessionID);
        res.writeHead(200, {
            'Content-Type' : 'text/html; charset=UTF-8'
        });
        res.end(data);
    });

}