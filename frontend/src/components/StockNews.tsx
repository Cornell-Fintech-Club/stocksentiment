import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

interface NewsArticle {
    url: string;
    topics: { topic: string }[];
    time_published: string;
    banner_image: string;
    summary: string;
    title: string;
    source: string;
}

const StockNews: React.FC = () => {
    const [data, setData] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Call the API every 60 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const apiKey = "VRF428VYVZ9DUYOW";
            const res = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${apiKey}`);
            if (Array.isArray(res.data.feed)) {
                setData(res.data.feed);
            } else {
                setError('Data format issue: Feed is not an array');
                console.error('Data format issue: Feed is not an array');
            }
        } catch (error) {
            setError('Error fetching stock data');
            console.error('Error fetching stock data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center px-5">
            <div className="w-full">
                <h1 className="text-3xl font-bold text-red-800 mb-4">News</h1>
                {isLoading ? (
                    <p className="text-center">Loading news...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {createNewsCards(data, false)}
                    </div>
                )}
            </div>
        </div>
    );
};

export const StockNewsRow: React.FC = () => {
    const [data, setData] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const apiKey = "VRF428VYVZ9DUYOW";
            const res = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${apiKey}`);
            if (Array.isArray(res.data.feed)) {
                setData(res.data.feed.slice(0, 5));
            } else {
                setError('Data format issue: Feed is not an array');
                console.error('Data format issue: Feed is not an array');
            }
        } catch (error) {
            setError('Error fetching stock data');
            console.error('Error fetching stock data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mx-5 my-5 bg-white rounded-xl">
            <div className="w-full p-4">
                <div className='flex flex-row space-between'>
                    <h1 className="text-2xl font-bold text-red-800 ml-2 text-left">News</h1>
                </div>
                {isLoading ? (
                    <p className="text-center">Loading news...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div className="w-full overflow-hidden">
                        <div className="flex row inline-block space-x-4 py-2">
                            {createNewsCards(data, true)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const createNewsCards = (data: NewsArticle[], isRow: boolean) => {
    if (!Array.isArray(data)) return null;
    return data.map((news_article, i) => (
        <a href={news_article.url} className={`block hover:bg-gray-100 rounded-lg w-full h-full`} key={i}>
            <NewsCard isRow={isRow} news_article={news_article} />
        </a>
    ));
};

export default StockNews;
