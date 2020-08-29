/* * * * * * * * * function made to fetch API by url * * * * * * */ 

export async function http(
  request: RequestInfo
): Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}


/* * * * * * * * * * * * Date Protoype extend * * * * * * * * * * * */
declare global {
  interface Date {
    addDays(days: number): Date;
    getDashedDate(): string;
  }
}

Date.prototype.addDays = function(days: number): Date {
  let date = this;
  date.setDate(date.getDate() + days);

  return date;
}

/* this prototype only returns the date in a YYYY-MM-DD format */
Date.prototype.getDashedDate = function(): string {

  const month: number = this.getMonth() + 1;
  const year: number = this.getFullYear();
  const day: number = this.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

/* * * * * * * */

/* * * * * * * * * * * * STOCK CLASS * * * * * * * * * * * */
class Stock {

  date: Date;
  price: number;

  constructor(date:string) {
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
    const data = await http(
      `${url}?api_token=${api_token}&from=${this.date.getDashedDate()}&to=${this.date.getDashedDate()}&fmt=json`
    );

    /* return the price only */
    this.price =  data.length > 0 ? Number(data[0].close) : 0;
  }
}

/* * * * * * * * * * * * PORTFOLIO CLASS * * * * * * * * * * * */
class Portfolio {
  stocks: Array<Stock>;
  
  constructor(){
    this.stocks = []
  }


  async profit(d1: string, d2: string){
    console.log('\nRANGE:', d1, ' - ', d2, '\n')
    console.log('🕑    Fetching data from API...\n')
    let count = 0;

    try{
      const date1 = new Date(`${d1}`);
      const date2 = new Date(`${d2}`);

      /* Making sure that day1 is less than day2 */
    while(date1 <= date2) {

      const temp = new Stock(date1.getDashedDate());
      await temp.setPrice();

      // since the API that I am using doesnt have all the days, I am making sure that they return a price value
      if(temp.price > 0) {

        this.stocks.push(temp);

        this.stocks[count].printInfo();

        count ++
      }

      /* Go to next day */
      date1.addDays(1);
    }

    console.log('\n', count, ' results found...\n')

    }catch(err)
    {
      console.error(err);
    }

    
    
  }
}

/* * * * * * * * * * * * PROGRAM STARTS HERE * * * * * * * * * * * */
const p = new Portfolio();

/* TYPE HERE RANGE OF DATES */

// example: 2019-12-31  2020-01-31

p.profit('2017-01-05', '2017-01-10');


