import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'
import TodoListContract from './abis/TodoList.json'

function App() {

  const [inputText, setInputText] = useState('');
  const [todos, setTodoList] = useState([])
  const [status, setStatus] = useState('all')
  const [filterTodos, setFilterTodos] = useState([])
  
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

  const [accounts, getBlockchainData] = useState('')

  useEffect(() => {
    async function runLoadWeb3() {
      await loadWeb3()
      await getData()
      console.log(
        loadWeb3())
    }
    runLoadWeb3();
  },[])
   

  async function getData(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    getBlockchainData(accounts)

    // Network ID
    const networkID = await web3.eth.net.getId()
    console.log(networkID)

    const networkData = TodoListContract.networks[networkID]

    if (networkID){
      const contract = web3.eth.Contract(TodoListContract.abi, networkData)
      console.log(contract)
    }else{
      window.alert("Smart contract not deployed to the block chain")
    }
  }

  const loadWeb3 = async () => {
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.currentProvider)
    }
    else{
      window.alert("Non-Ethereum browser detected. You should consider trying metamask")
    }
  }
  return (
<div  className="App">
    <header>
      <h1>Simple To Do</h1>
    </header>
    <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodoList={setTodoList} setStatus={setStatus} />
    <TodoList todos={todos} setTodoList={setTodoList} filterTodos={filterTodos}/>
    </div>
  );
}

export default App;
