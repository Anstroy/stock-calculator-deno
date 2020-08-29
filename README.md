_The source code is available at --> [Repl.it](https://repl.it/@Anstroy/StockCalcDeno)_

---

# Stock Calculator

Hi, my name is Aus Gomez, [here](https://github.com/anstroy/) is my Github profile

I used [Deno](https://deno.land/) to build it, and typescript.

The code is making requests to an indivual public API, here is the [link](https://eodhistoricaldata.com/knowledgebase/api-for-historical-data-and-volumes/)

## Get started

Navigate to the project repo on [Repl.it](https://repl.it/@Anstroy/StockCalcDeno).

Open the file [index.ts](https://repl.it/@Anstroy/StockCalcDeno#index.ts)

Make sure to have valid dates on the paremeters at the very buttom.

And just click Run on the top bar.

## Prototypes

I added two protypes to the global Date() class.
One is to add days to a date object and the other one is to return a formatted date like YYYY-MM-DD.

## Fetch API

I am using the fetch method available directly on Deno, to make API calls

## NOTES

Since the request is being made day by day, it takes a little bit to find each day on the API, this is just for testing purposes, if I were going to really implement this API, I would make sure to do those filters directly on the server where the API is running.

Another note is that some days return 0 values from the API, so I just ignore them.

## THANKS

Thanks a lot, please visit my website to find more projects [auscode.me](http://auscode.me/)
