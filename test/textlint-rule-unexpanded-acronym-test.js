var TextLintTester = require("textlint-tester");
import rule from "../src/textlint-rule-unexpanded-acronym";
var tester = new TextLintTester();
// ruleName, rule, expected[]
tester.run("rule", rule, {
    // valid list from https://en.wikipedia.org/wiki/Acronym
    valid: [
        "World Health Organization is abbr of WHO.",
        `When it comes to the Subject Of Cake (the sweet and delicious baked delicacy), one should
always remember (or at least consider).this foodstuff's effect on one's ever-expanding waistline.

Now we know what SOC stands for`,
        // capitalized word
        "ABC can stand form the Australian Broadcasting Commission",
        "XHR is XMLHttpRequest",
        {
            text: `
VHSIC stands for "Very High Speed Integrated Circuit".
NATO: North Atlantic Treaty Organization
GIF: Graphics Interchange Format
SQL: ([siːkwəl] or ess-cue-el) Structured Query Language.
IEEE: (I triple E) Institute of Electrical and Electronics Engineers
NAACP: (N double A C P) National Association for the Advancement of Colored People
NCAA: (N C double A or N C two A or N C A A) National Collegiate Athletic Association
`

        }
    ],
    invalid: [
        {
            text: "WHO",
            errors: [
                {message: `"WHO" is unexpanded acronym. Not found words that is expanded of "WHO" in the document.`}
            ]
        }, {
            text: `When it comes to the Subject Of Cake (the sweet and delicious baked delicacy), one should
always remember (or at least consider).this foodstuff's effect on one's ever-expanding waistline.

Now we know what SOC stands for but there is no mention of TTP.`,
            errors: [
                {message: `"TTP" is unexpanded acronym. Not found words that is expanded of "TTP" in the document.`}
            ]
        }, {
            text: "use XHR, but we don't know what XHR.",
            errors: [
                {message: `"XHR" is unexpanded acronym. Not found words that is expanded of "XHR" in the document.`}
            ]
        }, {
            text: "HELLO is just a capitalized word.",
            errors: [
                {message: `"HELLO" is unexpanded acronym. Not found words that is expanded of "HELLO" in the document.`}
            ]
        }
    ]
});