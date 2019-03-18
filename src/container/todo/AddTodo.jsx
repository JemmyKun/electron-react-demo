import React from 'react';
import { Input, Button } from 'antd';
import { todoAction } from '../../actions/todoAction';

const AddTodo = (props) => {
    let { inputValue, handleDispatch } = props;
    return (
        <div className="add-box">
            <span className="add-input">
                <Input placeholder="add todo..." value={inputValue.data} onChange={(e) => {
                    let value = e.target.value;
                    let action = todoAction('CHANGE_INPUT_VALUE', value);
                    handleDispatch(action);
                }} onKeyDown={(e) => {
                    // e.persist();
                    let keyCode = e.keyCode;
                    if (keyCode === 13) {
                        let value = inputValue.data;
                        let action = todoAction('ADD_TODO', value);
                        handleDispatch(action);
                    }
                }} />
            </span>
            <span className="add-button">
                <Button type="primary" onClick={() => {
                    let value = inputValue.data;
                    let action = todoAction('ADD_TODO', value);
                    handleDispatch(action);
                }}>ADD</Button>
            </span>
        </div>
    )
}

export default AddTodo;