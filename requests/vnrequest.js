// This file will call the VNDB API when necessary for VN specific requests
require('dotenv').config();
const { BASE_URL } = process.env;
const {currentDate} = require('../utils.js');

async function queryVn(id) {

    console.log("ID being sent:", JSON.stringify(id));
    console.log(`${BASE_URL}vn`);

    const data = await fetch(`${BASE_URL}vn`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            filters: ["id", "=", id],
            fields: "title, released, description, rating, image.url"
        })
    });

    const novelInfo = await data.json();
    console.log(JSON.stringify(novelInfo, null, 2));

    return novelInfo.results[0]; //specifically grabs results from JSON
}

async function recentReleases(num) {

    const today = currentDate(); //finds the current date

    console.log(`Finding recent releases before ${today}...`);

    const data = await fetch('https://api.vndb.org/kana/vn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            //sorts by novels released before current date
            filters: ['released', '<=', today],
            fields: "id, title, released",
            sort: "released",
            reverse: true,
            results: num,
        })
    });

    const recentInfo = await data.json();
    console.log(JSON.stringify(recentInfo, null, 2));

    return recentInfo.results;
}

module.exports = {queryVn, recentReleases};