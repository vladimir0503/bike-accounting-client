import React from 'react';
import styled from 'styled-components';
import stolen from '../images/stolen.jpg';
import axios from 'axios';
import BikePage from './BikePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const token = localStorage.getItem('myToken');
const headers = { 'Authorization': `Bearer ${token}` };

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
    max-height: 547px;
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
    padding: 1px;
    overflow: auto;
`;

const ListElem = styled.li`
    list-style-type: none;
    color: white;
    transition: 0.5s;
    cursor: pointer;
    :hover {
        color: #E3B873;
    }
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

const DataItem = styled.div`
    margin-bottom: 6px;
`;

const Btn = styled.button`
    cursor: pointer;
    background: #fff0;
    color: white;
    border-radius: 2px;
    width: 149px;
    height: 33px;
    position: relative;
    border: 1px solid #FFFFFF;
    transition: 0.5s;
    :hover{
        background: #E3B873;
    }
`;

class StolenBikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stolenBikes: [],
            info: null,
            bikeId: null
        }

        this.updateBikeList = this.updateBikeList.bind(this);
    }

    hideInfo() {
        this.setState({ info: null });
    }

    componentDidMount() {
        axios.get('http://84.201.129.203:8888/api/cases', {
            headers: headers
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

    bikeDelete(id, index) {
        axios.delete(`http://84.201.129.203:8888/api/cases/${id}`, {
            headers: headers
        })
            .then(res => {
                console.log(res);
                const newArr = this.state.stolenBikes.splice(index, 1);
                this.setState({ newArr });
            })
    }

    updateBikeList() {
        axios.get('http://84.201.129.203:8888/api/cases', {
            headers: headers
        })
            .then(res => {
                const stolenBikes = res.data;
                this.setState({ stolenBikes })
                console.log(res.data);
            })
    }

    getBikeId(id) {
        this.setState({ bikeId: id });
    }

    render() {

        const Bike = () => <BikePage bikeId={this.state.bikeId}
            updateBikeList={this.updateBikeList} />;

        return (
            <Router>
                <Route path='/bikePage' component={Bike} />
                <ContentConteyner>
                    {this.state.info}
                    <UserList style={{ display: this.state.listStyle }}>
                        <Hover>Украденные велосипеды:</Hover>
                        {this.state.stolenBikes.map((data, index) => <Ul><Li>
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} onClick={this.getBikeId.bind(this, data._id)} to='/bikePage'>
                                <ListElem><DataItem>{`Цвет: ${data.color}`}</DataItem>
                                    <DataItem>{`Имя владельца: ${data.ownerFullName}`}</DataItem>
                                    <DataItem>{`Номер лицензии: ${data.licenseNumber}`}</DataItem>
                                    <DataItem>{`Статус: ${(data.status === 'new') ? 'Новый' : (data.status === 'in_progress') ?
                                        'В процессе выполнения' : 'Завершен'}`}</DataItem></ListElem></Link>
                            <Btn onClick={this.bikeDelete.bind(this, data._id, index)}>Удалить сообщение</Btn></Li></Ul>)}
                    </UserList>
                </ContentConteyner>
            </Router>
        )
    }
}

export default StolenBikes