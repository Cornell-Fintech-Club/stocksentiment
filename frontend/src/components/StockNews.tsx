import React from 'react';
import NewsCard from './NewsCard';

const StockNews = () => {
    return (
        <div className="carousel carousel-center rounded-box w-6/12">
            <div className="carousel-item">
                <NewsCard />
            </div>
            <div className="carousel-item">
                <NewsCard />
            </div>
            <div className="carousel-item">
                <NewsCard />
            </div>
        </div>

    )
}

export default StockNews