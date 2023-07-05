import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@material-ui/core";
 import { red } from "@material-ui/core/colors";

toast.configure();

const notify = () => {
  toast.success('Transaction deleted successfully', {
    autoClose: 5000,
    position: "bottom-left",
    onClose: () => window.location.reload()
  });
};

const showAlert = (_id) => {
  const confirmation = window.confirm("Are you sure you want to delete this transaction?");
  if (confirmation) {
    deleteTransaction(_id);
    notify();
  } else {
    window.alert("Transaction not deleted");
  }
};

const deleteTransaction = async (_id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/transactions/${_id}`);
    console.log(response.data); // Log the deleted transaction data
  } catch (error) {
    console.log(error);
  }
};

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    margin: "100px auto 200px",
    width: "70%",
  },
  tableBody: {
    margin: "10px",
  },
  box: {
    marginLeft: "40px"
  }
});

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/gettransactions`);
        const sortedTransactions = response.data.reverse(); // sort transactions in reverse order
        setTransactions(sortedTransactions);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/gettransactions`);
        let sortedTransactions = response.data;
        if (sortOrder === "asc") {
          sortedTransactions.sort((a, b) => a.amount - b.amount);
          setLoading(false);

        } else {
          sortedTransactions.sort((a, b) => b.amount - a.amount);
          setLoading(false);

        }
        sortedTransactions = sortedTransactions.filter((data) => data.userOne >= searchTerm);
        setTransactions(sortedTransactions);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, [sortOrder, searchTerm]);
   
  

  return (
    <div style={{background:"rgba(0, 0, 0, 0.5)"}}>
    {loading ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress style={{ color: red[500] }} size={60} />
      </div>
    ) : (
      <>
        <br></br>
        <marquee  scrollamount='13'>
          <h3 style={{ color: "white" }}>
            <b>Showing Latest Transactions</b>
          </h3>
        </marquee>
        <input
          type="text"
          size={40}        
          placeholder="Search by name ..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          style={{ margin: "10px",display:"flex",marginLeft:"440px"}}
        />
        <Table className={classes.table} aria-label="customized table">
          <TableBody>
            <div style={{ border: "1px solid black", borderRadius: "0.01cm" }}>
              <h3 style={{ color: "white" }}>
                <b>&nbsp;Transaction id</b>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  <Button
                    color="inherit"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <h3>
                      <b>
                        {sortOrder === "asc"
                          ? "↑↓ Sort by amount (descending)"
                          : "↑↓ Sort by amount (ascending)"}
                      </b>
                    </h3>
                  </Button>
                </b>
              </h3>
            </div>
            {transactions
              .filter((data) => data.userOne.includes(searchTerm))
              .map((data, index) => {
                return (
                  <>
                    <h5 style={{ color: "WHITE" }}> {index}</h5> 
                    <Alert severity="success" className={classes.tableBody}>
                      <h5>
                        {data.userOne} transferred <b>₹{data.amount}</b> to {data.userTwo}
                        <Button
                          className={classes.box}
                          variant="contained"
                          color="secondary"
                          onClick={() => showAlert(data._id)}
                        >
                          Delete
                        </Button>
                      </h5>
                      <h7>
                        <b>Transaction time:- {data.currenttimestamp}</b>
                      </h7>
                    </Alert>
                    <Alert severity="error" className={classes.tableBody}>
                      <h5>
                        In case of error {data.userOne} transfered failed ₹{data.amount} to {data.userTwo}
                      </h5>
                    </Alert>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </>
    )}
  </div>
  
            )}