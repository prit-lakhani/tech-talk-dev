import React, { useState } from 'react'
import { Button, Row, Col, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postReducer,titleReducer } from '../../../features/PostSlice'
import Constants from  '../../util/Constants.json'
import axios from 'axios'
import {Helmet} from 'react-helmet';

const MainTopCard = () => {
  const dispatch = useDispatch();
  const obj = useSelector(state => state.DashboardTopSlice)
  const obj1 = useSelector(state=> state.PostSlice)

  const { Title } = obj.value
  const [title, settitle] = useState("Interesting")

  const {questionsCount} = obj1.value

  var navigate = useNavigate();
  const askquestion = () => {
    navigate('/askQuestion')
  }
  const getanswer = () => {
    navigate('/getAnswer')
  }
  const openInteresting = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=interesting`);
    dispatch(postReducer(res.data.questionsForDashboard));
    dispatch(titleReducer("Interesting"))
     settitle("Interesting")
  }
  const openHot = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=hot`);
    dispatch(postReducer(res.data.questionsForDashboard));
    dispatch(titleReducer("Hot"))
    settitle("Hot")    
  }
  const openScore = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=score`);
    dispatch(postReducer(res.data.questionsForDashboard));
    dispatch(titleReducer("Score"))
    settitle("Score")
   
  }
  const openUnanswered = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=unanswered`);
    dispatch(postReducer(res.data.questionsForDashboard));
    dispatch(titleReducer("Unanswered"))
    settitle("Unanswered")
 
  }
  return (
    <div>
      <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
      <Helmet>
                <style>{'body { background-color: beige; }'}</style>
        </Helmet>
        <Row>
          <Col sm={9}>
            <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>All Questions</text>
          </Col>
          <Col>
            <Button style={{backgroundColor:"hsl(206deg 100% 52%)", marginLeft: "-75px"}} onClick={askquestion}>Ask Question</Button>
          </Col>
          <Col>
            <Button style={{ backgroundColor: "hsl(200, 60%, 35%)", marginRight: "15px" }} onClick={getanswer}>Get Instant Answer</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={3}>
            <text><span style={{fontWeight:'bold'}}>{questionsCount}</span> Questions</text>
          </Col>
          <Col style={{marginRight:"48px"}} sm={2}></Col>
          <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
            <button style={title == "Interesting" ? { backgroundColor: "#D0D0D0", marginRight:"1px", borderWidth:"1px" } : { backgroundColor:"white",marginRight:"1px", color:"hsl(210deg 8% 45%)", borderWidth:"1px"  }} onClick={openInteresting}>Interesting</button>
            <button style={title == "Hot" ? { backgroundColor: "#D0D0D0",marginRight:"1px" , borderWidth:"1px" } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px"  }} onClick={openHot}>Hot</button>
            <button style={title == "Score" ? { backgroundColor: "#D0D0D0",marginRight:"1px" , borderWidth:"1px" } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px"  }} onClick={openScore}>Score</button>
            <button style={title == "Unanswered" ? { marginRight: "1rem", backgroundColor: "#D0D0D0",marginRight:"1px", borderWidth:"1px"  } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px" }} onClick={openUnanswered}>Unanswered</button>
          </Col>

          <Col>
          </Col>
        </Row>
      </div>

      <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
    </div>
  )
}

export default MainTopCard