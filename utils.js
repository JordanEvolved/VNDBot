function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }

    return str.slice(0, num - 3) + '...';
};

function currentDate() {
    let today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    console.log(`Today\'s date is ${today}`);
    return today;
};

function formatDescription(str) {

    //g at the end is a global tag, which make sure every url is replaced instead of one
    let urlRegex = /\[url=(https:\/\/.*?)\](.*?)\[\/url\]/g;
    let spoilerRegex = /\[spoiler\](.*?)\[\/spoiler]/g;

    //these replace the incorrect format with markdown
    str = str.replace(urlRegex, `[$2]($1)`);
    str = str.replace(spoilerRegex, `||$1||`);

    return str;
}

module.exports = {truncateString, currentDate, formatDescription};