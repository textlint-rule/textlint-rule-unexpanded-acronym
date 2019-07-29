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
 * @param words
 * @returns {string}
 * @example XMLHttpRequest -> XHR
 * @example World Health Organization -> WHO
 */
export function expandWordsToAcronym(words) {
    if (words.length == 1) {
        return expandOneWordToAcronym(words[0]);
    }
    else{
    // World Health Organization -> WHO
        let result = [];

        let output = words.reverse().reduce((acronym, word, i) => {
            acronym.unshift(word.charAt(0))
            result.push(acronym.join(""))
            return acronym;
        }, []);

        let output_1 = words.reverse().reduce((acronyms, word, i) => {
            acronyms += word.charAt(0);
            result.push(acronyms)
            return acronyms;
        }, []);
        return result;
    }
}