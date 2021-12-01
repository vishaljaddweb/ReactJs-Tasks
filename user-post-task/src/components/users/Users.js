import axios from 'axios';
import React, { Component } from 'react'
import AddDataForm from './AddDataForm';
import EditUser from './EditUser';

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

    render() {
        return (
            <>
                <div>
                    {!this.state.isAddData && <button onClick={this.startAddDataHandler}>Add New User</button>}
                    {this.state.isAddData && <AddDataForm onSaveUserData={this.saveUserDataHandler} onCancel={this.stopAddDataHandler} />}
                </div>
                <div>
                    {this.state.isEditing ? <EditUser editUser={this.state.editUserData} onCancel={this.stopEditData} onEditSuccess={this.updateDataHandler} /> : null}
                </div>
                <ul  >
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
                </ul>
            </>
        )
    }
}

export default Users
