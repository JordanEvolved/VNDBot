require('dotenv').config();
const { BASE_URL, VNDB_TOKEN } = process.env;

async function authUser() {

    const data = await fetch(`${BASE_URL}authinfo`, {
        method: 'GET',
        headers: {'Authorization': `token ${VNDB_TOKEN}`}, //uses provided user token
    });

    const userInfo = await data.json();
    console.log(JSON.stringify(userInfo, 0, 2));
}

async function queryList(id, sorting, reversed) {

    const data = await fetch(`${BASE_URL}ulist`, {
        method: 'POST',
        headers: {'Content-Type': `application/json`}, //uses provided user token
        body: JSON.stringify({
            user: id,
            fields: 'id, vote, vn.title, started, finished',
            filters: [
                'or', 
                ['label', '=', 1], //playing
                ['label', '=', 2], //finished
                ['label', '=', 3], //stalled
                ['label', '=', 4] //dropped
            ],
            sort: sorting,
            reverse: reversed,
            results: 10
        })
    });

    const list = await data.json();
    console.log(JSON.stringify(list, 0, 2));
}

queryList('u266381', 'title', false);

module.exports = { authUser, queryList };