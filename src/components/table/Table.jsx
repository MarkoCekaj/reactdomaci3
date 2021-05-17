import React from "react";
import Table from "react-bootstrap/Table";
const TableContent = ({ headers = [], rows = [] }) => {
  return (
    <Table striped bordered hover responsive="xl">
      <thead>
        <tr>
          {headers?.length &&
            headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => {
          return (
            <tr key={item?.id}>
              {Object.values(item).map((data, index) => (
                <td key={index}>{data}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default TableContent;
