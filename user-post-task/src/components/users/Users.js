import axios from 'axios';
import React, { Component } from 'react'
import AddDataForm from './AddDataForm';
import EditUser from './EditUser';
import { Table, Input, Button } from 'antd';
import 'antd/dist/antd.css';
// import debounce from "lodash.debounce";
const { Search } = Input;

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersItems: [],
            isAddData: false,
            isEditing: false,
            editUserData: {},
            setPage: 1,
            setPageSize: 6,
            setQuery: ""
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

    // onSetQuery=(event)=>{
    //     this.setState({
    //         setQuery: event.target.value
    //     })        
    // }

    // searchData=(userItems,setQuery)=>{
    //     userItems.filter((value) => {
    //         return value.name.toLowerCase().includes(setQuery) || value.email.toLowerCase().includes(setQuery) || value.username.toLowerCase().includes(setQuery);;
    //     })
    // }
    // filteredItems=this.searchData(this.state.usersItems,this.state.setQuery);
    // debouncedOnChange = debounce(this.onSetQuery, 1000);
    searchHandleChange = (event) => {
        this.setState({
            setQuery: event.target.value
        })
        var searchData = this.state.usersItems.filter((value) => {
            return value.name.toLowerCase().includes(this.state.setQuery) || value.email.toLowerCase().includes(this.state.setQuery) || value.username.toLowerCase().includes(this.state.setQuery);;
        })
        console.log(searchData)
    }
    // searchHandleChange=()=>{
    //     var nn= debounce(this.onSetQuery, 1000);
    //     console.log(nn);
    // }

    columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: '2',
            title: 'Name',
            dataIndex: 'name',
            // sorter: (a, b) => a.name - b.name
        },
        {
            key: '3',
            title: 'UserName',
            dataIndex: 'username',
        },
        {
            key: '4',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: '5',
            title: 'Street',
            dataIndex: ['address', 'street'],
        },
        {
            key: '6',
            title: 'Suite',
            dataIndex: ['address', 'suite'],
        },
        {
            key: '7',
            title: 'City',
            dataIndex: ['address', 'city'],
        },
        {
            key: '8',
            title: 'ZipCode',
            dataIndex: ['address', 'zipcode'],
        },
        {
            key: '9',
            title: 'Latitude',
            dataIndex: ['address', 'geo', 'lat'],
        },
        {
            key: '10',
            title: 'Longitude',
            dataIndex: ['address', 'geo', 'lng'],
        },
        {
            key: '11',
            title: 'Phone_No',
            dataIndex: 'phone',

        },
        {
            key: '12',
            title: 'Website',
            dataIndex: 'website',

        },
        {
            key: '13',
            title: 'Company_Name',
            dataIndex: ['company', 'name'],

        },
        {
            key: '14',
            title: 'Catch_Phrase',
            dataIndex: ['company', 'catchPhrase'],
        },
        {
            key: '15',
            title: 'BS',
            dataIndex: ['company', 'bs'],
        },
        {
            key: '16',
            render: (item) => (
                <>
                    <Button type='primary' onClick={() => this.editHandler(item)} >Edit</Button>
                </>)
        },
        {
            key: '17',
            render: (item) => (
                <>
                    <Button type='danger' className='danger' onClick={() => this.deleteHandler(item.id)} >Delete</Button>
                </>)
        },
        {

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
                    <Search onChange={this.searchHandleChange}
                        value={this.state.setQuery}
                        placeholder="input search text"
                        onSearch={this.onSearch}
                    />
                </div>
                <br />
                <header className="App-header">
                    <Table
                        dataSource={this.state.usersItems}
                        columns={this.columns}
                        pagination={{
                            current: this.state.setPage,
                            pageSize: this.state.setPageSize,
                            onChange: (page, pageSize) => {
                                this.setState({
                                    setPage: page,
                                    setPageSize: pageSize
                                })
                            }
                        }}

                    />
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