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

async function queryList(id) {

    const data = await fetch(`${BASE_URL}ulist`, {
        method: 'POST',
        headers: {'Content-Type': `application/json`}, //uses provided user token
        body: JSON.stringify({
            user: id,
            fields: 'id, vote, vn.title'
        })
    });

    const list = await data.json();
    console.log(JSON.stringify(list, 0, 2));
}


module.exports = { authUser, queryList };