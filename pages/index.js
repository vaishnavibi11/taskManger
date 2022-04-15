import Head from 'next/head'
import React from 'react'
import axios from 'axios'
import { Input, Avatar, Col,Row,Popover, Button } from 'antd';
import { Spin,Tag, message,Card,Tooltip } from 'antd';
import { useState } from 'react';

const { Search } = Input;


export default function Home() {
  const onSearch = value => console.log(value);
  const [value,setValue]=useState();
  const [reload,setReload]=useState(false);
  const [user,setUser]=useState([]);
  const [loading,setLoading]=useState(false);
  const [taskid,setTaskId]=useState("0");
  const [mesageText,setmesageText]=useState("");
  const [date,setDate]=useState("");
  const[assign,setAssign]=useState("");
  const [priority,setPriority]=useState("");
  React.useEffect(()=>{
    setLoading(true)
    const getData=async()=>{

      const data={url:'https://devza.com/tests/tasks/list',method:'GET'}
      const res= await axios.post('http://localhost:3000/api/listusers',data)
      console.log(res.data.data)
      setValue(res.data.data)
    }
    const getUser=async()=>{
      console.log()
      const data={url:'https://devza.com/tests/tasks/listusers',method:'GET'}
      const res= await axios.post(window.location.href+'api/listusers',data)
      console.log(res.data.data)
      setUser(res.data.data.users)
    }
    getUser()
    getData()
    setLoading(false)

  },[reload])

  const createTask=async()=>{
    const data={url:'https://devza.com/tests/tasks/create',method:'POST',
   message: mesageText,due_date:date,priority,assigned_to:assign}
    const res= await axios.post('http://localhost:3000/api/listusers',data)
    
    if(!res.data.data.error)
    {
      console.log(res.data.data)
      message.success("sucessfully added")
    setTaskId("0")
    setReload(item=>!item)
     setmesageText("");
     setAssign("")
     setDate("")
     setPriority("")
    }
    else{
      console.log(res.data.data)
     
      message.error(res.data.data.error)
    }
  }
  const deleteTask=async(taskid)=>{
    const data={url:'https://devza.com/tests/tasks/delete',method:'POST',taskid,
   message: mesageText,due_date:date,priority,assigned_to:assign}
    const res= await axios.post('http://localhost:3000/api/listusers',data)
    
    if(!res.data.data.error)
    {
      console.log(res.data.data)
      message.success("sucessfully deleted")
    setTaskId("0")
     setmesageText("");
     setReload(item=>!item)
     setAssign("")
     setDate("")
     setPriority("")
    }
    else{
      console.log(res.data.data)
     
      message.error(res.data.data.error)
    }
  }

  const updateTask=async()=>{
  const data={url:'https://devza.com/tests/tasks/update',method:'POST',taskid,
   message: mesageText,due_date:date,priority,assigned_to:assign,taskid}
    const res= await axios.post('http://localhost:3000/api/listusers',data)
    
    if(!res.data.data.error)
    {
      console.log(res.data.data)
      message.success("sucessfully updated")
    setTaskId("0")
     setmesageText("");
     setAssign("")
     setReload(item=>!item)
     setDate("")
     setPriority("")
    }
    else{
      console.log(res.data.data)
     
      message.error(res.data.data.error)
    }
  }

  return (
    <div >
      <Head>
        <title>Task Manger</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="position-relative">
  <main id="app" className="position-absolute m-auto">
    
    <div className="
          left__side
          d-flex
          align-items-center
          justify-content-between
          flex-column
        ">
      <div className="task__input">
        <input type="text" value={mesageText} onChange={(e)=>setmesageText(e.target.value)} placeholder="Enter Task Name" id="addtaskinput" autoFocus="" />
        <input type="date"  value={date} onChange={(e)=>{setDate(e.target.value);}} id="date" autoFocus="" />
        <select
                className="browser-default"
                id="priority"
                name="priority"
             value={priority}
                onChange={(e)=>{setPriority(e.target.value+"")}}

                required
              >
                <option value="" disabled>
                  Priority
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <select
                className="browser-default"
                id="user"
                name="user"
              value={assign}
                onChange={(e)=>{setAssign(e.target.value+"")}}
                required
              >
                <option value="" disabled>
                  User
                </option>
                {user&&user.map(item=> <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
        
      </div>
      <div className="task__input">
        
      </div>
      <div className="task__controls">
        <a href="#" type="button" onClick={taskid==="0"?createTask:updateTask} id="addtaskbtn">
          <img src="https://raw.githubusercontent.com/bhupenderhere/to-do-list-web-application/658cbe1ec20867d446ab3b919d52d4dbb5fa833b/images/svg/add.svg" alt="add" />
          <span>{taskid==="0"?"Add Task":"Update Task"}</span>
        </a>
      </div>
    </div>
    
    <div className="right__side">
      <div className="search__bar">
        <form className="d-flex align-items-center justify-content-center">
          <input placeholder="Search Task" id="searchtextbox" />
        </form>
      </div>
      <div className="to__do__list">
        <table id="addedtasklist">
        
    {loading?<tbody><td><Spin/></td></tbody>:<tbody>
   {value&&value.tasks.map((item,index)=>
    <Popover key={index} content={<div><p style={{display:'flex'}}><p style={{fontWeight:'bold'}}>created At :</p>{item.created_on.split(" ")[0]}</p>
    <p style={{display:'flex'}}><p style={{fontWeight:'bold'}}>Due Date :</p>{item.due_date&&item.due_date.split(" ")[0]}</p>
    <p style={{display:'flex'}}>priority<Tag>{item.priority}</Tag></p><Button onClick={()=>{
      setmesageText(item.message);
      setAssign(item.assigned_to)
      setDate(item.due_date.split(" ")[0])
      setPriority(item.priority)
      setTaskId(item.id)
    }}>edit</Button></div>} title={"Assigned: "+item.assigned_name}>
      <tr>
      <th scope="row">{index+1}</th>
      <td>
     {item.message}
      
     </td>
      <td>
        
        <button type="button" onClick={()=>deleteTask(item.id)}  className="text-danger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11V17"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11V17"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </td>
    </tr></Popover>)}
    </tbody>}
        </table>
      </div>
    </div>
  </main>
</div>
      <div>

      </div>
    </div>
  )
}
