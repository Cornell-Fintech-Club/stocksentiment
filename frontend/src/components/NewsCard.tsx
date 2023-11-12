import React from 'react'

function NewsCard(props: any) {
    const date = new Date(props.date * 1000)
    const day = date.toDateString().substring(3)
    var category = props.category
    category = category
        .split(' ')
        .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    return (
        <div className="card card-compact card-bordered w-96 bg-base-100">
            <a href={props.url}>
                <figure><img className="w-full h-[200px]" src={props.image} alt="LOL" /></figure>
                <div className="card-body">
                    <p className="card-title">{props.headline}</p>
                    <p>{props.summary}</p>
                    <div className="card-actions justify-end bottom-4 right-4 absolute">
                        <div className="badge badge-outline">{category}</div>
                        <div className="badge badge-outline">{`${day}`}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NewsCard