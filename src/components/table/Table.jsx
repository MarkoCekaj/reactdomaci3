import React from "react";
import Table from "react-bootstrap/Table";
const TableContent = ({ header, rows, onRowClick, onRowDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Array.isArray(header) &&
            header.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) &&
          rows.map((row) => {
            return (
              <tr key={row?.id} onClick={() => onRowClick(row)}>
                {Object.values(row).map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default TableContent;
