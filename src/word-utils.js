export function isAllCapitals(word) {
    return /^[A-Z]+$/.test(word);
}
/**
 * Capital Word to Acronym
 * @param {string} CapitalWord
 * @returns {string} return Acronym
 */
export function expandOneWordToAcronym(CapitalWord) {
    let acronym = CapitalWord.charAt(0);
    let restWord = CapitalWord.slice(1);
    let lastCapitalChar = null;
    for (let i = 0; i < restWord.length; i++) {
        const char = restWord.charAt(i);
        if (/[A-Z]/.test(char)) {
            lastCapitalChar = char;
        } else {
            if (lastCapitalChar) {
                acronym += lastCapitalChar;
                lastCapitalChar = null;
            }
        }
    }
    return acronym;
}
/*
 * create Acronym from words.
 * @param {string[]} words
 * @returns (1)string if only one word (2) array if multiple words
 */
export function expandWordsToAcronym(words) {
    //XMLHttpRequest -> XHR
    if (words.length === 1) {
        return [expandOneWordToAcronym(words[0])];
    } else {
        const result = [];
        //In American Broadcast Company -> ["C", "BC", "ABC", "IABC"]
        words.reverse().reduce((acronym, word, i) => {
            acronym.unshift(word.charAt(0));
            result.push(acronym.join(""));
            return acronym;
        }, []);

        //In American Broadcast Company -> ["I", "IA", "IAB", "IABC"]
        words.reverse().reduce((acronym, word, i) => {
            acronym.push(word.charAt(0));
            result.push(acronym.join(""));
            return acronym;
        }, []);
        return result;
    }
}
