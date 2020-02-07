import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class SMSCompose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smsMsg: '',
            smsID:'',
            showLink: false,
            showMsg:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSMS = this.onChangeSMS.bind(this);
    }

    onChangeSMS(e) {
        this.setState({smsMsg: e.target.value});
    }

    componentDidUpdate() {
        if (this.state.smsID.length > 0 && !this.state.showLink) {
            let tmpMsg = this.state.smsMsg;
            this.setState({
                showLink: true, 
                smsMsg:'',
                showMsg: tmpMsg
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/compose", {'smsMsg': this.state.smsMsg})
              .then(response => {
                  this.setState({ 
                                    smsID: response.data['_id'],
                                    smsMsg: response.data['smsMsg']
                         });
                         
              });

    }

    render() {

        const linkShowlink = this.state.showLink ? 
                                <div>
                                    <div><h5>You will be sending the following message</h5>
                                    <p>{this.state.showMsg}</p>
                                    </div>
                                    <Link to={{
                                        pathname: '/sms',
                                        state: {
                                            smsID: this.state.smsID
                                        }
                                        }}>Upload Consultant Data File
                                    </Link>
                                    
                                </div> :
                                <div></div>;
        

        return (<div>
                    <h3>Please compose the SMS you want to send</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor='smsMsg'>Compose Message Text</label>
                            <br />
                            <input 
                                type="text" 
                                name="smsMsg" 
                                value={this.state.smsMsg} 
                                onChange={this.onChangeSMS}
                                style={{width:'80em'}} 
                            />
                            <br />
                            <hr />
                            <input type="submit" value="Submit the SMS Text" className="btn btn-primary" />
                        </div>
                    </form> 
                    {linkShowlink}
                </div>
        );
    }

}