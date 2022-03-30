
const res = require('express/lib/response');
const fs = require('fs');
const http = require('http');


                       //read and write file
// fs.readFile('./docs/blog.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// fs.writeFile('./docs/blog2.txt', 'Hello boy!, I see you are practicing what you have learnt on your own', () => {
//     console.log('file has been written');
// });


const server = http.createServer((req, res) => {
    console.log('request made');
    console.log(req.url, req.method);

                    //case1
// res.setHeader('Content-Type', 'text/plain');

// res.write('Mr Sada is a farmer. He lives in Sapele. He has a big farm. He grows rice, cassava and groundnut.');
// res.end();

                   //case2
// res.setHeader('Content-Type', 'text/html');

// fs.readFile('./views/404.html', (err,data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         res.write(data);
//         res.end();
//     };
// });

                    //case3
res.setHeader('Content-Type', 'text/html');

let path = './views/';
switch(req.url) {
    case "/" :
        path += '1index.html';
        break;
    case "/about" :
        path += '1about.html';
        break;
    default :
        path += '404.html';
        break;
};

fs.readFile(path, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        res.write(data);
        res.end();
    }

});


});



server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');

});