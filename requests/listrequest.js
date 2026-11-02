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

module.exports = { authUser };