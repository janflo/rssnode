const http = require("http");

const host = 'localhost';
const port = 8080;
let Parser = require('rss-parser');
let parser = new Parser();
let tekst = '';
let tytul = '';

(async () => {
	let feed = await parser.parseURL('https://dorzeczy.pl/feed/');

	console.log(feed.title);
  tytul = feed.title;
	feed.items.forEach((item) => {
		console.log(item.title, '\n', item.contentSnippet, '\n');
    tekst += '<h4>'+item.title+'</h4>'+'<br>'+item.content+'<hr>';
	});
})();
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>`+tytul+`</h1><p>`+tekst+`</p></body></html>`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});