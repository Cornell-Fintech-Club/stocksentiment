import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import TopGainers from './TopGainers';

const StockNews = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'VRF428VYVZ9DUYOW';
                const res = await axios({
                    method: 'get',
                    url: ('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=' + apiKey),
                });
                if (Array.isArray(res.data.feed)) {
                    setData(res.data.feed);
                } else {
                    console.error('Data format issue: Feed is not an array');
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
                alert('There was an error fetching the stock data.');
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 60000000); // Call the API every 60 seconds

        return () => clearInterval(interval);

    }, []);

    return (
        <div>
            <TopGainers />
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
        </div>

    )
}

function createNewsCards(data: any) {
    if (!Array.isArray(data)) {
        return null;
    }

    const res_news_cards = [];
    for (let i = 0; i < data.length; i++) {
        const news_article = data[i];
        const category = news_article.topics.length > 0 ? news_article.topics[0].topic : '';

        res_news_cards.push(
            <a href={news_article.url} className="hover:bg-base-100 h-1/5" key={i}>
                <NewsCard
                    category={category}
                    date={news_article.time_published}
                    image={news_article.banner_image}
                    summary={news_article.summary}
                    headline={news_article.title}
                    source={news_article.source}
                    url={news_article.url}
                />
            </a>
        );
    }
    return res_news_cards;
}


export default StockNews