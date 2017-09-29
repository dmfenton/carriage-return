# Carriage Return 📇

Bumps the semantic version in your changelog


## CLI
`npm i -g @dmfenton/carriage-return`
```
Usage: carriage-return [options]

Options:
  --version            Show version number                             [boolean]
  -f, --file           Location of your changelog                       [string]
  -l, --level          Semantic version change e.g. major, minor, patch [string]
  --nv, --new-version  The exact next version for yor changelog e.g. 2.3.1
                                                                        [string]
  -h, --help           Show help                                       [boolean]

Examples:
  carriage-return -l minor                       bump your changelog to the next minor version
  carriage-return -nv 1.0.1                      bump your changelog to version 1.0.1
  carriage-return -l major -f                    bump your changelog located at a specific filepath
  /foobar/changelogs/log.md          

Made with ♥️ by Esri DC R&D
```

## NPM scripts
`npm i -D @dmfenton/carriage-return`
```json
{
  "scripts": {
    "changelog-patch": "carriage-return -l patch",
    "changelog-minor": "carriage-return -l minor",
    "changelog-major": "carriage-return -l major"
  }
}
```

## Why the name?

When you get to the end of a line with a type writer, the carriage return allows you to start again at the next line
