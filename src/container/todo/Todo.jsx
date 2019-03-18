import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './todo.scss';
import { connect } from 'react-redux';

const Todo = (props) => {
    let { inputValue, todoList, handleDispatch } = props;
    return (
        <div className="todo-container">
            <AddTodo inputValue={inputValue} handleDispatch={handleDispatch} />
            <TodoList todoList={todoList} handleDispatch={handleDispatch} />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        todoList: state.todoList,
        inputValue: state.inputValue,
    }
}

const mapStateToDispatch = (displatch) => {
    return {
        handleDispatch: (action) => { displatch(action) }
    }
}

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Todo)
