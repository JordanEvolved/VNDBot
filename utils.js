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

module.exports = {truncateString, currentDate};