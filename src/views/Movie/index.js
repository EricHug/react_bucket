import React from 'react'
import MOVIE from '../../apis/movie'
import { Row,Col,Card,Skeleton } from 'antd'
import './index.less'
const { Meta } = Card

export default class Movie extends React.Component{
    state={
        movie:[],
        tv:[]
    }
    async componentDidMount(){
        let res = await MOVIE.query({
            type:'movie',
            tag: '热门',
            page_limit: 10,
            page_start: 0
        })
        let {data:{subjects}} = res
        if(subjects){
            this.setState({
                movie: subjects
            })
        }
    }
    render(){
        let movie = this.state.movie
        return(<div className="movie">
        <h1>MOVIE</h1>
        <div className="container">
            <Row gutter={16}>
            {
                movie.length>0?movie.map((item,index)=>{
                    return <Col span={8} key={index} style={{'marginTop':'20px'}}>
                        <a href ={item.url} target="blank">
                        <Card
                            hoverable
                            cover={<img alt="movie" src={item.cover} height="360"/>}
                        >
                            <Meta title={item.title} description={item.description} />
                        </Card>
                        </a>
                    </Col>
                }):<Skeleton active/>
            }
            </Row>
        </div>
        </div>)
    }
}