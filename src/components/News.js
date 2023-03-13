import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string      
    }

    captializeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],              
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.captializeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading: false});
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles: this.state.articles.concat(parseData.articles), 
            totalResults: parseData.totalResults
            });

      };

    render() {
        return (
        <>
            <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
            <div className="container">        
            <div className="row">
                {   
                    this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage?element.urlToImage:'images/Image not found.jpg'} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                            </div>   
                    })
                }
            </div>
            </div>
            </InfiniteScroll>
        </>
        )
  }
}

export default News
