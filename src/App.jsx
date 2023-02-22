import { react, useState } from 'react'
import './App.css'




function App() {
  const [ contactList, setContactList ] = useState([]);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ address, setAddress ] = useState("");
  
  function downloadFile (e, name, email, address) {
  e.preventDefault()

  const data = {name: name, email: email, address: address}
  console.log(data)
  fetch('/addContact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    console.log(res)
  }
  )
  
  setName("")
  setEmail("")
  setAddress("")
  //console.log(document.getElementById("name"))

  // const element = document.createElement("a");
  // const file = new Blob([name, email, address], {
  //   type:"text/plain;charset=utf-8",
  // });
  
  // element.href = URL.createObjectURL(file);
  // element.download = "myfile.txt";
  // document.body.appendChild(element);
  // element.click();

}

function getContacts (e) {
  e.preventDefault()
  fetch('/getContacts')
 
  .then((response) => response.json())
  .then((response) => {
    const data = response.toString().split("\n")
    const newData = []
    const createObjectFromString = (str) => {
      return eval(`(function () { return ${str}; })()`);}
  for (let i = 0; i < data.length - 1; i++){
    newData.push(createObjectFromString(data[i]))
    }
  
    
    console.log('data: ', newData)
  setContactList(newData)
  console.log('contactList: ', contactList)
}
  )
  
}
const contacts = [];
if (contactList.length > 0) {
  for (let i = 0; i < contactList.length; i++){
      contacts.push(<div style={{display: "flex", justifyContent: "space-around"}}>
        <div><h4>Name: {contactList[i].name}</h4> </div>
        <div><h4>Email: {contactList[i].email}</h4> </div>
        <div><h4>Address: {contactList[i].address}</h4> </div>
        </div> 
      )
  }
}
  // console.log(response.body)
  const columns = [
    {field: name, headerName: "Name", headerAlign: "center"},
    {field: email, headerName: "Email", headerAlign: "center"},
    {field: address, headerName: "Address", headerAlign: "center"}
  ]

 
console.log('contact list:', contactList)
  return (
    <div className="App">
      <h1><center>Contact Directory</center></h1>
      <form id="myForm" onSubmit={e => downloadFile(e, name, email, address)}>
        <label for="name">Name:</label><br />
        <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} required></input> <br />
        <label for="email">Email:</label><br />
        <input type="text" id="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required></input><br />
        <label for="address">Address:</label><br />
        <input type="text" id="address" value={address} name="address" onChange={(e) => setAddress(e.target.value)}></input><br />
        <input type="submit" />
      </form>
      <div id="display">
       <button onClick={getContacts}>Get Contacts
       </button>
       <ol id="contactTable"></ol>
      </div>
     {contacts}
      
    </div>
  )
}

export default App
