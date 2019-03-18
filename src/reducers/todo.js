const setStorage = (storage) => {
    window.localStorage['todoList'] = JSON.stringify(storage);
}
const getStorage = (storage) => {
    let data = window.localStorage['todoList'];
    if (data) {
        let todoList = JSON.parse(data);
        return todoList;
    } else {
        return []
    }
}

let id = Date.now();
let init = getStorage();
const todoList = (data = init, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            let newData = [...data, {
                name: action.data,
                id: id++,
                createTime: window.Date.now(),
                isEditting: false
            }];
            setStorage(newData);
            return newData
        case 'DELETE_TODO':
            let index = action.data;
            data.splice(index, 1);
            setStorage(data);
            return [...data]
        default:
            return data
    }
}

let value = {
    data: ''
};
const inputValue = (data = value, action) => {
    switch (action.type) {
        case 'CHANGE_INPUT_VALUE':
            return Object.assign({}, action)
        default:
            return value
    }
}

export {
    todoList,
    inputValue
}