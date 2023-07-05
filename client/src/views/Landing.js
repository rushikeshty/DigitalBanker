import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Link } from "@material-ui/core";
import ReactDOM from "react-dom";
 import './styles.css';
 import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
  import Modal from "react-bootstrap/Modal";
 
import { MDBNavLink } from "mdbreact";
  
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


toast.configure()
function useLinePrinter(text) {
  const [currentText, setCurrentText] = React.useState('');

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setCurrentText((prevText) => prevText + text[i]);
      i++;
      if (i === text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return currentText;
}
function TextPrinter() {
  const text = "This is a simple banking system app through which you can create an account and transfer money with each other and see the details of it.";
  const currentText = useLinePrinter(text);

  return <p style={{ fontSize: "150%" }} className="mt-5 text-lg text-gray-300">{currentText}</p>;
}


function notify(){  
  toast.success('Customer added succesfully', {autoClose:3000,position:"bottom-left",onClose:()=>{
    Navigate()
  }})
   
}
function Navigate(){
  window.location.href = `${process.env.REACT_APP_SERVER_URL}/customers`;

}

function showDialogBox(title, message) {
  const modal = (
    <Modal centered show={true} backdrop="static">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
      <Button >
          Confirm
        </Button>
        <Button
          variant="primary"
          onClick={() =>
          notify()
          }
        >
          Close
        </Button>
        
      </Modal.Footer>

    </Modal>
  );

  ReactDOM.render(modal, document.getElementById("root"));
}
  




export default function Landing() {
  return (
    <>
      <main>
      
        <div
          className="relative  pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://bl-i.thgim.com/public/incoming/ddgtc0/article66550080.ece/alternates/FREE_1200/BL04_Think_meeting.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container  relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-6 ml-auto mr-auto text-center">
                <div className="pr-12">
                <marquee scrollamount="12">  <h1 className="text-white font-semibold text-5xl">
                    Welcome to Banking System
                  </h1></marquee>
                  {/* <p  style={{fontSize:"150%"}}  className="mt-5 text-lg text-gray-300">
                   This is a simple banking system app through which you can                    create an account and transfer money with each other and see the details of it. 
                  </p> */TextPrinter()}
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
             <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
             <MDBNavLink to='/add'>
   <div  className="card" >
    <div className="px-4 py-5 flex-auto">
      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
        <i className="fas fa-award"></i>
      </div>
      
      <h6 className="text-xl font-semibold">1. Add customer
       <p className="mt-2 mb-4 text-gray-600">
        Add the basic details about yourself and some bank details to open an account.
      </p>
    </h6>
    </div>
  </div>
  </MDBNavLink>
 </div>
 

<div className="w-full md:w-4/12 px-4 text-center">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-500 ease-in-out">
  <MDBNavLink to="/transactions">
  <div className="card">
    <div className="px-4 py-5 flex-auto">
      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
        <i className="fas fa-retweet"></i>
      </div>
      <h6 className="text-xl font-semibold">2. Transfer Money</h6>
      <p className="mt-2 mb-4 text-gray-600">
        Go to the customer page and transfer money to any person
        by clicking on transfer.
      </p>
    </div>
  </div>
  </MDBNavLink>
  </div>
  
  
</div>


              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <MDBNavLink to="/transactions">
                <div  className="card">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      3.Transaction History
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Check the amount transfer amount in transactions.
                    </p>
                  </div>
                </div>
                </MDBNavLink>

                </div>
                
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Working of the New Customer
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  It is a three step process in which the first you have to give
                  the details about yourself and then the bank detials and the
                  last step is to verify all your details.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  While filling the form the feild account name and amount is
                  very necessary to fill properly beacuse this data will only
                  show on the customers page if you forgot to fill any feild
                  then there will be an alert. 
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-800">
                  <img
                    alt="..."
                    src="./assets/images/form.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap"></div>
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="./assets/images/customers.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Customers
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  This is the main part of the website in which all the
                  customers name is present with their account balance through
                  which you can send and receive money from any person. We can view the customer details but can't modify it. We can also delete the customer.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  1. Click on the transfer button.<br></br>
                  2. Choose the person and amount.<br></br>
                  3. Click on Send button.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap"></div>
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Transactions
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  In the transactions page you can see the transactions amount
                  who sent how much money to whom.It is direct and straight. You
                  can only read the data. You can sort as well as search the transactions based on amount as input.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="./assets/images/transactions.svg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
             </svg>
          </div>

          <div  className="container mx-auto px-4 lg:pt-24 lg:pb-24">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Details of the website
                </h2>
                <p className="text-xl leading-relaxed mt-4 mb-4 text-gray-100">
                  I have created this banking system for employees where they can access the data and modify the data of customers as well. This project has done using MERN STACK.
                </p>
               </div>
            </div>
          </div>
        </section>
       </main>
    </>
  );
}
