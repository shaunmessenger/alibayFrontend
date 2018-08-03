import React, {Component} from "react";
import { Link } from 'react-router-dom';

class Homepage extends Component{
    constructor() {
        super();
        this.state = {
            username: ""
        }
    }
    render(){
        return(
            <div>
            <Link to="/MyHistory">
                <button>My history</button>
            </Link>  
            <Link to="/BuyHomepage">
                <button>Buy Something</button>
            </Link>
            <Link to="/CreateAListing">
                <button>Sell Something</button>
            </Link>
            </div>
        )
    }

}

export default Homepage;


