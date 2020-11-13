function Todo({text,todo, setTodoList, todos}){
    // const deleteTodoList = (event) => {
    //     setTodoList(todos.filter(el => el.id !== todo.id))
    // }
    // const completedTodo = () => {
    //     setTodoList(todos.map((el) => {
    //         if (el.id === todo.id){
    //             return {
    //                 ...el,
    //                 completed: !el.completed
    //             }
    //         }
    //         return el
    //     }))
    // }
    return (
        <div className="todo">
            <li className='todo-item'>Hey</li>
            <button className="complete-btn"><i className="fas fa-check"></i></button>
            <button className="trash-btn"><i className="fas fa-trash"></i></button>
        </div>
    );
}

export default Todo;