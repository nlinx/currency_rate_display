const BASE_COINBASE_URL = "https://api.coinbase.com/"

export const getCurrencyPriceInUSD = (currency: string) => {
    return fetch(`${BASE_COINBASE_URL}v2/prices/${currency}-USD/buy`).then(d => d.json())
}
