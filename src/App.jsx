import Table from "./components/Table";
import Form from "./components/Form";
import Button from "./components/common/Button";
import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";

function App() {
  //membuat state untuk setiap input field
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  //data akan di store ke tableData dan diupdate dengan setTableData
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //akan memberikan side efek (ganti data, subscription, manipulasi DOM)
  //terdapat fungsi side efek dan array depedensi
  useEffect(() => {
    //saat komponen pertama kali render, maka akan melakukan fetching data
    fetchData();
  }, []); //[] array depedensi, ketika array kosong akan berjalan sekali setelah inisiasi render

  //fetching data ke API secara asinkron
  const fetchData = async () => {
    try {
      //melakukan fetching data
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json(); //saat diterima, format data diubah menjadi json
      setTableData(data); //mengupdate state komponen tableData melalui updater function setTableData
    } catch (error) {
      console.log("Error mendapatkan user: " + error);
    }
  };
  //melakukan update pada state komponen name
  const handleName = (event) => {
    //event.target.value mengambil value dari target event (input name)
    setName(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //fungsi untuk meng handle submit dari form
  //dengan method async dan memiliki parameter event
  const handleSubmit = async (event) => {
    //mencegah perilaku bawaan saat submisson form (refresh page)
    event.preventDefault();
    //memastikan setiap field diisi
    if (name && username && email) {
      //membuat object newData dengan nilai yang ingin dikirim
      const newData = { name, username, email };
      //melakukan fetching data
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST", //dengan method POST
            body: JSON.stringify(newData), //body diisi dengan data baru
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json(); //mengubah format response menjadi json
        //menambahkan data baru kedalam state komponen tableData
        setTableData([...tableData, data]); //di spreading guna untuk menyebutkan data yang sebelumnya
        //mengosongkan input field
        setName("");
        setUsername("");
        setEmail("");
      } catch (error) {
        console.log("Error menambahkan user: " + error);
      }
    }
  };

  //untuk mengambil data yang ingin di edit
  const handleEdit = (id) => {
    //mencari user pada array tableData yang sesuai id
    const updateUser = tableData.find((data) => data.id === id); //data sebagai callback dari method find
    //jika ada
    if (updateUser) {
      //mengisi field input sesuai dengan data yang ingin diisi
      setName(updateUser.name);
      setUsername(updateUser.username);
      setEmail(updateUser.email);
      setEditingId(id);
    }
  };

  //handle fungsi untuk melakukan update pada data
  const handleUpdate = async () => {
    //memastikan bahwa semua field terisi
    if (name && username && email && editingId !== null) {
      //membuat object baru untuk meenampung nilai dari data baru
      const updateUser = { name, username, email };
      //melakukan fetching API
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${editingId}`,
          {
            method: "PUT", //dengan method PUT
            body: JSON.stringify(updateUser), //mengisi body dengan data yang diupdate
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await response.json(); //mengubah ke format json
        //membuat array barau yang berisikan setiap data pada tableData
        //digunakan untuk mengecek apakah terdapat user dengan id yang sama
        //jika id sesuai maka data akan di replace
        const updatedUser = tableData.map((user) =>
          user.id === editingId ? data : user
        );
        setTableData(updatedUser); //mengupdate state komponen tableData dengan array setelah di update
        //mengosongkan field input
        setName("");
        setUsername("");
        setEmail("");
        setEditingId(null);
      } catch (error) {
        console.log("Error mengubah user: " + error);
      }
    }
  };

  //untuk menangani penghapusan data
  //membutuhkan id data yang ingin dihapus
  const handleDelete = async (id) => {
    try {
      //melakukan fetching data
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE", //dengan method DELETE
      });
      //membuat data dari array tableData, dengan mencocokkan id
      //jika id data bukan yang ingin kita hapus maka di store
      const deletedData = tableData.filter((data) => data.id !== id);
      setTableData(deletedData);
    } catch (error) {
      console.log("Error menghapus user: " + error);
    }
  };

  console.log(tableData);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-royal-blue-300 to-royal-blue-600 gap-y-5">
        <Form onSubmit={handleSubmit}>
          <Form.FieldSet>
            <Form.Input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Name"
            ></Form.Input>
            <Form.Input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            ></Form.Input>
            <Form.Input
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            ></Form.Input>
          </Form.FieldSet>
          <Button
            type="submit"
            className="flex justify-center bg-royal-blue-500"
            text={
              <>
                <IconPlus />
                Add Data
              </>
            }
          ></Button>
        </Form>
        <Button
          type="submit"
          className="flex justify-center bg-teal-500 shadow-lg hover:bg-teal-700 active:bg-teal-600"
          text={<>Update Data</>}
          onClick={handleUpdate}
        ></Button>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Username</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head></Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map((data, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Data>{data.name}</Table.Data>
                  <Table.Data>{data.username}</Table.Data>
                  <Table.Data>{data.email}</Table.Data>
                  <Table.Data>
                    <div className="flex items-center justify-center gap-x-4">
                      <Table.Button onClick={() => handleEdit(data.id)}>
                        Edit
                      </Table.Button>
                      <Table.Button
                        className="flex justify-center bg-rose-500 hover:bg-rose-700 active:bg-rose-600"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Table.Button>
                    </div>
                  </Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default App;
