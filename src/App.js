import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'
import TodoListContract from './abis/TodoList.json'

function App() {

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('all')
  const [filterTodos, setFilterTodos] = useState([])
  const [account, getBlockchainData] = useState('')
  const [todos, setTodoList] = useState([])
  const [contractInstance, setContractInstance] = useState('')
  
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



  useEffect(() => {
    async function runLoadWeb3() {
      await loadWeb3()
      await getData()
      console.log(todos)
    }
    runLoadWeb3();
  },[])
   

  async function getData(){
    const web3 = window.web3

    const account = await web3.eth.getAccounts()
    getBlockchainData(account[0])

    // Network ID
    const networkID = await web3.eth.net.getId()

    const networkData = TodoListContract.networks[networkID]


    if (networkID){
      const contract = new web3.eth.Contract(TodoListContract.abi, networkData.address)
      setContractInstance(contract)
      const taskCount = await contract.methods.taskCount().call()
      for(var i=1; i <= taskCount; i++){
        const task = await contract.methods.tasks(i).call()
        setTodoList([...todos, task])
      }
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
    <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodoList={setTodoList} setStatus={setStatus} contractInstance={contractInstance} setContractInstance={setContractInstance} account={account} />
    <TodoList todos={todos} setTodoList={setTodoList} filterTodos={filterTodos} contractInstance={contractInstance} setContractInstance={setContractInstance}/>
    </div>
  );
}

export default App;
