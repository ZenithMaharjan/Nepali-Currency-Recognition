import React, { useState, useEffect } from "react";
import { Col, Divider, Row, Table } from "antd";
import "../css/Invoice.css";
import styled from "styled-components";

const SeachContainer = styled.div`
  /* position: absolute; */
  justify-content: center;
  /* top: 21.5%; */
  /* left: 50%; */
  width: 400px;
  height: 40px;
  margin-top: 10px;
  /* margin-bottom: 30px; */
  border-radius: 40px;
  border-color: black;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  /* transform: translate(-50%, -50%); */
  background: #fff;
  transition: all 0.3s ease;
  border: 1px solid lightgray;
  &:focus {
    border: 3px solid #555;
  }
`;

const Searches = styled.input`
  /* position: absolute; */
  padding-left: 20px;
  padding-top: 10px;
  font-size: 14px;
  background: none;
  color: #5a6674;
  width: calc(100% - 22px); /* height: 20px; */
  border: none;
  appearance: none;
  outline: none;
`;

export default function Invoice({ data }) {
  const [user, setUser] = useState();
  const [invoice, setInvoice] = useState();
  const [current, setCurrent] = useState();
  const [currentuser, setCurrentuser] = useState();

  const [searchResults, setSearchResults] = useState([]);

  const [nooffake, setNooffake] = useState();
  const [noofNCD, setNoofNCD] = useState();
  const [amount, setAmount] = useState();

  const [query, setQuery] = useState("");

  console.log(currentuser);
  console.log(searchResults);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    // const userInvoice = localStorage.getItem("invoice");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      //   const foundInvoice = JSON.parse(userInvoice);
      setUser(foundUser);
      //   setInvoice(foundInvoice);
    }

    const currentInvoice = localStorage.getItem("current");
    const foundCurrent = JSON.parse(currentInvoice);
    setCurrent(foundCurrent);

    const totalInvoice = localStorage.getItem("invoice");
    const foundTotal = JSON.parse(totalInvoice);
    setInvoice(foundTotal);
    setSearchResults(foundTotal[0]);

    const currentuser = localStorage.getItem("currentuser");
    const parsedcurrentuser = JSON.parse(currentuser);
    setCurrentuser(parsedcurrentuser[0]);
  }, []);

  useEffect(() => {
    let totalamount = 0;
    if (invoice)
      invoice[0].map(
        (item, index) => (totalamount = totalamount + parseInt(item.total))
      );
    setAmount(totalamount);
  }, [invoice]);

  const handleSearch = (e) => {
    const term = e.target.value;

    const filteredObjects =
      term === ""
        ? invoice[0] // Show all objects if search term is empty
        : invoice[0].filter((obj) =>
            obj.name.toLowerCase().includes(term.toLowerCase())
          );

    setSearchResults(filteredObjects);
  };

  // useEffect(() => {
  //   console.log(typeof invoice);
  //   let countNCD = 0;
  //   let countF = 0;
  //   let total = 0;
  //   if (invoice) {
  //     Object.values(invoice).forEach((item) => {
  //       if (item === "No Currency Detected") {
  //         countNCD++;
  //       } else if (item === "Fake") {
  //         countF++;
  //       } else {
  //         console.log(colormatch[item]);
  //         total = total + colormatch[item];
  //       }
  //       setNoofNCD(countNCD);
  //       setNooffake(countF);
  //       setAmount(total);
  //     });
  //   }
  // }, [invoice]);
  return (
    <div class="invoice-wrapper" id="print-area">
      <div class="invoice">
        <div class="invoice-container">
          <div class="invoice-head">
            <div class="invoice-head-top">
              <div class="invoice-head-top-left text-start"></div>
              <div class="invoice-head-top-right text-end">
                <h2>Total Invoice</h2>
              </div>
            </div>
            <div class="hr"></div>
            <div class="invoice-head-middle">
              <div class="invoice-head-middle-left text-start">
                <p>
                  <span class="text-bold">Date</span>: 23/02/2024
                </p>
              </div>
              <div class="invoice-head-middle-right text-end">
                <p>
                  <span class="text-bold">Invoice No:</span>16789
                </p>
              </div>
            </div>
            <div class="hr"></div>
            <div class="invoice-head-bottom">
              <div class="invoice-head-bottom-left">
                <ul>
                  <li class="text-bold">Current Invoice:</li>
                  <li>{currentuser?.name}</li>
                  <li>Amount: Rs {current?.total}</li>
                  <li>Fake: {current?.countF}</li>
                  <li>Non-Identifiable: {current?.countNCD}</li>
                </ul>
              </div>
              <div class="invoice-head-bottom-right">
                <ul class="text-end">
                  <li class="text-bold">Invoice Of:</li>
                  <li>{currentuser?.name}</li>
                  <li>{currentuser?.address}, Nepal</li>
                  <li>{currentuser?.phoneno}</li>
                  <li>{currentuser?.email}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overflow-view">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <SeachContainer>
                <Searches
                  placeholder="Search..."
                  onChange={handleSearch}
                ></Searches>
              </SeachContainer>
            </div>
            <div class="invoice-body">
              <table>
                <thead>
                  <tr>
                    <td class="text-bold">ID</td>
                    <td class="text-bold">Account No.</td>
                    <td class="text-bold">Name</td>
                    <td class="text-bold">Date</td>
                    <td class="text-bold">Amount</td>
                  </tr>
                </thead>
                <tbody>
                  {invoice &&
                    searchResults.map((item, index) => (
                      // invoice[0].map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.ac}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td class="text-end">Rs {item.total}</td>
                      </tr>
                    ))}

                  {/* <tr>
                    <td>2</td>
                    <td>2/10/2024</td>
                    <td>3</td>
                    <td>0</td>
                    <td class="text-end">Rs 1500</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2/10/2024</td>
                    <td>{nooffake}</td>
                    <td>{noofNCD}</td>
                    <td class="text-end">Rs {amount}</td>
                  </tr> */}
                  {/* <!-- <tr>
                                <td colspan="4">10</td>
                                <td>$500.00</td>
                            </tr> --> */}
                </tbody>
              </table>
              <div class="invoice-body-bottom">
                <div class="invoice-body-info-item border-bottom">
                  {/* <div class="info-item-td text-end text-bold">Sub Total:</div> */}
                  {/* <div class="info-item-td text-end">{amount + 2500}</div> */}
                </div>
                {/* <div class="invoice-body-info-item border-bottom">
                  <div class="info-item-td text-end text-bold">Tax:</div>
                  <div class="info-item-td text-end">$215.00</div>
                </div> */}
                <div class="invoice-body-info-item">
                  <div class="info-item-td text-end text-bold">Total:</div>
                  <div class="info-item-td text-end">{amount}</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="invoice-foot text-center">
            <p>
              <span class="text-bold text-center">NOTE:&nbsp;</span>This is
              computer generated receipt and does not require physical
              signature.
            </p>

            <div class="invoice-btns">
              <button
                type="button"
                class="invoice-btn"
                onclick="printInvoice()"
              >
                <span>
                  <i class="fa-solid fa-print"></i>
                </span>
                <span>Print</span>
              </button>
              <button type="button" class="invoice-btn">
                <span>
                  <i class="fa-solid fa-download"></i>
                </span>
                <span>Download</span>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
