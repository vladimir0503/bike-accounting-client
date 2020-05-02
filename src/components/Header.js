import React from 'react';
import styled from 'styled-components';
import BurgerMenu from './BurgerMenu'

const HeaderContayner = styled.div`
    width: 100vw;
    height: 60px;
    background-color: black;
    position: absolute;
    z-index: 1000;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 1138px;
`;

const Label = styled.h1`
    color: white;
    margin: 0;
    position: relative;
    bottom: 5px;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        color: #E3B873;
    }
`;

class Header extends React.Component {

    toHome() {
        window.history.back();
    }

    render() {
        return (
            <HeaderContayner>
                <HeaderContent>
                    <BurgerMenu />
                    <Label onClick={this.toHome.bind(this)}>BIKE RENTAL</Label>
                </HeaderContent>
            </HeaderContayner>
        )
    }
}

export default Header