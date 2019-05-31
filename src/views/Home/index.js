import React from 'react'
import {Link} from 'react-router-dom'
import store from '../../redux/store'
import { Spin,Divider,Button } from 'antd'
import {connect} from 'react-redux'
import counter from '../../redux/actions/counter'
import './index.less'

class Home extends React.Component{
    timer = null
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{})
        console.info('componentWillMount')
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.setState({
                loading: false
            })
        },200)
        console.info('componentDidMount')
    }
    componentWillUnmount(){
        this.unsubscribe()
        clearTimeout(this.timer)
        console.info('componentWillUnmount')
    }
    shouldComponentUpdate(nextProps, nextState){
        console.info('shouldComponentUpdate',{nextProps, nextState})
        return true
    }
    componentWillUpdate(){
        console.info('componentWillUpdate')
    }
    componentDidUpdate(){
        console.info('componentDidUpdate')
    }
    componentWillReceiveProps(){
        console.info('componentWillReceiveProps')
    }
    render(){
        console.info('render')
        let loading = this.state.loading
        return(
            <Spin spinning={loading} tip="Loading...">
            
            <div className="home">
                    <div style={{display:loading?'none':'block'}}>
                        <div>
                            THIS IS HOMEPAGE
                        </div>
                        <Divider />
                        <div>
                            WELCOME BUDDY
                        </div>
                        <Divider />
                        <div>
                            <h2>redux</h2>
                            <Button
                                type="primary"
                                icon="minus"
                                onClick={this.props.decrease}
                                >MINUS</Button>
                            <span className="mg20">COUNT:{this.props.count}</span>
                            <Button
                                type="primary"
                                icon="plus"
                                onClick={this.props.increase}
                                >PLUS</Button>
                        </div>
                        <Divider />
                        <div>
                            <h2>router</h2>
                            <Link className="mg10" to="/game">game</Link><br/>
                            <Link className="mg10" to="/antzone">antzone</Link><br/>
                        </div>
                        <Divider />
                        <div>
                            <h2>axios</h2>
                            <Link className="mg10" to="/movie">movie</Link>
                        </div>
                    </div>
            </div>
            </Spin>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        count:state.count
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        increase:()=>{
            dispatch(counter.increase())
        },
        decrease:()=>{
            dispatch(counter.decrease())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)