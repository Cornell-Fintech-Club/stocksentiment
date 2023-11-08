import React from 'react'

const NewsCard = () => {
    return (
        <div className="card card-compact card-bordered w-96 bg-base-100">
            <figure><img src="https://image.cnbcfm.com/api/v1/image/105569283-1542050972462rts25mct.jpg?v=1542051069&w=740&h=416&ffmt=webp&vtcrop=y" alt="LOL" /></figure>
            <div className="card-body">
                <p className="card-title">
                    Square surges after reporting 64% jump in revenue
                </p>
                <p>Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Technology</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard