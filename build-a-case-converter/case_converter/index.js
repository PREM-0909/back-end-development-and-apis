const getUpperCase = (str) => {
    const capitalStr = str.toUpperCase();
    return capitalStr
};

const getLowerCase = (str) => {
    const smallStr = str.toLowerCase();
    return smallStr
};

const getSentenceCase = (str) => {
    const firstCap = str.charAt(0).toUpperCase();
    const leftoverStr = str.slice(1,str.length).toLowerCase();
    return firstCap.concat("" , leftoverStr)
};

const getProperCase = (str) => {
    const arrayOfStr = str.split(" ");
    const result = [];

    arrayOfStr.forEach((word) => {
       const currentWord = getSentenceCase(word)
       result.push(currentWord)
    })
    return result.join(" ")
};

module.exports = {
    getUpperCase,
    getLowerCase,
    getSentenceCase,
    getProperCase
}