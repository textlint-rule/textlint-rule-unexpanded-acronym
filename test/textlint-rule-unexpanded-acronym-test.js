var TextLintTester = require("textlint-tester");
import rule from "../src/textlint-rule-unexpanded-acronym";
var tester = new TextLintTester();
// ruleName, rule, expected[]
tester.run("rule", rule, {
    // valid list from https://en.wikipedia.org/wiki/Acronym
    valid: [
        "Open Source Software aka. OSS.",
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
        },
        // options
        {
            text: "OSS",
            options: {
                ignore_acronyms: ["OSS"]
            }
        },
        {
            text: "GREEEEEEN",
            options: {
                max_acronym_len: 5
            }
        }
    ],
    invalid: [
        {
            text: "WHO",
            errors: [
                {message: `"WHO" is unexpanded acronym. What does "WHO" stands for?`}
            ]
        }, {
            text: `When it comes to the Subject Of Cake (the sweet and delicious baked delicacy), one should
always remember (or at least consider).this foodstuff's effect on one's ever-expanding waistline.

Now we know what SOC stands for but there is no mention of TTP.`,
            errors: [
                {message: `"TTP" is unexpanded acronym. What does "TTP" stands for?`}
            ]
        }, {
            text: "use XHR, but we don't know what XHR.",
            errors: [
                {message: `"XHR" is unexpanded acronym. What does "XHR" stands for?`}
            ]
        }, {
            text: "HELLO is just a capitalized word.",
            errors: [
                {message: `"HELLO" is unexpanded acronym. What does "HELLO" stands for?`}
            ]
        }
    ]
});