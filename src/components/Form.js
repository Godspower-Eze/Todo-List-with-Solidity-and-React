function Form({inputText,setInputText,todos,setTodoList, setStatus, contractInstance, setContractInstance, account}){
    const inputHandeler = (event) =>{
        setInputText(event.target.value)
    }
    const sumbitTextHandler = async (event) =>{
        event.preventDefault()
        await contractInstance.methods.createTasks(inputText).send({from:account})
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
    }
    return (
        <form>
        <input onChange={inputHandeler} value={inputText} type="text" className="todo-input" />
        <button onClick={sumbitTextHandler} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    )
}
export default Form;