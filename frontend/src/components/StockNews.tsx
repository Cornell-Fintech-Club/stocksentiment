import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import TopGainers from './TopGainers';

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
            const apiKey = "VRF428VYVZ9DUYOW"; // Use environment variable for API key
            const res = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKey}`);
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
        <div className="flex flex-col items-center p-5">
            <TopGainers />
            <div className="w-full max-w-4xl mt-5">
                <h1 className="text-3xl font-bold text-red-800 mb-4">News</h1>
                {isLoading ? (
                    <p className="text-center">Loading news...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {createNewsCards(data)}
                    </div>
                )}
            </div>
        </div>
    );
};

const createNewsCards = (data: NewsArticle[]) => {
    if (!Array.isArray(data)) return null;
    return data.map((news_article, i) => (
        <a href={news_article.url} className="block hover:bg-gray-100 p-3 rounded-lg shadow" key={i}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                {news_article.banner_image && (
                    <img src={news_article.banner_image} alt="News banner" className="w-full h-48 object-cover" />
                )}
                <div className="p-4 flex flex-col flex-grow">
                    <div>
                        <h3 className="text-lg font-bold mb-2">{news_article.title}</h3>
                        <p className="text-gray-700 text-sm flex-grow">{news_article.summary}</p>
                    </div>
                    <div className="mt-2">
                        <div className="text-center">
                            <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap mb-1">
                                {news_article.topics.length > 0 ? news_article.topics[0].topic : ''}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap">
                                {formatDate(news_article.time_published)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    ));
};

const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hours = dateString.slice(9, 11);
    const minutes = dateString.slice(11, 13);

    // Convert month number to the full month name
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[parseInt(month) - 1];

    // Determine AM/PM based on hours
    const amPm = parseInt(hours) >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    const formattedHours = (parseInt(hours) % 12) || 12;

    const formattedDate = `${monthName} ${day}, ${year} ${formattedHours}:${minutes}${amPm}`;
    return formattedDate;
};



const getMonthName = (month: number) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
};


// const formatDate = (dateString: string) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
//     return formattedDate;
// };

export default StockNews;
