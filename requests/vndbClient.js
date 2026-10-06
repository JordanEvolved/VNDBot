/* This file will call the VNDB API when necessary */

// let id = 'v97';

async function queryVn(id) {

    console.log("ID being sent:", JSON.stringify(id));

    const data = await fetch('https://api.vndb.org/kana/vn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            filters: ["id", "=", id],
            fields: "title, released, description, rating"
        })
    });

    const novelInfo = await data.json();
    console.log(JSON.stringify(novelInfo, null, 2));

}

module.exports = {queryVn};

// queryVn(id);