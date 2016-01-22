// LICENSE : MIT
"use strict";
import { expandWordsToAcronym } from "./word-utils";
/**
 * Build acronym from words.
 *
 * Word Word Word => WWW
 */
export default class AcronymCreator {
    constructor() {
        this._wordQueue = [];
    }

    addWord(word) {
        this._wordQueue.push(word);
    }

    canExtractAcronym() {
        return this._wordQueue.length > 0;
    }

    extractAcronym() {
        const acronym = expandWordsToAcronym(this._wordQueue);
        this.clear();
        return acronym;
    }

    clear() {
        this._wordQueue = [];
    }
}
