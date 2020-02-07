import React, { Component } from 'react';
import SMSSuccess from './sms-success.component';
import axios from 'axios';

export default class SMSApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            smsSent: false,
            failedPhoneNos:[],
            smsID:'',
            ajaxReqSent: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        const smsid  = this.props.location.state;
        if(smsid !== undefined)
            this.setState({smsID: smsid['smsID']});
    }

    componentDidUpdate() {
        if(!this.state.smsSent && this.state.ajaxReqSent) {
            alert("Please format the phone numbers and upload again");
        } 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.doAjaxPost();
    }


   
    // Posts the uploaded file
    // Redirects to Success 

    doAjaxPost() {
        var formData = new FormData();
    
        formData.append("file", this.fileInput.current.files[0]);
        formData.append("smsid",this.state.smsID );
        
        axios({
            method: 'post',
            url: 'http://localhost:5000/sms',
            data: formData,
            headers: {
                'Content-Type' : "multipart/form-data"
            }
        })
        .then(response => {
            console.log(response);
           this.setState({
               smsSent: true,
               failedPhoneNos: (response.data.failedPhoneNos !== undefined ? response.data.failedPhoneNos.map() : []),
               ajaxReqSent: true
            });
        })
        .catch(response => {
            console.log(response);
            this.setState({
                smsSent: false,
                ajaxReqSent: true
             });
        });
    }

    render() {

        const successComp = (this.state.smsSent? 
                                <SMSSuccess phoneNos={this.state.failedPhoneNos}/> :
                                <div />
        );

        return (
            <div>
                <div>
                    <h3>Upload a CSV file with consultants data</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <hr />
                            <label>Upload file: </label>
                            <br />
                            <input type="file" ref={this.fileInput} className="btn btn-primary" />
                            <br /><br />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Upload Consultant Data File" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                 {successComp}   

            </div>
            
        );
    }
}