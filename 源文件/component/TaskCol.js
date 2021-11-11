import React, { Component } from "react";

const STATUS_CODE = {
  STATUS_TODO: "待处理",
  STATUS_DOING: "进行中",
  STATUS_DONE: "已完成",
};

export default class TaskCol extends Component {
  //做一个开关，控制任务进入范围的显示背景变化
  state = {
    in: false,
  };
  //进入任务范围内
  handleDragEnter = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
        this.setState({
            in: true
        })
    }
}
  //离开当前任务范围
  handleDragLeave = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
        this.setState({
            in: false
        });
    }
}
  //释放拖拽之后
  handleDrop = (e) => {
    e.preventDefault();
    this.props.dragTo(this.props.status);
    this.setState({
      in: false,
    });
  };
  render() {
    let { status, children } = this.props;
    //console.log(this.props);
    return (
      <div
        id={`col-${status}`}
        className={"col"}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragEnter}
        onDrop={this.handleDrop}
      >
        <header className="col-header">{STATUS_CODE[status]}</header>
        <main className={"col-main" + (this.state.in ? " active" : "")}>
          {children}
        </main>
      </div>
    );
  }
}
