import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

const StockNews = () => {
    const [data, setData] = useState([]);
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
        <div className="carousel carousel-center rounded-box w-6/12">{createNewsCards(data)}</div >
    )
}
function createNewsCards(data: string | any[]) {
    const res_news_cards = []
    for (var i = 0; i < data.length; i++) {
        var news_article = data[i];
        // <p>{news_article.category} {news_article.datetime}</p
        res_news_cards.push(<div className="carousel-item"><NewsCard category={news_article.category}
            date={news_article.datetime} image={news_article.image} summary={news_article.summary} headline={news_article.headline}
            source={news_article.source} url={news_article.url}
        /> </div>);
    }
    return res_news_cards;
}

export default StockNews