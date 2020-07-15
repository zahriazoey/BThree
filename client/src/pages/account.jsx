import React, { Component } from 'react'
import './account.css'
import { Button} from 'react-bootstrap'
import EmergencyContacts1 from '../component/emergencyContacts'


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Username: "",
            Password: "",
            Email: "",
            // CellNumber: "",
            Age: "",
            FriendList: [],
            EmergencyContacts: [],




        }
    }

    getAccountInfo() {
        fetch(`/api/v1/users/${this.props.match.params.id}`)
            .then(res =>

                res.json()
            )
            .then(data => {
                console.log(data)
                this.setState({
                    Name: (data.firstName + " " + data.lastName),
                    Username: data.userName,
                    Password: data.password,
                    Email: data.email,
                    // CellNumber: 
                    Age: data.dob
                    // FriendList: 
                })
            })
            .catch(err => err)



    }

    getEmergencyContacts() {
        fetch(`/api/v1/users/${this.props.match.params.id}/contacts`)
            .then(res => res.json())
            .then(contacts => {
                console.log(contacts)
                this.setState({
                    EmergencyContacts: contacts
                })
            })
    }

    makeAccountChanges = (e) => {
        e.preventDefault() 

        fetch(`/`)

    }

    componentDidMount() {
        this.getAccountInfo();
        this.getEmergencyContacts();
    }

    render() {
        let EmergencyContacts = this.state.EmergencyContacts;
        EmergencyContacts = EmergencyContacts.map((contact, index) => {
            let name
            return <EmergencyContacts1
                name={contact.name}
                phoneNumber={contact.phoneNumber}
                relationship={contact.relationship}
                key={index}

            />
        })

        let currentTime = new Date()
        let month = currentTime.getMonth()
        let year = currentTime.getFullYear()
        let day = currentTime.getDate()
        let today = (month + "/" + day + "/" + year)

        console.log(today)
        let name = this.state.Name
        let username = this.state.Username
        let password = this.state.Password
        let email = this.state.Email
        let cellNumber = this.state.cellNumber
        let age = this.state.Age
        console.log(age)
        age = today - age
        // let FriendList = this.state.FriendList 


        return (
            <div>
                


                <div className="AccountPage flexColumn">

                     <div className="Title"> Account Information </div> 

                    <div className="Info flexRow">

                        <div className="TextArea flexColumn">
                            <div>Name: <span className="data">{name}</span> </div>
                            <div>Username: <span className="data">{username}</span> </div>
                            {/* <div>Age: {age} </div> */}
                            <div>Password: <span className="data">{password}</span> </div>
                            <div>Email: <span className="data">{email}</span> </div>
                            <div>Cellular Number: <span className="data">{cellNumber}</span> </div>


                            <Button> Edit </Button>


                        </div>

                        <div className="EC flexColumn">
                            <div> Emergency Contacts </div>
                                {EmergencyContacts}
                        </div>
                    </div>






                </div>
            </div>
        );
    }
}

export default Account;