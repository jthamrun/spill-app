import React from "react";

function RecentExpensesRow() {
  return (
    <tr className="cursor-pointer hover:bg-black hover:text-white">
      <td>
        <p>10/26/2022</p>
      </td>
      <td>
        <p>BCD</p>
      </td>
      <td>
        <p>$ 123.43</p>
      </td>
    </tr>
  );
}

export default RecentExpensesRow;
