import React, { Component } from "react";
import TaskCol from "./TaskCol";
import TaskItem from "./TaskItem";

//设置任务状态
const STATUS_TODO = "STATUS_TODO"; //待处理
const STATUS_DOING = "STATUS_DOING"; // 进行中
const STATUS_DONE = "STATUS_DONE"; //已完成

const STATUS_CODE = {
  STATUS_TODO: "待处理",
  STATUS_DOING: "进行中",
  STATUS_DONE: "已完成",
};
// 任务列表
let tasks = [
  {
    id: 0,
    status: STATUS_TODO,
    title: "每周七天学习编程，学完之后认真做好笔记",
    username: "小郑",
    point: 10,
  },
  {
    id: 1,
    status: STATUS_TODO,
    title: "每周七天健身4次，每次健身时间需要大于20分钟",
    username: "小左",
    point: 5,
  },
  {
    id: 2,
    status: STATUS_TODO,
    title: "敲代码100行",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 3,
    status: STATUS_TODO,
    title: "敲代码150行",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 4,
    status: STATUS_TODO,
    title: "敲代码200行",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 5,
    status: STATUS_TODO,
    title: "敲代码300行",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
];

export default class App extends Component {
  state = {
    tasks: tasks,
    activeId: null,
  };
  /**
   * 传入被拖拽任务项的 id，开始拖拽
   */
  onDragStart = (id) => {
    console.log(id);
    this.setState({
      activeId: id,
    });
  };
  //停止拖拽，重置状态
  cancelSelect = () => {
   
    this.setState({
      activeId: null,
    });
  };
  //结束到达容器
  dragTo = (status) => {
    console.log(status);
    let { tasks, activeId } = this.state;
    let task = tasks[activeId];
    if (task.status !== status) {
      task.status = status;
      this.setState({
        tasks: tasks,
      });
    }
    this.cancelSelect();
  };

  render() {
    let { tasks, activeId } = this.state;
    let { onDragStart, onDragEnd, cancelSelect } = this; //将方法绑定在this上
    //console.log(this.state,this);
    return (
      <div className="task-wrapper">
        {/* 利用Object.keys() 方法把三种状态筛选出来 在使用map() 方法进行映射*/}
        {Object.keys(STATUS_CODE).map((status) => (
          <TaskCol
            status={status}
            key={status}
            dragTo={this.dragTo}
            canDragIn={activeId !== null && tasks[activeId].status !== status}
          >
            {tasks
              .filter((t) => t.status === status)
              .map((t) => (
                <TaskItem
                  key={t.id}
                  active={t.id === activeId}
                  id={t.id}
                  title={t.title}
                  point={t.point}
                  username={t.username}
                  onDragStart={onDragStart}
                  onDragEnd={cancelSelect}
                />
              ))}
          </TaskCol>
        ))}
      </div>
    );
  }
}
