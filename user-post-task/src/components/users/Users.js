import axios from 'axios';
import React, { Component } from 'react'
import AddDataForm from './AddDataForm';
import EditUser from './EditUser';
import { Table, Input, Button } from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersItems: [],
            isAddData: false,
            isEditing: false,
            editUserData: {}
        };
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        const resp = await axios.get('http://localhost:3005/users');
        this.setState({
            usersItems: resp.data
        })
    }

    deleteHandler = (id) => {
        axios.delete(`http://localhost:3005/users/${id}`).then(() => {
            this.getAllUsers();
        });
    }

    saveUserDataHandler = (enteredUserData) => {
        const userData = {
            ...enteredUserData
        }
        axios.post('http://localhost:3005/users', userData).then(() => {
            this.getAllUsers();
        });
        this.setState({
            isAddData: false
        })
    }

    startAddDataHandler = () => {
        this.setState({
            isAddData: true
        })
    }

    stopAddDataHandler = () => {
        this.setState({
            isAddData: false
        })
    }

    stopEditData = () => {
        this.setState({
            isEditing: false
        })
    }

    updateDataHandler = () => {
        this.setState({
            isEditing: false
        })
        this.getAllUsers();
    }

    editHandler = async (response) => {
        this.setState({
            isEditing: true,
            editUserData: response
        })
    }

    onSearch = (value) => {
        console.log(value)
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id',
            sorter:(a,b)=>a.name - b.name
        },
        {
            title: 'UserName',
            dataIndex: 'username',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'id',
        },
        {
            title: 'Street',
            dataIndex: ['address', 'street'],
            key: 'id',
        },
        {
            title: 'Suite',
            dataIndex: ['address', 'suite'],
            key: 'id',
        },
        {
            title: 'City',
            dataIndex: ['address', 'city'],
            key: 'id',
        },
        {
            title: 'ZipCode',
            dataIndex: ['address', 'zipcode'],
            key: 'id',
        },
        {
            title: 'Latitude',
            dataIndex: ['address', 'geo', 'lat'],
            key: 'id'
        },
        {
            title: 'Longitude',
            dataIndex: ['address', 'geo', 'lng'],
            key: 'id',
        },
        {
            title: 'Phone_No',
            dataIndex: 'phone',
            key: 'id',

        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'id',

        },
        {
            title: 'Company_Name',
            dataIndex: ['company', 'name'],
            key: 'id',

        },
        {
            title: 'Catch_Phrase',
            dataIndex: ['company', 'catchPhrase'],
            key: 'id'
        },
        {
            title: 'BS',
            dataIndex: ['company', 'bs'],
            key: 'id',
        },
        {
            key:'id',
            render: (item) => (
                <>
                    <Button type='primary' onClick={()=>this.editHandler(item)} >Edit</Button>
                </>)
        },
        {
            key:'id',
            render: (item) => (
                <>
                    <Button type='danger' className='danger' onClick={()=>this.deleteHandler(item.id)} >Delete</Button>
                </>)
        }

    ];

    render() {
        return (
            <>
                <div>
                    {!this.state.isAddData && <Button onClick={this.startAddDataHandler}>Add New User</Button>}
                    {this.state.isAddData && <AddDataForm onSaveUserData={this.saveUserDataHandler} onCancel={this.stopAddDataHandler} />}
                </div>
                <br />
                <div>
                    {this.state.isEditing ? <EditUser editUser={this.state.editUserData} onCancel={this.stopEditData} onEditSuccess={this.updateDataHandler} /> : null}
                </div>
                <div className="container">
                    <Search placeholder="input search text" onSearch={this.onSearch} enterButton />
                </div>
                <br />
                <header className="App-header">
                    <Table dataSource={this.state.usersItems} columns={this.columns} />
                </header>
                {/* <ul  >
                    {this.state.usersItems.map((item) => {
                        return (
                            <li key={item.id} style={{ listStyle: "none", display: "flex" }}>
                                <div style={{marginRight:"25px"}}>Name : {item.name}</div>
                                <div>Email : {item.email}</div>
                                <div><button onClick={() => this.editHandler(item)}>Edit</button></div>
                                <div><button onClick={() => this.deleteHandler(item.id)} >Delete</button></div>
                            </li>
                        )
                    })}
                </ul> */}
            </>
        )
    }
}

export default Users;