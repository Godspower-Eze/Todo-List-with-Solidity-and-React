import Todo from './Todo'

function TodoList({todos, setTodoList, filterTodos}){
    return (
    <div className="todo-container">
        <ul className="todo-list">
            {
                todos.map((todo)=>(
                    <Todo key={todo.id} todo={todo} content={todo.content} todos={todos} setTodoList={setTodoList} />
                ))
            }
        </ul>
    </div>
    )
}
export default TodoList;