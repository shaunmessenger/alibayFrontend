import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import DisplayItems from './DisplayItems.js'
import NavbarHomepage from './NavbarHomepage.js';
import Footer from './Footer.js';

/*this page has a search bar and a button to display items for sale. It makes a request
to the backend for the items of interest, stores those in the state, and then makes an 
instance of the class "displayItems" with the items of interest passed as props*/

class BuyHomepageBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSearch: '',
            search: '',
            items: [],
            userId: this.props.userId,
            noItemsForSale: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.displayItems = this.displayItems.bind(this)
        this.displayAllItemsForSale = this.displayAllItemsForSale.bind(this)
    }

    //handles the input of the search bar
    handleChange(event) {
        this.setState({ inputSearch: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        //submits the search request, clears the search bar
        let search = this.state.inputSearch
        this.setState({ search: search, inputSearch: '' })

        /*sends a get request to the server with a query parameter of whatever was entered in the
        search bar. Server returns either an array of objects (items) whose names/descriptions include
        the phrase in the search query, or returns a fail
        */
        fetch('/searchItemForSale?search=' + search)
            .then(response => response.text())
            .then(responseBody => {
                let parsedBody = JSON.parse(responseBody)
                if (parsedBody === 'failure') {
                    this.setState({ noItemsForSale: true})
                } else {
                    let receivedItems = parsedBody
                    this.setState({ items: receivedItems })
                    this.props.history.push('/BuyHomepage/displaySearchResults')
                }
            })
    }

    /*sends a get request to ther server for all items for sale (no buyerID)*/
    displayAllItemsForSale() {
        fetch('/allItemsForSale')
            .then(response => response.text())
            .then(responseBody => {
                
                let parsedBody = JSON.parse(responseBody)
                console.log(parsedBody)
                if (parsedBody === 'f') {
                    //make a boolean flag, this div won't be displayed otherwise
                    return (<div> No items for sale </div>)
                } else {
                    let receivedItems = parsedBody
                    
                    this.setState({ items: receivedItems })
                    this.props.history.push('/BuyHomepage/displaySearchResults')
                }
            })

    }

    /* takes the items in that have been stored in the state from the response from the backend,
    and passes them as a props to the DisplayItems component*/
    displayItems() {
        let items = this.state.items
        return (<DisplayItems items={items} />)
    }

    render() {
        return (
        <div>
        <NavbarHomepage/>
            <div class="card itemsforsalecard">
                <div class="card-body">
                <button onClick={this.displayAllItemsForSale}>See all items for sale</button>
                    <div>
                        <form className="textspacing" onSubmit={this.handleSubmit}>
                            What are you looking for today?
                            <input className="textspacing" type='text' value={this.inputSearch} onChange={this.handleChange} />
                            <input type='submit' />
                        </form>
                    </div>
                </div>
            </div>
            {(this.state.noItemsForSale) ? <div>No items for sale</div> : null}
            {/* this route applies to seeing all items for sale AND to seeing the search results  */}
        <Route path='/BuyHomepage/displaySearchResults' render={this.displayItems} items={this.state.items} />
        <Footer/>
        </div>
        )
    }
}

let BuyHomepage = withRouter(BuyHomepageBasic)
export default BuyHomepage