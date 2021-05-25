import React from 'react';
import './Table.css';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug", "Sep", "Oct", "Nov", "Dec"];

//params-> tableData-> array for objects containing table data.

function Table({tName, tableData,  headerKey, rowKeys, displayCol}) {
  

  // const getTableHeader = () => {
  //   let head = document.createElement("tr");
  //   tableData?.map((data , idx) => {
  //     let hKey = headerKey[0];

  //     let date = data[`${hKey}`].split('-'); 
  //     let mId = parseInt(date[1]) - 1;
  //     let th = document.createElement("th");
  //     th.innerHTML = `${months[mId]}-${date[0]}`;

  //       return head.appendChild('th');
  //   })



  //   return head;
  // }

  const getTableHeader = () => {
    let tr = document.createElement('tr');
    let name = document.createElement('th');
    name.appendChild(document.createTextNode(tName));
    tr.appendChild(name);

    tableData?.map((data , idx) => {
      if (idx < displayCol) {
        let hKey = headerKey[0];
        let date = data[`${hKey}`].split('-'); 
        let mId = parseInt(date[1]) - 1;
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(`${months[mId]}-${date[0]}`))
        tr.appendChild(th);
      }
    });

    return tr;
  }

  const getTableRow = (element) => {
    let tr = document.createElement("tr");
    let key = document.createElement("td");
    key.appendChild(document.createTextNode(element));

    tableData?.map((data, idx) => {
      if(idx < displayCol) {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(data[`${element}`]));
        tr.appendChild(td);
      }
    });
      
    return tr;
  }

  const getDefaultRows = (data) => {
    let rkey = Object.keys(data);
    let row = document.createElement("tr");
    let tbody = document.getElementById("default-table-rows");
    
  }

  return (
    <div className = "table">
        <table id = "table-display">
          {
            headerKey ?
            <thead>
              {getTableHeader()}
            </thead>
            :
            <thead></thead>
          }
          {
            rowKeys ?
            <tbody>
              {
                rowKeys.map((rkey, idx) => {
                  return getTableRow(rkey)
                })
              }
            </tbody>
            :
            <tbody id = "default-table-rows">

            </tbody>
          }
        </table>
    </div>
  );
}

export default Table;