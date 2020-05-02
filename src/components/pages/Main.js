import React from 'react'
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home'
import Registration from './Registration';
import Autorization from './Autorization';
import ReportTheft from './ReportTheft';

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
    justify-content: space-between;
    margin: 0 auto;
    margin-top: -3px;
    width: 1138px;
`;

const LabelDiv = styled.div`
    display: flex;
`;

const LinkDiv = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    width: 209px;
    height: 32px;
    justify-content: space-between;
`;

const Label = styled.h1`
    color: white;
    position: relative;
    margin-top: 10px;
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

const SubMenu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 199;
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
    cursor: pointer;

    :hover {
        color: #E3B873;
    }
`;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPosition: '-100%',
            menuInit: false,
            transformBar1: null,
            opacityBar2: null,
            transformBar3: null,
            barColor: null,
            disableBtn: null,
            clickCountInit: false,
            submenuPosition: '-100%',
            submenuinit: false,
            linkColor: 'white'
        }

        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.OnSubMenu = this.OnSubMenu.bind(this);
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
                barColor: '#E3B873'
            });
        } else {
            this.setState({
                menuPosition: '-100%',
                menuInit: false,
                transformBar1: null,
                transformBar3: null,
                opacityBar2: null,
                barColor: null,
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

    menuInitFalse() {
        this.setState({ menuInit: false })
    }

    menuInitTrue() {
        this.setState({ menuInit: true })
    }

    OnSubMenu() {
        if (this.state.submenuinit === false) {
            this.setState({
                submenuPosition: '100%',
                submenuinit: true
            })
        } else {
            this.handleClickMenu();
            this.setState({
                submenuPosition: '-100%',
                submenuinit: false,
            })
        }
    }

    render() {

        const HomePages = () => <Home />;
        const RegistPage = () => <Registration />;
        const AutorPage = () => <Autorization />;
        const ReportTheftPage = () => <ReportTheft />;

        return (
            <Router>
                <Route path='/' component={HomePages} />
                <Route path='/registration' component={RegistPage} />
                <Route path='/autorization' component={AutorPage} />
                <Route path='/reportTheft' component={ReportTheftPage} />
                <Header>
                    <HeaderContent>
                        <LabelDiv>
                            <MenuButton onClick={this.handleClickMenu.bind(this)}>
                                <Bar style={{ transform: this.state.transformBar1, backgroundColor: this.state.barColor }} />
                                <Bar style={{ opacity: this.state.opacityBar2, backgroundColor: this.state.barColor }} />
                                <Bar style={{ transform: this.state.transformBar3, backgroundColor: this.state.barColor }} />
                            </MenuButton>
                            <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}><Label>BIKE RENTAL</Label></Link>
                        </LabelDiv>
                        <LinkDiv>
                            <NavBarElem><Link to='/autorization' style={{ color: 'inherit', textDecoration: 'none' }}>Войти</Link></NavBarElem>
                            <NavBarElem><Link to='/registration' style={{ color: 'inherit', textDecoration: 'none' }}>Зарегистрироваться</Link></NavBarElem>
                        </LinkDiv>
                    </HeaderContent>
                </Header>
                <Menu style={{ transform: `translateX(${this.state.menuPosition})` }}>
                    <NavBar>
                        <NavBarElem onClick={this.handleClickMenu.bind(this)}><Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>Главная</Link></NavBarElem>
                        <NavBarElem onClick={this.OnSubMenu.bind(this)}>Админка</NavBarElem>
                        <NavBarElem onClick={this.handleClickMenu.bind(this)}><Link to='/reportTheft' style={{ color: 'inherit', textDecoration: 'none' }}>Сообщить о краже</Link></NavBarElem>
                    </NavBar>
                </Menu>
                <SubMenu style={{ transform: `translateX(${this.state.submenuPosition})` }}>
                    <NavBar style={{ fontSize: '20px' }}>
                        <NavBarElem onClick={this.OnSubMenu.bind(this)}><Link to='/autorization' style={{ color: 'inherit', textDecoration: 'none' }}>Авторизация</Link></NavBarElem>
                        <NavBarElem onClick={this.OnSubMenu.bind(this)}><Link to='/registration' style={{ color: 'inherit', textDecoration: 'none' }}>Регистрация</Link></NavBarElem>
                        <NavBarElem>Украденные велосипеды</NavBarElem>
                        <NavBarElem>Новый случай</NavBarElem>
                        <NavBarElem>Ответственные сотрудники</NavBarElem>
                    </NavBar>
                </SubMenu>
            </Router>
        )
    }
}

export default Main