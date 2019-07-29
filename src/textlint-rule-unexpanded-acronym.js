// LICENSE : MIT
"use strict";
const isCapitalized = require('is-capitalized');
const includes = require('array-includes');
import AcronymCreator from "./AcronymCreator";
import {isAllCapitals, expandWordsToAcronym} from "./word-utils";
const defaultOptions = {
    min_acronym_len: 3,
    max_acronym_len: 5,
    ignore_acronyms: [],
    acronymJoiningWords: [
        "of",
        "the",
        "for",
        "in",
        "and",
        "or",
        "&"
    ]
};

/*
Step

1. Collect Acronym => `acronymList`
2. Collect original words of Acronym => `expandedAcronymList`
3. expandedAcronymList.includes(acronymList)
    - Not found Acronym and throw error
 */
module.exports = function (context, options = {}) {
    const minAcronymLength = options.min_acronym_len || defaultOptions.min_acronym_len;
    const maxAcronymLength = options.max_acronym_len || defaultOptions.max_acronym_len;
    const ignoreAcronymList = options.ignore_acronyms || defaultOptions.ignore_acronyms;
    const acronymJoiningWords = options.acronymJoiningWords || defaultOptions.acronymJoiningWords;
    const {Syntax, RuleError, report, getSource} = context;
    // pickup acronyms
    const acronymList = [];
    // original words in document
    const expandedAcronymList = [];
    const isWordSatisfy = (word) => {
        if (word.length < minAcronymLength) {
            return false;
        } else if (word.length > maxAcronymLength) {
            return false;
        }
        return true;
    };
    return {
        [Syntax.Str](node){
            const text = getSource(node);
            const words = text.split(/\b/);
            const acronymCreator = new AcronymCreator();
            words.forEach(word => {
                if (word.trim().length === 0) {
                    return
                }
                if (isAllCapitals(word)) {
                    // collect Acronym
                    var isOk = isWordSatisfy(word) && !includes(ignoreAcronymList, word);
                    if (isOk && !includes(acronymList, word)) {
                        acronymList.push(word);
                    }
                } else if (isCapitalized(word)) {
                    // Add temporarySequence
                    // => add temp [Aword, Bword, Cword] = ABC
                    acronymCreator.addWord(word);
                } else if (!includes(acronymJoiningWords, word) // ignore of and...
                    && acronymCreator.canExtractAcronym()) {
                    // Create Acronym
                    var acronyms = acronymCreator.extractAcronym();
                    if(!Array.isArray(acronyms)){
                        if (isWordSatisfy(acronyms)) {
                            expandedAcronymList.push(acronyms);
                        }
                    }else{
                        Array.from(acronyms).forEach(acronym => {
                            if (isWordSatisfy(acronym)) {
                                expandedAcronymList.push(acronym);
                            }
                        });
                    }
                }
            });
            if (acronymCreator.canExtractAcronym()) {
                // Create Acronym
                var acronyms = acronymCreator.extractAcronym();
                
                Array.from(acronyms).forEach(acronym => {
                    if (isWordSatisfy(acronym)) {
                        expandedAcronymList.push(acronym);
                    }
                });
            }
        },
        [Syntax.Document + ":exit"](node){
            acronymList.forEach(acronym => {
                // not found acronym in document
                if (!includes(expandedAcronymList, acronym)) {
                    report(node, new RuleError(`"${acronym}" is unexpanded acronym. What does "${acronym}" stand for?`));
                }
            });
        }
    }
}
