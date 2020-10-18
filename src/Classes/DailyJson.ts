export default class DailyJson {
  constructor(data) {
    const { Valute } = data;
    this.valutes = Valute;
  }
  valutes: { [key: string]: IValute }
}

interface IValute {
  CharCode: string,
  ID: string,
  Name: string,
  Nominal: number
  NumCode: string
  Previous: number
  Value: number
}
