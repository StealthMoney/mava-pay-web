import React from 'react'

type TransactionTableProps<T> = {
  data: T[] | undefined
}

const TransactionTable = <T extends object>({data}: TransactionTableProps<T>) => {
  return (
    <div>
      <table>
        <thead>
          <th>
            <td>Order ID</td>
            <td>Amount</td>
            <td>Rate</td>
            <td>Date</td>
            <td>Invoice</td>
            <td>Status</td>
          </th>
        </thead>
        <tbody>
          {data?.map((row, index) => {
            return <TableRow key={index} data={row} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable

const TableRow = <T extends object>({data}: {data: T}) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  )
}