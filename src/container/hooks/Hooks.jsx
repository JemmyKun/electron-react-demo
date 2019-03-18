import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'antd';
import { format } from 'date-fns';

const getStorage = (name) => {
    let storage = window.localStorage.getItem(name);
    let data = [];
    if (storage) {
        data = JSON.parse(storage);
    }
    return data;
}
const setStorage = (name = '', list = []) => {
    window.localStorage.setItem(name, JSON.stringify(list));
}

const Hooks = (props) => {
    const [todoList, setTodoList] = useState(getStorage('hooksList'));
    useEffect(() => {
        // console.log('list:', todoList);
    });

    const [value, setValue] = useState('');
    useEffect(() => {
        // console.log('value:', value);
    });

    const [newValue, setNewValue] = useState('');
    useEffect(() => {
        // console.log('setNewValue:', setNewValue);
    });

    return (
        <div className="todo-container">
            <h1>react-hooks-demo</h1>
            <div className="add-box">
                <span className="add-input">
                    <Input placeholder="add todo..." value={value} onChange={(e) => {
                        let val = e.target.value;
                        setValue(val);
                    }} onKeyDown={(e) => {
                        if (value === '') {
                            return false;
                        }
                        let keyCode = e.keyCode;
                        if (keyCode === 13) {
                            let item = {
                                name: value,
                                createTime: Date.now(),
                                isEditting: false
                            };
                            let newList = [...todoList, item];
                            setTodoList(newList);
                            setValue('');
                            setStorage('hooksList', newList);
                        }
                    }} />
                </span>
                <span className="add-button">
                    <Button type="primary" onClick={() => {
                        let item = {
                            name: value,
                            createTime: Date.now(),
                            isEditting: false
                        };
                        let newList = [...todoList, item];
                        setTodoList(newList);
                        setValue('');
                        setStorage('hooksList', newList);
                    }}>ADD</Button>
                </span>
            </div>
            <ul className="todo-list-box">
                {
                    todoList.map((item, index) => {
                        let { name, createTime, isEditting } = item;
                        return (
                            <li key={index}>
                                <span className="item-index">{index + 1}</span>
                                <span className="item-dot">:</span>
                                {
                                    isEditting ? <Input value={newValue} className="edit-name" onChange={(e) => {
                                        let val = e.target.value;
                                        setNewValue(val);
                                    }} onBlur={(e) => {
                                        if (newValue === '') {
                                            return false
                                        }
                                        todoList[index]['name'] = newValue;
                                        todoList[index]['isEditting'] = false;
                                        let newList = [...todoList];
                                        setTodoList(newList);
                                        setStorage('hooksList', newList);
                                    }} /> : <span className="todo-name">{name}</span>
                                }
                                <span>{format(createTime, 'YYYY-MM-DD hh:mm:ss')}</span>
                                <Icon type="edit" onClick={() => {
                                    let newValue = '';
                                    todoList.forEach((item, idx) => {
                                        if (index === idx) {
                                            newValue = item.name;
                                            item.isEditting = true;
                                        } else {
                                            item.isEditting = false;
                                        }
                                    })
                                    setNewValue(newValue);
                                    let newList = [...todoList];
                                    setTodoList(newList);
                                    setStorage('hooksList', newList);
                                }} />
                                <Icon type="delete" onClick={() => {
                                    todoList.splice(index, 1);
                                    let newList = [...todoList];
                                    setTodoList(newList);
                                    setValue('');
                                    setStorage('hooksList', newList);
                                }} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default Hooks