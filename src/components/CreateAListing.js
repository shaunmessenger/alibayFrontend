import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import NavbarHomepage from './NavbarHomepage.js';
import Footer from './Footer.js';


/*this page creates a listing. It sends the information about the item to be stored in the
backend. Upon submitting the form, the url is changed, and on changing the url, the listingSubmitted
component is rendered. The itemID is passed to the listingSubmitted component, in case it needs
to render the individual listing */



class CreateAListingBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputItemName: '',
            inputItemDesc: '',
            inputItemUrl: '',
            inputItemPrice: '',
            itemName: '',
            itemDesc: '',
            itemPrice: '',
            itemId: '',
            itemUrl: '',
            notDrakeRelated: false,
            userId: this.props.userId
        }
        this.handleItemNameChange = this.handleItemNameChange.bind(this)
        this.handleItemDescChange = this.handleItemDescChange.bind(this)
        this.handleItemPriceChange = this.handleItemPriceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleItemUrl = this.handleItemUrl.bind(this)
        // this.displayListingSubmitted = this.displayListingSubmitted.bind(this)
    }

    handleItemNameChange(event) {
        this.setState({ inputItemName: event.target.value })
    }

    handleItemDescChange(event) {
        this.setState({ inputItemDesc: event.target.value })
    }

    handleItemPriceChange(event) {
        this.setState({ inputItemPrice: event.target.value })
    }
    handleItemUrl(event) {
        this.setState({ inputItemUrl: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        let newItemName = this.state.inputItemName
        let newItemPrice = this.state.inputItemPrice
        let newItemDesc = this.state.inputItemDesc
        let newItemUrl = this.state.inputItemUrl
        this.setState({
            itemName: newItemName,
            itemDesc: newItemDesc,
            itemPrice: newItemPrice,
            itemUrl: newItemUrl
        })
    
        /* should it be of the form {item: {name: itemName, desc: itemDesc}}? Need a way to structure 
        the item to send it to the backend. Also, userID will need to have been sent as a props
        from... somewhere. The item id will be generate here? */
        let itemToSend = {
            itemName: newItemName,
            description: newItemDesc,
            price: newItemPrice,
            //userID below will come as a props from the App.js
            //sellerId: this.state.userId,
            itemUrl: newItemUrl

        }
        fetch('/sellItem', {
            method: 'POST',
            body: JSON.stringify(itemToSend)
        }).then(response => response.text())
            .then( response => {
                let itemId = JSON.parse(response)
                this.setState({ itemId: itemId})
                this.props.getItemId(itemId)
                // receives the itemID from the backend
                this.props.history.push('/listingSubmitted/' + itemId)
            }
            )
    }

     uploadFile(x) {
        var filename = x.name;
        var fileExtension = filename.split('.').pop();            
        fetch('/upics?ext=' + fileExtension,{method: "POST", body: x})
        .then(response => response.text())
        .then(response => this.setState({inputItemUrl: response}))
        }

    // displayListingSubmitted() {
    //     /* pass the itemID here as a props. Then, the listingSubmitted page would have the 
    //     itemID, so that it could display that listing as necessary */
    //     return (<ListingSubmitted itemID={this.state.itemID} /*userID={this.state.userID*//>)
    // }

    render() {
        return (
            <div>
                <NavbarHomepage/>
                {/* <div className='linkToHomepage'>
                    <Link to='/Homepage'><button className='homepageButton'>__________________</button></Link>
                </div> */}
                    <div class="card createlistingcard signupcard">
                        <div class="card-body">
                            Create a listing for your item!
                                <div className='createAListingForm'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="textspacing">
                                            Name your listing:
                                            <input type='text' value={this.state.inputItemName} placeholder='Item name' onChange={this.handleItemNameChange} />
                                        </div>
                                        <div className="textspacing">
                                            Describe it:
                                            <input type='text' value={this.state.inputItemDesc} placeholder='Item description' onChange={this.handleItemDescChange} />
                                        </div>
                                        <div className="textspacing">
                                            How much would you like to sell it for?
                                            <input type='text' value={this.state.inputItemPrice} placeholder='Item price' onChange={this.handleItemPriceChange} />
                                        </div>
                                        <div className="textspacing">
                                            Upload an image:
                                            <input type="file" id="input" onChange={e => this.uploadFile(e.target.files[0])} /> 
                                        </div>
                                        <div className="textspacing">
                                            <input className="buttontogrey" type='submit' />
                                        </div>
                                    </form>    
                                </div>   
                    </div>
                    { (this.state.notDrakeRelated) ? ( <div> Your post is not Drake related! He would not approve </div>) : null}
                    {/* <Route path='/CreateAListing/listingSubmitted' render={this.displayListingSubmitted} /> */}
                </div>
                <Footer/>
                
            </div>
        )
    }
}

let CreateAListing = withRouter(CreateAListingBasic)
export default CreateAListing