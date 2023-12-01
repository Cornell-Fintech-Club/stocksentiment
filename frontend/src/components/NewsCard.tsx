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
    const date = formatDate(props.date);
    console.log(date)
    var category = props.category
    var headline = props.headline.substring(0, 50) + '...'
    const summaryStartIndex = props.summary.indexOf("--");
    const summaryToShow = summaryStartIndex !== -1 ? props.summary.substring(summaryStartIndex + 2) : props.summary;
    var image = props.image == null ? "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?w=1480&t=st=1700425379~exp=1700425979~hmac=e2944d96862c8f458b51358bd6796393b4dca4b7b1faa26d8d48c3d856bc4378" : props.image

    return (
        <div className="flex bg-base-400 rounded-box my-2">
            <div className="w-1/4 flex items-center justify-center">
                <figure>
                    <img className="object-contain h-[100px] w-full ml-3" src={image} />
                </figure>
            </div>
            <div className="w-3/4 flex flex-col">
                <p className="font-bold text-left text-base ml-6">{headline}</p>
                <p className="text-left text-xs ml-6">{summaryToShow}</p>
                <div className="flex flex-row-reverse bottom-0 mt-6 mr-2">
                    <div className="badge badge-outline">{`${date}`}</div>
                    {
                        category == '' ? <div></div> : <div className="badge badge-outline mr-1">{category}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NewsCard