import React from 'react'

function NewsCard(props: any) {
    const date = new Date(props.date * 1000)
    const day = date.toDateString().substring(3)
    var category = props.category
    category = category
        .split(' ')
        .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    var headline = props.headline.substring(0, 2) == ": " ? props.headline.substring(2, 55) + '...' : props.headline.substring(0, 55) + '...'
    const summaryStartIndex = props.summary.indexOf("--");
    const summaryToShow = summaryStartIndex !== -1 ? props.summary.substring(summaryStartIndex + 2) : props.summary;

    return (
        <div className="flex bg-base-400 rounded-box my-2">
            <div className="w-1/4 flex items-center justify-center">
                <figure>
                    <img className="object-contain h-full w-full ml-3" src={props.image} />
                </figure>
            </div>
            <div className="w-3/4 flex flex-col">
                <p className="font-bold text-left text-base ml-6">{headline}</p>
                <p className="text-left text-xs ml-6">{summaryToShow}</p>
                <div className="flex flex-row-reverse bottom-0 mt-6 mr-2">
                    <div className="badge badge-outline">{`${day}`}</div>
                    <div className="badge badge-outline mr-1">{category}</div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard