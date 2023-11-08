//tambahkan codingan dari gist diatas Button
const Button = ({
  className = "bg-teal-500 hover:bg-teal-700 active:bg-teal-600",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className}  rounded  shadow-md px-4 py-1 text-white my-2 `}
    >
      {children}
    </button>
  );
};

Table.Header = Header;
Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Data = Data;
Table.Button = Button;

export default Table;
