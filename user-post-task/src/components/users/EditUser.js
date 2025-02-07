import React, { Component } from 'react'
import axios from 'axios';

export class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            setName: "",
            setEmail: "",
            remainingUserData: []
        }
    }

    nameChangeHandler = (event) => {
        this.setState({
            setName: event.target.value
        })
    }

    emailChangeHandler = (event) => {
        this.setState({
            setEmail: event.target.value
        })
    }

    componentDidMount = () => {
        this.loadUserData();
    }

    loadUserData = async () => {
        const resp = await axios.get(`http://localhost:3005/users/${this.props.editUser.id}`);
        this.setState({
            setName: resp.data.name,
            setEmail: resp.data.email,
            remainingUserData: resp.data
        })
    }

    editHandler = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3005/users/${this.props.editUser.id}`, { ...this.state.remainingUserData, name: this.state.setName, email: this.state.setEmail }).then(()=>{
            this.props.onEditSuccess(event);
        })
    }

    render() {
        return (
            <form onSubmit={this.editHandler}>
                <div>
                    <div>
                        <label>Name</label>
                        <input type="text" value={this.state.setName} onChange={this.nameChangeHandler} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" value={this.state.setEmail} onChange={this.emailChangeHandler} />
                    </div>
                </div>
                <div>
                    <button type="button" onClick={this.props.onCancel}>Cancel</button>
                    <button type="submit">Update</button>
                </div>
            </form>
        )
    }
}

export default EditUser;
