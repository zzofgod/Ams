import React from 'react'
import { Table, Input, Button, Icon, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Qs from 'qs';

const confirm = Modal.confirm;

class List extends React.Component {
  state = {
    searchText: '',
    data: [],
    visible: false,
    selectedRowKeys: [],
    loading: false,
  };

  getData = () => {
    axios.get("/article").then((res) => {
      this.setState({
        data: res.data
      })
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };


  //删除选中
  start = (selectedRowKeys) => {
    var id = selectedRowKeys

    this.setState({ loading: true });
    var that = this
    confirm({
      title: '您确定要删除选中的文章吗？',
      content: '点击确定删除，删除后数据将无法恢复！',
      onOk() {
        return new Promise((resolve, reject) => {
          axios.get("/article/delete", {
            params: {
              id
            },
            paramsSerializer: function (params) {
              return Qs.stringify(params, { arrayFormat: 'repeat' })
            }
          }).then(() => {
            setTimeout(resolve, 500);
            that.getData()
            that.setState({
              selectedRowKeys: [],
              loading: false,
            });
          }).catch(() => {
            that.countDown("文章删除失败！")
          })
        }).catch(() => that.countDown("文章删除成功！"));
      },
      onCancel() { },
    });
  };


  componentWillMount() {
    this.getData()
  }

  //消息提示框
  countDown = (title) => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: title,
      content: `这个提示框将在 ${secondsToGo} 秒后关闭.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `这个提示框将在 ${secondsToGo} 秒后关闭.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }


  //删除文章
  showConfirm = (id) => {
    var that = this
    confirm({
      title: '您确定要删除这篇文章吗？',
      content: '点击确定删除，删除后数据将无法恢复！',
      onOk() {
        return new Promise((resolve, reject) => {
          axios.get("/article/delete", { params: { id } }).then(() => {
            setTimeout(resolve, 500);
            that.getData()
          }).catch(() => {
            that.countDown("文章删除失败！")
          })
        }).catch(() => that.countDown("文章删除成功！"));
      },
      onCancel() { },
    });
  }



  //搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  //重置
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        width: '10%',
        ...this.getColumnSearchProps('author'),
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: '40%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '点击',
        dataIndex: 'click',
        width: '10%',
        key: 'click',
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        ...this.getColumnSearchProps('time'),
      },
      {
        title: '操作',
        key: 'action',
        render: (text) => <div><Link to={"/article/edit/" + text.id} ><Button type="primary" >编辑</Button></Link> <Button type="danger" icon="warning" onClick={() => this.showConfirm(text.id)}>删除</Button></div>
      },

    ]

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return (<div>
      <div style={{ marginBottom: 16, marginTop: 20 }}>
        <Button type="danger" onClick={() => this.start(this.state.selectedRowKeys)} disabled={!hasSelected} icon="warning" loading={loading}>
          删除选中
        </Button>
        &nbsp;
        <Link to="/article/add">
          <Button type="primary" icon="plus">
            添加文章
        </Button>
        </Link>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `选中了 ${selectedRowKeys.length} 项` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={{ pageSize: 20 }}
        scroll={{ y: '750px' }}
      />

    </div>)
  }
}

export default List