import React from 'react'

const NewsItem = (props) => {
        let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card mb-3" >
          <div>
            <span className="position-absolute badge rounded-pill text-bg-danger ms-auto p-2" style={{right: 0}}>{source}</span>
          </div>
            <img src={!imageUrl?"https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0007/0718/brand.gif?itok=npxPofXy":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className='text-muted'>By {author? author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
