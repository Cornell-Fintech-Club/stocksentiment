import React from 'react'

function formatDate(timePublished: any) {
    const year = timePublished.substring(0, 4);
    const month = timePublished.substring(4, 6);
    const day = timePublished.substring(6, 8);

    return `${getMonthName(month)} ${parseInt(day, 10)}, ${year}`;
}

function getMonthName(month: any) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months[parseInt(month, 10) - 1];
}

function NewsCard(props: any) {

    return (
        <div className={`bg-white rounded-lg ${props.isRow ? 'border-1 border-black' : 'border-none'} shadow-md overflow-hidden flex flex-col w-full h-full`}>
            {props.news_article.banner_image && (
                <img src={props.news_article.banner_image} alt="News banner" className={`w-full ${props.isRow ? 'h-40' : 'h-48'} object-cover`} />
            )}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between">
                    <div className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                        {formatDate(props.news_article.time_published)}
                    </div>
                    <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                        {props.news_article.topics.length > 0 ? props.news_article.topics[0].topic : ''}
                    </div>
                </div>
                <div className='mt-2'>
                    <h3 className={`font-bold ${props.isRow ? 'text-sm' : 'text-lg'}`}>{props.news_article.title.substring(0, 50) + '...'}</h3>
                </div>
            </div>
        </div>
    )
}

export default NewsCard