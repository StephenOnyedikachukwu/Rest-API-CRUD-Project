const crypto = require('crypto')
const requestBodyParser = require('../utility/bodyParser')
const writeToFile = require('../utility/write-to-file')
module.exports = async (req, res) => {
if (req.url === "/api/movies") {
    try {
        let body = await requestBodyParser (req)
        body.id = crypto.randomUUID()
        req.movies.push(body)
        writeToFile(req.movies)
        res.writeHead(201, {'content-type': 'application/json'})
        res.end()
    } catch (err) {
        console.log(err);
        res.writeHead(400, {"content-type": "application/json"})
        res.end(JSON.stringify({title: 'Validation failed', message: 'request body is not valid'}));
        
    }
} else {
    res.writeHead(404, {"content-type": "application/json"});
    res.end(JSON.stringify({title: 'not found', message: 'route not found'}));
}
}