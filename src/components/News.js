import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "news24",
    //             "name": "News24"
    //         },
    //         "author": "Heinz Schenk",
    //         "title": "The long-term heir to Bavuma's throne? De Zorzi insists such thoughts are 'far away'",
    //         "description": "Tony de Zorzi's elevation into the Proteas Test side might've been down to a steady rise in provincial cricket over the past few years, as well as some red-hot form this season, but there's a potentially longer game involved here too.",
    //         "url": "https://www.news24.com/sport/cricket/proteas/the-long-term-heir-to-bavumas-throne-de-zorzi-insists-such-thoughts-are-far-away-20230307",
    //         "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/2809/a97789e87bb24c8887dc0db2c58d97e8.jpg",
    //         "publishedAt": "2023-03-07T06:59:18+00:00",
    //         "content": "<ul><li>New Proteas Test batter Tony de Zorzi isn't focused on suggestions the start of his international career is paving a path towards captaincy.</li><li>Red-ball coach Shukri Conrad has publicly … [+3883 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]

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
        console.log('Hello I am a constructor from News component');
        this.state = {
            articles: [],              
            // this.articles,
            loading: false,
            page : 1
        }
        document.title = `${this.captializeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    
    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4fc8f113534c7d8b6e608132314081&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading: false});
    }

    async componentDidMount() {
        console.log('componentDidMount');
        // Before Refactoring 
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4fc8f113534c7d8b6e608132314081&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({articles: parseData.articles, 
        //     totalResults: parseData.totalResults,
        //     loading: false});
        this.updateNews();
    }
    componentDidUpdate () {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    handlePreviousClick = async () => {
        console.log('previous')
        // Before Refactoring
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4fc8f113534c7d8b6e608132314081&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({
        //     page : this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false
        // });
        this.setState({page: this.state.page - 1});
        setTimeout(()=>{this.updateNews()},20);
    }

    handleNextClick = async () => {
        console.log('next')
        // Before Refactoring
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20)))
        // {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4fc8f113534c7d8b6e608132314081&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true}); 
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     console.log(parseData);
        //     this.setState({
        //         page : this.state.page + 1,
        //         articles: parseData.articles,
        //         loading: false
        //     });
        // }
    
        this.setState({page: this.state.page + 1});
        setTimeout(()=>{this.updateNews()},20);
    }

    render() {
        console.log('render')
        return (
        <div className="container my-3">
            <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top {this.captializeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
                {   
                    !this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage?element.urlToImage:'images/Image not found.jpg'} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                            </div>   
                    })    
                }
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
  }
}

export default News
