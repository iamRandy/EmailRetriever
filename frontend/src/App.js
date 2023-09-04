import './App.css';
import {useState} from "react";
import Axios from 'axios';
import image from './IMG_4473.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {

  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [password, setPassword] = useState("");
  
  const [buttonColor, setButtonColor] = useState("");
  const [display, setDisplay] = useState("none");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup

  const checkPassword = () => {
    if(password.trim() === "password"){
      setDisplay("flex");
    }else{
      console.log(password, " is incorrect");
    }
  }

  const openPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const showEmails = () => {
    Axios.get('https://email-retriever-1hss.vercel.app/api/grab').then((response) => {
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

    Axios.post("https://email-retriever-1hss.vercel.app/api/send", {
      email: email
    }).then(() => {
      console.log("Success");
      setButtonColor('green');
      openPopup();
    }).catch(error => {
      console.log("Error caught: ", error);
    })
  }

  return (
    <div className="App">
      <h1>3X PROFIT in 3 MONTHS</h1>
      <h3>Get Your FREE PDF Guide, Tutorial Videos, and Insights Today!</h3>
      <div className="imageContainer">
        <img className="headerImage" src={image} alt="headerImage" />
      </div>
      <div className="listContainer">
        <div className="listItems">
          <ul>
            <li>Elevate your advertising game with our comprehensive guide!</li>
            <li>Create retargeting audiences with affinity scores!</li>
            <li>Hyper-target to your local or broad audience!</li>
          </ul>
        </div>
      </div>
      <input type="text" onChange={(event) => {
        setEmail(event.target.value);
      }} placeholder="ENTER EMAIL HERE" /><br />
      <h2 style={{color: 'red'}}>⬇️ Click below to instantly access your FREE resources and take your advertising to the next level! ⬇️</h2>
      
      <button style={{ 
        backgroundColor: buttonColor
      }} onClick={addEmail}>Submit</button>

      <Popup open={isPopupOpen} modal nested onClose={closePopup}>
        {(close) => (
          <div className='modal'>
            <div className='modalButtonContainer'>
              <button
                className='modalbutton'
                style={{ height: '10%', width: '5%' }}
                onClick={() => {
                  closePopup();
                }}
              >
                X
              </button>
            </div>
            <div className='content'>
              <h2 className="thankyou" style={{ display: 'flex', justifyContent: 'center' }}>
                Thank you for signing up!
              </h2>
            </div>
          </div>
        )}
      </Popup>


      <div className='adminlogincontainer'>
        <div className='loginContainer'>
      
          <input type="text" className="login" placeholder="admin password" onChange={(event) => {
            setPassword(event.target.value);
          }}/>
          <button className="loginButton" onClick={checkPassword}>Login</button>

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