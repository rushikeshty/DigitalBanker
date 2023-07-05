import React, { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'




export const multiStepContext = createContext();






function showAlert() {
    const confirmation = window.confirm("Data submitted succesfully.");
    if (confirmation) {
      window.location.href = `${process.env.REACT_APP_SERVER_URL}/`;
    }
  }
  
export default function StepContext(props) {
    const history = useHistory();
    const [currentStep , setCurrentStep] = useState(1);
    const [userData , setUserData] = useState([]);
    const [finalData , setFinalData] = useState([]);
const [transferData , setTransferData] = useState([]);

  async  function submitData(){
        setFinalData(finalData => [...finalData,userData]);
        console.log(userData)
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/add`, userData);
        setUserData('');
        setCurrentStep(1);
        history.push("/customers");
     }

  async  function sendMoney() {
     await axios.post(`${process.env.REACT_APP_SERVER_URL}/customer/money` , transferData);
        history.push("/customers");
    }
 
    return (
       <multiStepContext.Provider value={{currentStep, setCurrentStep,userData , setUserData,finalData , setFinalData, submitData,transferData,setTransferData,sendMoney}}>
           {props.children}
       </multiStepContext.Provider>
    )
}
