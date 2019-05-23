import React from 'react';
import Header from './components/header';
import { Row, Col } from 'antd'
import { BrowserRouter,Route } from 'react-router-dom'
import List from './components/article/list'
import Add from './components/article/add'
import Edit from './components/article/edit'


function App() {
  return (
    <div className="App">
      <Row>
      <BrowserRouter>
        <Col span={4}>
          <Header></Header>
        </Col>
        <Col span={20}>         
              <Route path="/article/list" exact component={List}></Route>
              <Route path="/article/add" exact component={Add}></Route>
              <Route path="/article/edit/:id" exact component={Edit}></Route>
        </Col>
        </BrowserRouter>
      </Row>
    </div>
  );
}

export default App;
