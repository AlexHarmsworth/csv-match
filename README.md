# CSV Matcher

This script takes a `csv` file with jumbled up data and sorts them into key value pairs, where a `substring` is found within a `string`.

## Getting Started

1. Place a `data.csv` file inside `input`
2. Ensure there are no headers as the script will add them
3. Ensure the main `string` is in the first column
4. Esnure a list of random `substrings` are in the second column
5. Run `yarn match`
6. In `output` you will find a new `data.csv` file

The script will have matched any `substring` to a `string`, and placed them in the same row.