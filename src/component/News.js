import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

 
  const capitalizeFirstLetter= (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  } 

  const updateNews = async() =>  {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles|| [])
    setTotalResults(parseData.totalResults)
    setLoading(false) 
    props.setProgress(100);

  }

  useEffect(()=>{
    document.title= `NewsMonkey- ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    //  eslint-disable-next-line;
  },[])

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // };

  //const  handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // };
  
  const fetchMoreData = async() => {
  const nextPage = page + 1;
  setPage(nextPage);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles || []));
    setTotalResults(totalResults);
  };

    return (
      <>
        <h2 className="text-center">NewsMonkey - Top  {capitalizeFirstLetter(props.category)} Headlines </h2>
        {loading && <Spinner />}
          <InfiniteScroll
          dataLength={(articles && articles.length) || 0}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-4">{articles.map((e,index) => {
            if (!e || !e.title || !e.url) return null;
              return (
                <div className="col-md-4" key={`${e.url}-${index}`}>
                  <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                </div>
              );
            })}
          </div>
        </div>
         </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick} > &larr; Previous </button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize) } type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }



 News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

export default News;