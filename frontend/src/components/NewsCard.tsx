import React from 'react'

function NewsCard(props: any) {
    return (
        <div className="card card-compact card-bordered w-96 bg-base-100">
            <a href={props.url}>
                <figure><img src={props.image} alt="LOL" /></figure>
                <div className="card-body">
                    <p className="card-title">{props.headline}
                    </p>
                    <p>{props.summary}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{props.category}</div>
                        {/* <div className="badge badge-outline">Products</div> */}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NewsCard