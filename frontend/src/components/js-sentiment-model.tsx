import request from 'request';
import axios, {isCancel, AxiosError} from 'axios';


export async function fetch_news(symbol: string): Promise<number> {
    const current_month = '12';
    const current_year = '2023';
    const time_from = current_year + current_month + '01T0130';
    const key = '0' // REPLACE WITH KEY

    const news_api_url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=' + key + '&tickers=' + symbol + '&time_from=' + time_from;

    try {
        const response = await axios.get(news_api_url, { headers: { 'User-Agent': 'request' } });
        const data = response.data;
        const scores = extract_ticker_sentiment_scores(data['feed']);
        const scores_list: number[] = [];
        for (let score of scores) {
            if (score['ticker'] === symbol) {
                scores_list.push(score['score']);
            }
        }
        const sum_scores = scores_list.reduce((a, b) => a + b, 0) / scores_list.length;
        console.log("Average sentiment score for " + symbol + " is " + sum_scores);
        return sum_scores;
    } catch (error) {
        console.log('Error:', error);
        return 10; // 10 is a special value that indicates an error
    }
}

function extract_ticker_sentiment_scores(feed: any[]): { ticker: string, score: number }[] {
    const scores: { ticker: string, score: number }[] = [];
    for (let article of feed) {
        for (let ticker_sentiment of article['ticker_sentiment']) {
            scores.push({
                'ticker': ticker_sentiment['ticker'],
                'score': parseFloat(ticker_sentiment['ticker_sentiment_score'])
            });
        }
    }
    return scores;
}