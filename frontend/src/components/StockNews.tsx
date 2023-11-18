import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

const StockNews = () => {
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const apiKey = 'AD2M1ASICW8IQ5IL';
    //             const res = await axios({
    //                 method: 'get',
    //                 url: ('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKey}' + apiKey),
    //             });
    //             setData(res.data.feed || [])
    //         } catch (error) {
    //             console.error('Error fetching stock data:', error);
    //             alert('There was an error fetching the stock data.');
    //         }
    //     };

    //     fetchData();

    //     const interval = setInterval(fetchData, 60000000); // Call the API every 60 seconds

    //     return () => clearInterval(interval);
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            const token = 'cl3v7d1r01qj63a9lv80cl3v7d1r01qj63a9lv8g'
            const res = await axios({
                method: 'get',
                url: ('https://finnhub.io/api/v1/news?category=general' + '&token=' + token),
            });
            setData(res.data)
        };

        fetchData();

        const interval = setInterval(fetchData, 60000); // Call the API every 60 seconds

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="mx-2 flex">
            <div className="container mx-4 w-3/12 flex-initial">
                <ul className="menu bg-white bordered w-full rounded-box align-middle">
                </ul>
            </div>
            <div className="container mx-4 w-6/12 flex-initial">
                <ul className="menu bg-white bordered w-full rounded-box align-middle">
                    <h1 className="normal-case text-3xl font-bold text-[#02234D] text-left ml-2 my-4">Relevant News</h1>
                    {createNewsCards(data)}
                </ul>
            </div>
            <div className="container mx-4 w-3/12 flex-initial">
                <ul className="menu bg-white bordered w-full rounded-box align-middle">
                </ul>
            </div>
        </div>
    )
}

function createNewsCards(data: string | any[]) {
    const res_news_cards = []
    for (var i = 0; i < data.length; i++) {
        var news_article = data[i];
        res_news_cards.push(<a href={news_article.url} className="hover:bg-base-100 h-1/5"><NewsCard category={news_article.category}
            date={news_article.datetime} image={news_article.image} summary={news_article.summary} headline={news_article.headline}
            source={news_article.source} url={news_article.url}
        /> </a>);
    }
    return res_news_cards;
}

export default StockNews