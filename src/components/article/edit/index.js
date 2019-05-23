import React from 'react'
import { AddTitle } from '../../../style'
import { Input, Form, Button, notification } from 'antd';
import axios from 'axios'

const { TextArea } = Input;


class Edit extends React.Component {

  state = {
    data: {}
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post("/article/edit", values).then(() => {
          this.setState({
            data: {
              title: '',
              author: '',
              article: ''
            }
          })
          console.log(this.state)
          const tip = {
            message: "修改文章成功",
            description: ""
          }
          this.openNotification(tip)
          this.props.history.push('/article/list')
        })
      }
    }).catch(() => {
      const tip = {
        message: "修改文章失败",
        description: ""
      }
      this.openNotification(tip)
    });
  };

  openNotification = (tip) => {
    notification.open({
      message: tip.message,
      description: tip.description,
      onClick: () => {
        this.props.history.push('/article/list')
      },
    });
  };

  componentDidMount() {
    var id = this.props.match.params.id
    axios.get("/article/edit", { params: { id } }).then((res) => {
      var result = res.data
      console.log(res)
      this.setState({
        data: result
      })
    }).catch(() => {
      window.alert("服务器异常")
    })
  }


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
        <AddTitle>修改文章</AddTitle>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="">
            {getFieldDecorator("id", {
              initialValue: this.state.data.id
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label="文章标题：">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入文章标题',
                },
              ],
              initialValue: this.state.data.title
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
              initialValue: this.state.data.author
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
              initialValue: this.state.data.article
            })(<TextArea placeholder="请输入文章内容"
              autosize={{ minRows: 20, maxRows: 50 }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const ArticleEdit = Form.create({ name: 'submit' })(Edit);

export default ArticleEdit