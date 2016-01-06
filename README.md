# textlint-rule-unexpanded-acronym [![Build Status](https://travis-ci.org/azu/textlint-rule-unexpanded-acronym.svg?branch=master)](https://travis-ci.org/azu/textlint-rule-unexpanded-acronym)

[textlint](https://github.com/textlint/textlint "textlint") rule that found Unexpanded Acronym.

That is, if there exists an acronym ABC in the document, then there must also exist a sequence of capitalized words such as Axxx Bxx Cxxx.

OK:

```
ABC can stand form the Australian Broadcasting Commission.
```

NG:

```
I like ABC.
(What does ABC stands for ???)
```



## Installation

    npm install textlint-rule-unexpanded-acronym

## Usage

Via CLI

    npm install textlint textlint-rule-unexpanded-acronym -D
    $(npm bin)/textlint --rule unexpanded-acronym README.md

Via `.textlintrc`

```json
{
    "rules": {
        "unexpanded-acronym" : {
            "min_acronym_len" : 3
        }
    }
}
```

### Options

- `min_acronym_len`(default:`3`): Minimum size for the acronym
- `ignore_acronyms`(default:`[]`): Ignoring acronym List.

```
{
    "rules": {
        "unexpanded-acronym" : {
            // AB is ignore, ABC is recognized.
            "min_acronym_len" : 3,
            // OSS is ignore
            "ignore_acronyms" : ["OSS"]
        }
    }
}
```

## Tests

    npm test

## Reference

- [UnexpandedAcronym](http://redpen.cc/docs/latest/index.html#unexpandedacronym "UnexpandedAcronym")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT