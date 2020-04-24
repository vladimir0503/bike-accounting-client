import React from 'react';
import styled from 'styled-components';
import BurgerMenu from '../components/burgerMenu/BurgerMenu'

class Header extends React.Component {

    render() {

        const HeaderContayner = styled.div`
            width: 100vw;
            height: 60px;
            background-color: black
        `;

        return(
            <HeaderContayner>
                <BurgerMenu />
            </HeaderContayner>
        )

    }
}

export default Header