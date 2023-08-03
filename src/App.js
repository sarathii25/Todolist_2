import AddNewItem from "./AddNewItem";
import "./App.css";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import ApiRequest from "./ApiRequest";

function App() {
  // const todolist = [
  //   {
  //     id: 1,
  //     checked: true,
  //     task: "Code Today",
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     task: "Play Cricket",
  //   },
  //   {
  //     id: 3,
  //     checked: true,
  //     task: "Watch Movies",
  //   },
  // ];

  const API_LINK = "http://localhost:3005/todolist"
  //state for initial taskitems
  const [taskItem, setTaskItem] = useState([]); //Calling from the local storage

  //state for adding new item
  const [newItem, setNewItem] = useState("");

  //state for search item 
  const [search, setSearch] = useState("");

  useEffect(()=>{
   const fetchData = async ()=> {
    try{
      const response = await fetch(API_LINK)
      const listItems = await response.json()
      setTaskItem(listItems)
    }
    catch(err){
      console.log(err.message);
    }
   }
   fetchData()
  //  (async () => await fetchData())() Both the function call can be used, last extra brackets for kickstart
  },[])

  //handling checkbox
  const handleCheck = async (id) => {
    const copytask = taskItem.map((eachTask) =>
      eachTask.id === id
        ? { ...eachTask, checked: !eachTask.checked }
        : eachTask
    );
    setTaskItem(copytask);
    // localStorage.setItem("todo_list",JSON.stringify(copytask)) //saving the items in the localstorage
    const myItem = copytask.filter((items) => items.id === id)
    const updateOptions = {
      method : "PATCH",
      headers : {
        'Content-type':'application/json'
      },
       body : JSON.stringify({checked:myItem[0].checked}) 
    }
    const REQ_LINK = `${API_LINK}/${id}`
    const  result = await ApiRequest(REQ_LINK,updateOptions)
    
  };

  //handling delete icon in the list
  const handleDelete = async (id) => {
    const deletetask = taskItem.filter((deleteTask) => deleteTask.id !== id);
    setTaskItem(deletetask);
    // localStorage.setItem("todo_list",JSON.stringify(deletetask))//saving the items in the localstorage
    const deletOptions = {
      method:"DELETE"
    }
    const REQ_LINK = `${API_LINK}/${id}`
    const  result = await ApiRequest(REQ_LINK,deletOptions)
    
  };

  //adding item to the list
  const addItem = async(task) => {
    // console.log(task)
    const id = taskItem.length ? taskItem[taskItem.length - 1].id + 1 : 1; //for creating unique id
    const newListItem = { id, checked: false, task }; //structure of initial objects for maintaining same order
    const listItems = [...taskItem, newListItem]; //assiging old items to newitems
    setTaskItem(listItems);
    // localStorage.setItem("todo_list",JSON.stringify(listItems))//saving the items in the localstorage

    const postOptions = {
      method : "POST",
      headers : {
        'Content-type':'application/json'
      },
       body : JSON.stringify(newListItem) 
    }
    const  result = await ApiRequest(API_LINK,postOptions)
    // if(!result.ok)
  };

  //handling form submit from the addnewitem component
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    if (!newItem) return;
    addItem(newItem);
    setNewItem(""); //clearing the text box
  };

  return (
    <div className="App">
      <Header />

      <AddNewItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        taskItem={taskItem.filter((eachTaskItem) =>
          eachTaskItem.task.toLowerCase().includes(search.toLowerCase()) //Filtering the search based on the input
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer />
    </div>
  );
}

export default App;
