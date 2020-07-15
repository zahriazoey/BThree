import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
// import SendIcon from '@material-ui/icons/Send';
import io from "socket.io-client";
import { Nav, Navbar } from 'react-bootstrap'
import './Chat.css'

class ChatPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            messages: [],
            name: "",
        };

        this.socket = io("localhost:3001");
    }

    componentDidMount() {
        this.socket.on("receive_private", (data) => {
            console.log(data)
            if (this.props.match.params.id == data.authorId) {
                this.addMessage(data);
            }
        });
        this.socket.on("receive_own_private", (data) => {
            console.log(data)
            this.addMessage(data);
        });
    }

    addMessage = (data) => {
        console.log(data);
        this.setState({
            messages: [...this.state.messages, data],
        });
        console.log(this.state.messages);
    };
    sendMessage = (e) => {
        e.preventDefault();
        this.socket.emit("send_private", {
            userId: this.props.match.params.id,
            message: this.state.message,
        });
        this.setState({ message: "" });
    };

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} >
                    </Grid>
                </Grid>
                <Grid container component={Paper} >
                    <Grid item xs={3} >
                        <List>
                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                    {/* add circle with letters */}
                                </ListItemIcon>
                                <ListItemText primary="Zahria Shannon"></ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid item xs={12} style={{ padding: '10px' }}>
                            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        </Grid>
                        <Divider />
                        <List>
                            {/* <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem> */}
                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <List>
                            <ListItem key="1">
                                <Grid container>
                                    <div className="messages" style={{ color: 'white' }} >
                                        {this.state.messages.map((message, index) => {
                                            return (
                                                <div key={index}>
                                                    {" "}
                                                    {message.author}: {message.message}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="10:30"></ListItemText>
                                </Grid> */}
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                            <div>
                        <TextField
                            type="text"
                            placeholder="Message"
                            value={this.state.message}
                            onChange={(e) =>
                                this.setState({
                                    message: e.target.value,
                                })
                            }
                        />
                        <br />
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                                {/* <TextField id="outlined-basic-email" label="Type Something" fullWidth /> */}
                            </Grid>
                            <Grid xs={1} align="right">

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ChatPage;

const chatStyles = {
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
};