const writeToFile = require("../utility/write-to-file");

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1)
    let id = req.url.split("/")[3]
    //browse for regexp that will check for uuid
    const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    if (!regexV4.test(id)) {
        res.writeHead(400, {"content-type": "application/json"});
        res.end(JSON.stringify({title: 'Validation failed', message: 'UUID is not valid'}));
    } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
        const index = req.movies.findIndex((movie) => {
            return movie.id === id
        })
        if (index === -1) {
            res.statusCode = 200;
            res.write(JSON.stringify({title: 'not found', message: 'movie not found'}))
            res.end()
        } else {
            req.movies.splice (index, 1)
            writeToFile(req.movies)
            res.writeHead(204, {'content-type': 'application/json'})
            res.end(JSON.stringify(req.movies))
        }
    } else {
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: 'not found', message: 'route not found'}));
    }
};