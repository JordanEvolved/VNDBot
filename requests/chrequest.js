async function queryChr(id) {

    console.log('ID being sent:',  JSON.stringify(id));

    const data = await fetch('https://api.vndb.org/kana/character', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            filters: ['id', '=', id],
            fields: 'id, name, description, vns, vns.role, image.url'
        })
    });

    const charInfo = await data.json();
    console.log(JSON.stringify(charInfo, null, 2));

    return charInfo.results[0]; //id function, so only returns one object
}

module.exports = {queryChr};