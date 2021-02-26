import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'
import TodoListContract from './abis/TodoList.json'

const address = '0xD2c90d9f819b4A0AD66afBc9F382121B788d19aa'

function App() {

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('all')
  const [filterTodos, setFilterTodos] = useState([])
  const [todos, setTodoList] = useState([])
  const [contractInstance, setContractInstance] = useState('')
  const [userAddresss, setuserAddresss] = useState('')

  
  // useEffect( () => {
  //   getFromLocalStorage()
  // },[])

  // useEffect(() => {
  //   filterTodosHandler()
  //   saveLocalStorage()
  // },[todos,status])

  // const saveLocalStorage = () => {
  //   localStorage.setItem('todos',JSON.stringify(todos))
  // }
  // const getFromLocalStorage = () => {
  //   if (localStorage.getItem("todos")=== null){
  //     localStorage.setItem("todos",JSON.stringify([]))
  //   }
  //   else {
  //     let localTodos = JSON.parse(localStorage.getItem("todos"))
  //     setTodoList(localTodos)
  //   }
  // }

  // const filterTodosHandler = () => {
  //   switch (status) {
  //     case 'completed':
  //       setFilterTodos(todos.filter(todo => todo.completed === true ))
  //       break;
  //     case 'uncompleted':
  //       setFilterTodos(todos.filter(todo => todo.completed === false  ))
  //       break;
  //     default:
  //       setFilterTodos(todos)
  //       break;
  //   }
  // }

  function createTasks(content){
    contractInstance.methods.createTasks(content).send({from: userAddresss}).once('receipt',(receipt)=>{
      console.log(receipt)
    })
  }

  useEffect(() => {
    async function runLoadWeb3() {
      await loadWeb3()
      await getData()
      console.log(todos)
    }
    runLoadWeb3();
  },[])
   

  async function getData(){
  
  }

  const loadWeb3 = async () => {
    const web3 = new Web3("http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    setuserAddresss(accounts[0])
    const todoList = new web3.eth.Contract(TodoListContract.abi,address)
    setContractInstance(todoList)
    const taskCount = await todoList.methods.taskCount().call()

    for (var i=1;i<=taskCount;i++){
      const task = await todoList.methods.tasks(i).call()
      setTodoList([...todos,task])
      console.log(task)
    }
  }
  return (
  <div className="App">
    <header>
      <h5>Todo By: {userAddresss}</h5>
    </header>
    <h1></h1>
    <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodoList={setTodoList} setStatus={setStatus} contractInstance={contractInstance} setContractInstance={setContractInstance} account={userAddresss} createTasks={createTasks}/>
    <TodoList todos={todos} setTodoList={setTodoList} filterTodos={filterTodos} contractInstance={contractInstance} setContractInstance={setContractInstance}/>
    </div>
  );
}

export default App;
