import React from 'react'
import styled from 'styled-components';
import homeImg from '../images/home.jpg';

const Header = styled.div`
    width: 100vw;
    height: 60px;
    background-color: black;
    position: relative;
    z-index: 100;
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
`;

const MenuButton = styled.button`
    display: block;
    transform-origin: 16px 11px;
    float: left;
    margin-right: 29px;
    outline: 0;
    border: 0;
    padding: 12px;
    background: none;
    outline: none;

    span {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    :hover {
        span:nth-of-type(1) {
        background-color: #E3B873;
        }

        span:nth-of-type(2) {
        background-color: #E3B873;
        }

        span:nth-of-type(3) {
        background-color: #E3B873;
        }
    }

    &.active {
        span:nth-of-type(1) {
        transform: rotate(45deg) translate(10px, 10px);
        width: 40px;
        }

        span:nth-of-type(2) {
        opacity: 0;
        pointer-events: none;
        }

        span:nth-of-type(3) {
        transform: rotate(-45deg) translate(7px, -7px);
        width: 40px;
        }
    }
`;

const Menu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 50;
    display: block;
    width: 400px;
    max-width: 100%;
    margin-top: 0px;
    padding-top: 100px;
    padding-right: 0px;
    align-items: stretch;
    background-color: #E3B873;
    opacity: 50%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Bar = styled.span`
    display: block;
    width: 40px;
    height: 5px;
    margin-bottom: 7px;
    background-color: #fff;
`;

const ContentContayner = styled.div`
    background-image: url(${homeImg});
    width: 100vw;
    height: 678px;
    background-size: cover;

    ::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
    }
`;

const ContentDiv = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    max-width: 1143px;
    margin: 0 auto;
    padding-top: 116px;
    position: relative;
    z-index: 1;
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPosition: '-100%',
            menuInit: false,
            transformBar1: null,
            opacityBar2: null,
            transformBar3: null,
            barColor: null
        }
    }

    handleClickMenu() {

        if (this.state.menuInit === false) {
            this.setState({
                menuPosition: '0%',
                menuInit: true,
                transformBar1: 'rotate(45deg) translate(10px, 10px)',
                transformBar3: 'rotate(-45deg) translate(7px, -7px)',
                opacityBar2: 0,
                barColor: '#E3B873'
            });
        } else {
            this.setState({
                menuPosition: '-100%',
                menuInit: false,
                transformBar1: null,
                transformBar3: null,
                opacityBar2: null,
                barColor: null
            })
        }

    }

    render() {

        return (
            <>
                <Header>
                    <HeaderContent>
                        <MenuButton onClick={this.handleClickMenu.bind(this)}>
                            <Bar  style={{ transform: this.state.transformBar1, backgroundColor: this.state.barColor }}/>
                            <Bar style={{ opacity: this.state.opacityBar2, backgroundColor: this.state.barColor }}/>
                            <Bar style={{ transform: this.state.transformBar3, backgroundColor: this.state.barColor }}/>
                        </MenuButton>
                        <Label>BIKE RENTAL</Label>
                    </HeaderContent>
                </Header>
                <ContentContayner>
                    <ContentDiv>
                        <div style={{ width: '699px' }}>
                            <h2 style={{ margin: '0px' }}><span style={{ color: '#E3B873' }}>
                                Приветствую, дорогой посетитель!</span></h2>
                            <p>Вы находидеть на странице сервиса по учету украденных велосипедов.</p>
                            <p>К огромному сожалению, участились случаи краж нашего имущества. По этому наша компания
                            запустила систему учета краж наших велосипедов. Если у Вас есть что сообщить, пожалуйста
                            воспользуйтесь выпадающем меню в правой части страницы.</p>
                        </div>
                    </ContentDiv>
                    <Menu style={{ transform: `translateX(${this.state.menuPosition})` }}/>
                </ContentContayner>
            </>
        )
    }
}

export default Home