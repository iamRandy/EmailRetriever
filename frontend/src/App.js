import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [password, setPassword] = useState("");
  
  const [buttonColor, setButtonColor] = useState("");
  const [display, setDisplay] = useState("none");

  const checkPassword = () => {
    if(password.trim() === "password"){
      setDisplay("flex");
    }else{
      console.log(password, " is incorrect");
    }
  }

  const showEmails = () => {
    Axios.get('http://localhost:3001/grabEmails').then((response) => {
      setEmailList(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const addEmail = () => {
    if(email.trim() === "") {
      console.log("email field is empty");
      return;
    }

    Axios.post("http://localhost:3001/send", {
      email: email
    }).then(() => {
      console.log("Success");
      setButtonColor('green');
    }).catch(error => {
      console.log("Error caught: ", error);
    })
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='loginContainer'>
      
          <input type="text" className="login" placeholder="admin password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
          <button className="loginButton" onClick={checkPassword}>Login</button>

        </div>
      </div>
      <h1>Email Retriever</h1>
      <h3>Sub Heading</h3>
      <image alt="emailImg"></image>
      <input type="text" onChange={(event) => {
        setEmail(event.target.value);
      }} placeholder="Enter email here" /><br />
      <button style={{backgroundColor: buttonColor}} onClick={addEmail}>Submit</button>
      <div className="listContainer">
        <div className="listItems">
          <ul>
            <li>list item 1</li>
            <li>list item 2</li>
            <li>list item 3</li>
          </ul>
        </div>
      </div>

      <div className="adminContainer" style={{display: display}}>
        <label style={{fontSize: 10, fontWeight: "bold", marginRight: "93vw"}}>admin panel</label>

        <div className="showButtonContainer">
          <button className="showEmailsButton" onClick={showEmails}>Show Emails</button>
        </div>


        <div className="emailListContainer">

          {emailList.map((val, key) => {
            return <div key={key} className="emailList">
              <h3>{val.email}</h3>
            </div>
          })}

        </div>
      </div>
      
    </div>
  );
}

export default App;