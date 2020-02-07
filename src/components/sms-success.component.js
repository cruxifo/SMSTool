import React, { Component } from 'react';

class SMSSuccess extends Component{
   
    render() {
        const showphones = (this.props.phoneNos.length > 0? 
                                this.props.phoneNos.map(phone => (
                                    <div>
                                        <h5>{phone}</h5>
                                    </div>
                                ))
                            : 
                            <br />);

        return (
            <div>
                <div >   
                    <h2>SMSs have been sent successfully!</h2>
                </div>
                {showphones}
            </div>
        );
    }
}

export default SMSSuccess;