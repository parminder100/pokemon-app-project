import Header from "../../Header/Header";
import "../News/News.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import Footer from "../../Footer/Footer";

const News = () =>{
    const [newsData, setNewsData] = useState([]);
    const [changeColor, setChangeColor] = useState(true);

    const handleChangeColor = () =>{
        setChangeColor(!changeColor);
    }
    const getFetchNews = async() =>{
        try {
            const response = await axios.get(
              'https://newsapi.org/v2/everything',
              {
                params: {
                  q: 'pokemon',
                  pageSize: 10,
                  language: 'en',
                  apiKey: 'd3e2061a1528457c964ddbec268a8dd2',
                },
              }
            );
        
            setNewsData(response.data.articles);
            console.log(response.data.articles);
          } catch (error) {
            console.error('Error fetching news:', error);
          }
    }
    useEffect(()=>{
        getFetchNews();
    },[])
    return(
        <>
            <div className="aboutus-header">
                <Header includeScrollFunctionality={false} changeColor={changeColor} handleChangeColor={handleChangeColor} />
            </div>
            <div className="news-content">
                <div className="container">
                    <div className="row">
                            {
                                newsData.map((news, index)=>(
                                    <>
                                        <div className={`col-sm-6 news-items ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
                                            <img className="w-100" src={news.urlToImage} alt={news.title} />
                                        </div>
                                        <div className={`col-sm-6 news-items ${changeColor ? "aboutus-dark-theme":"light-theme"} ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
                                            <p className="news-date">{news.publishedAt}</p>
                                            <h3>{news.title}</h3>
                                            <p>{news.description}</p>
                                        </div>
                                    </>
                                ))
                            }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default News;