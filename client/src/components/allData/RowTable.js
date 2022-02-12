function RowTable({ data }) {
    return (
      <>
        <tr>
          <td className="brand-table-td-small">{data.acct}</td>
          <td className="brand-table-td-small">
            {data.firstName} {data.lastName}
          </td>
          <td className="brand-table-td-small">{data.email}</td>
          <td className="brand-table-td-small">{data.roles}</td>
        </tr>
      </>
    );
  }
  
  export default RowTable;