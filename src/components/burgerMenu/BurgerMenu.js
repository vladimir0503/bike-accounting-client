import React from 'react';
import './burgerStyle.css'

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            burgerStyle: 'burderOff',
            btnClickInit: false
        }
    }

    burgerClick() {
        if(this.state.btnClickInit === false) {
            this.setState({
                burgerStyle: 'burderOn',
                btnClickInit: !this.state.btnClickInit,
            })
        } else {
            this.setState({
                burgerStyle: 'burderOff',
                btnClickInit: !this.state.btnClickInit,
            })
        }
    }

    render() {
        return (
            <>
                <button onClick={this.burgerClick.bind(this)}>test</button>
                <div className={this.state.burgerStyle}>
                    {/* <li>
                        <p>Home</p>
                        <p>Regisration</p>
                        <p>About Uss</p>
                    </li> */}
                </div>
            </>
        )
    }
}

export default BurgerMenu