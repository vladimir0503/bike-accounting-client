import React from 'react'
import styled from 'styled-components';
import homeImg from '../images/home.jpg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Registration from '../pages/Registration'

const Header = styled.div`
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
    cursor: pointer;

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
`;

const Bar = styled.span`
    display: block;
    width: 40px;
    height: 5px;
    margin-bottom: 7px;
    background-color: #fff;
`;

const Menu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 200;
    display: block;
    width: 400px;
    max-width: 100%;
    margin-top: 0px;
    padding-top: 100px;
    padding-right: 0px;
    align-items: stretch;
    background-color: black;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const NavBar = styled.ul`
    margin-left: 10px;
    padding-left: 0;
    font-size: 33px;
`;

const NavBarElem = styled.li`
    list-style-type: none;
    margin-bottom: 39px;
    color: white;
    transition: 0.5s;

    :a {
        color: 'inherit';
        text-decoration: 'none'
    }
    
    :hover {
        color: #E3B873;
    }
`;

const ContentContayner = styled.div`
    background-image: url(${homeImg});
    width: 100vw;
    height: 100vh;
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
            barColor: null,
            wrapper: null,
            disableBtn: null,
            clickCountInit: false
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickMenu() {

        if (this.state.menuInit === false) {
            this.setState({
                menuPosition: '0%',
                menuInit: true,
                clickOutsideInit: false,
                transformBar1: 'rotate(45deg) translate(10px, 10px)',
                transformBar3: 'rotate(-45deg) translate(7px, -7px)',
                opacityBar2: 0,
                barColor: '#E3B873',
                wrapper: this.setWrapperRef = this.setWrapperRef.bind(this),
            });
        } else {
            this.setState({
                menuPosition: '-100%',
                menuInit: false,
                transformBar1: null,
                transformBar3: null,
                opacityBar2: null,
                barColor: null,
                wrapper: null,
            })
        }

    }

    hideMenu() {
        this.setState({
            menuPosition: '-100%',
            transformBar1: null,
            transformBar3: null,
            opacityBar2: null,
            barColor: null,
            wrapper: null,
        })
    }

    handleClickOutside(event) {

        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleClickMenu();
            this.setState({
                menuInit: true,
                clickCountInit: true
            })
        }
        console.log(this.state.menuInit);
    }

    menuInitFalse() {
        this.setState({ menuInit: false })
    }

    menuInitTrue() {
        this.setState({ menuInit: true })
    }

    toHome() {
        window.history.back();
    }

    render() {

        const RegistPage = () => <Registration />

        return (
            <Router>
                <Header>
                    <HeaderContent>
                        <MenuButton onClick={this.handleClickMenu.bind(this)} onMouseOver={this.menuInitFalse.bind(this)}>
                            <Bar style={{ transform: this.state.transformBar1, backgroundColor: this.state.barColor }} />
                            <Bar style={{ opacity: this.state.opacityBar2, backgroundColor: this.state.barColor }} />
                            <Bar style={{ transform: this.state.transformBar3, backgroundColor: this.state.barColor }} />
                        </MenuButton>
                        <Label onClick={this.toHome.bind(this)}>BIKE RENTAL</Label>
                    </HeaderContent>
                </Header>
                <Route path='/registration' component={RegistPage} />
                <ContentContayner onMouseOver={this.menuInitTrue.bind(this)}>
                    <ContentDiv>
                        <div style={{ width: '699px' }}>
                            <h2 style={{ margin: '0px' }}><span style={{ color: '#E3B873' }}>
                                Добро пожаловать!</span></h2>
                            <p>Вы находитесь на странице сервиса по учету украденных велосипедов.</p>
                            <p>К огромному сожалению, участились случаи краж нашего имущества. По-этому наша компания
                            запустила систему учета краж наших велосипедов. Если у Вас есть что сообщить, пожалуйста
                            кликните на кнопку меню в левой части страницы.</p>
                        </div>
                    </ContentDiv>
                    <div ref={this.state.wrapper}>
                        <Menu style={{ transform: `translateX(${this.state.menuPosition})` }}>
                            <NavBar>
                                <NavBarElem onClick={this.toHome.bind(this)}>Главная</NavBarElem>
                                <NavBarElem disabled={true}><Link to='/registration' style={{ color: 'inherit', textDecoration: 'none' }}>Регистрация</Link></NavBarElem>
                                <NavBarElem>Авторизация</NavBarElem>
                                <NavBarElem>Сообщить о краже</NavBarElem>
                                <NavBarElem>Украденные велосипеды</NavBarElem>
                            </NavBar>
                        </Menu>
                    </div>
                </ContentContayner>
            </Router>
        )
    }
}

export default Home