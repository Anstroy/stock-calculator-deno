/* * * * * * * * * function made to fetch API by url * * * * * * */
export async function http(request) {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}
Date.prototype.addDays = function (days) {
    let date = this;
    date.setDate(date.getDate() + days);
    return date;
};
/* this prototype only returns the date in a YYYY-MM-DD format */
Date.prototype.getDashedDate = function () {
    const month = this.getMonth() + 1;
    const year = this.getFullYear();
    const day = this.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};
/* * * * * * * */
/* * * * * * * * * * * * STOCK CLASS * * * * * * * * * * * */
class Stock {
    constructor(date) {
        this.date = new Date(date);
        this.price = 0;
    }
    printInfo() {
        console.log(`📈   ${this.date.getDashedDate()} -> $${this.price}`);
    }
    async setPrice() {
        /* API CREDENTIALS */
        const url = 'https://eodhistoricaldata.com/api/eod/MCD.US';
        const api_token = 'OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX';
        /* Read from API to get the stock price on that day */
        const data = await http(`${url}?api_token=${api_token}&from=${this.date.getDashedDate()}&to=${this.date.getDashedDate()}&fmt=json`);
        /* return the price only */
        this.price = data.length > 0 ? Number(data[0].close) : 0;
    }
}
/* * * * * * * * * * * * PORTFOLIO CLASS * * * * * * * * * * * */
class Portfolio {
    constructor() {
        this.stocks = [];
    }
    async profit(d1, d2) {
        console.log(`🕑    Fetching data from API...`);
        let count = 0;
        const date1 = new Date(`${d1}`);
        const date2 = new Date(`${d2}`);
        while (date1 <= date2) {
            const temp = new Stock(date1.getDashedDate());
            await temp.setPrice();
            this.stocks.push(temp);
            this.stocks[count].printInfo();
            date1.addDays(1);
            count++;
        }
        console.log(count, ' results found...\n');
    }
}
/* * * * * * * * * * * * PROGRAM STARTS HERE * * * * * * * * * * * */
const p = new Portfolio();
/* TYPE HERE RANGE OF DATES */
// example: 2019-12-31  2020-01-31
p.profit('2017-01-05', '2017-01-10');
//# sourceMappingURL=file:///home/runner/FlickeringUnfoldedOpendoc/.deno/gen/file/home/runner/FlickeringUnfoldedOpendoc/index.ts.js.map