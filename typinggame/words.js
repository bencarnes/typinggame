
const leftUpperWords = [
    "sad",
    "red",
    "fed",
    "was",
    "dew",
    "dad",
    "saw",
    "we",
    "as",
    "rest",
    "far",
    "trade",
    "waste",
    "see",
    "sew",
    "few",
    "wet",
    "eat",
    "fast",
    "set",
    "tea",
    "west",
    "safe",
    "feed",
    "taste",
    "seed",
    "date",
    "dare",
    "deed",
    "deer",
    "fade",
    "fear",
    "free",
    "raft",
    "rate",
    "read",
    "reed",
    "ward",
    "wear",
    "weed",
    "ease",
    "east",
    "afar",
    "area",
    "awed",
    "awe",
    "are",
    "art",
    "ate",
    "ear",
    "eat",
    "era",
    "ewe"
]

export default class Words {
    static getRandWord(workListName) {
        if (workListName === 'leftUpper') {
            return leftUpperWords[Math.floor(Math.random() * leftUpperWords.length)];
        }
        return '';
    }
}