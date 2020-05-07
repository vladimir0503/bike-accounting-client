import React from 'react';
import styled from 'styled-components';
import stolen from '../images/stolen.jpg';
import axios from 'axios';

let token = localStorage.getItem('myToken');

const ContentConteyner = styled.div`
    background-image: url(${stolen});
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-size: cover;
    z-index: 150;

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

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: -99px;
    width: 334px;
    height: 38px;
    margin: 0 auto;
    background: rgba(0,0,0,0.46);
    color: white;
    z-index: 151;
    cursor: pointer;
`;
const UserList = styled.div`
    margin: 0 auto;
    margin-top: 139px;
    width: 797px;
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
    padding: 1px;
`;

const Li = styled.li`
    display: flex;
    align-items: center;
    max-width: 329px;
    border: 1px solid #FFFFFF;
    padding: 5px;
    flex-direction: column;
    margin: 0 auto;
`;

const Ul = styled.ul`
    padding: 0px;
`;

const Hover = styled.h2`
    display: flex;
    justify-content: center;
    width: 328px;
    margin: 0 auto;
`;

class StolenBikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stolenBikes: [],
            info: null
        }
    }

    hideInfo() {
        this.setState({ info: null });
    }

    componentDidMount() {
        axios.get('http://84.201.129.203:8888/api/cases', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const stolenBikes = res.data;
                this.setState({ stolenBikes })
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    info: <Info onClick={this.hideInfo.bind(this)}>
                        <p>Вы не вошли в систему!</p>
                    </Info>,
                    listStyle: 'none'
                })
            })
    }

    render() {
        return (
            <ContentConteyner>
                {this.state.info}
                <UserList style={{ display: this.state.listStyle }}>
                    <Hover>Украденные велосипеды:</Hover>
                    {this.state.stolenBikes.map(data => <Ul><Li>
                        <div>{`Цвет: ${data.color}`}</div>
                        <div>{`Имя владельца: ${data.ownerFullName}`}</div>
                        <div>{`Номер лицензии: ${data.licenseNumber}`}</div></Li></Ul>)}
                </UserList>
            </ContentConteyner>
        )
    }
}

export default StolenBikes