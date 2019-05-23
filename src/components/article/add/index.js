import React from 'react'
import { AddTitle } from '../../../style'
import { Input, Form, Button, notification } from 'antd';
import './style.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const { TextArea } = Input;


class Article extends React.Component {


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post("/article/new", values).then(() => {
          const tip = {
            message: "添加文章成功",
            description: "点击返回继续添加内容"
          }
          this.openNotification(tip)
          this.props.history.push('/article/list')
        })
      }
    });
  };

  openNotification = (tip) => {
    notification.open({
      message: tip.message,
      description: tip.description,
      onClick: () => {
        this.props.history.push('/article/add')
      },
    });
  };


  render() {



    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },

    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 3,
        },
        sm: {
          span: 16,
          offset: 3,
        },
      },
    };



    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <AddTitle>添加文章</AddTitle>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="文章标题：">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入文章标题',
                },
              ],
            })(<Input placeholder="请输入文章标题" />)}
          </Form.Item>
          <Form.Item label="作者">
            {getFieldDecorator('author', {
              rules: [
                {
                  required: true,
                  message: '请输入作者',
                },
              ],
            })(<Input placeholder="请输入作者" />)}
          </Form.Item>
          <Form.Item label="文章内容">
            {getFieldDecorator('article', {
              rules: [
                {
                  required: true,
                  message: '请输入文章内容',
                },
              ],
            })(<TextArea placeholder="请输入文章内容"
              autosize={{ minRows: 20, maxRows: 50 }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">发布</Button>&nbsp;
            <Link to="/article/list">
              <Button type="danger">
                取消
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const ArticleAdd = Form.create({ name: 'submit' })(Article);

export default ArticleAdd