import React from 'react';
import { Icon, Input } from 'antd';
import { format } from 'date-fns';
import { todoAction } from '../../actions/todoAction';

const TodoList = (props) => {
    let { handleDispatch } = props;
    let todoList = props.todoList || [];
    return (
        <ul className="todo-list-box">
            {
                todoList.map((item, index) => {
                    let { name, createTime, isEditting } = item;
                    return (
                        <li key={index}>
                            {
                                isEditting ? <Input value={name} /> : <span className="todo-name">{name}</span>
                            }
                            <span>{format(createTime, 'YYYY-MM-DD hh:mm:ss')}</span>
                            <Icon type="edit" onClick={() => {

                            }} />
                            <Icon type="delete" onClick={() => {
                                let action = todoAction('DELETE_TODO', index);
                                handleDispatch(action);
                            }} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default TodoList;