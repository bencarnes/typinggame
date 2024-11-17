
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
    "see"
]

export default class Words {
    static getRandWord(workListName) {
        if (workListName === 'leftUpper') {
            return leftUpperWords[Math.floor(Math.random() * leftUpperWords.length)];
        }
        return '';
    }
}