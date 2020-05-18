import React from 'react';
import styled from 'styled-components';
import employess from '../images/employess.jpg';
import axios from 'axios';
import EmployeePage from './EmployeePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const token = localStorage.getItem('myToken');
const headers = { 'Authorization': `Bearer ${token}` };

const ContentContayner = styled.div`
    background-image: url(${employess});
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

const User = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin: 0 auto;
    margin-bottom: 15px;
    margin-top: 8px;
    max-width: 705px;
    border: 1px solid #FFFFFF;
`;

const Hover = styled.h2`
    width: 328px;
    margin: 0 auto;
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

const ListElem = styled.li`
    list-style-type: none;
    color: white;
    transition: 0.5s;
    cursor: pointer;
    :hover {
        color: #E3B873;
    }
`;

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employess: [],
            info: null,
            listStyle: null,
            toApprove: true,
            approved: null,
            userId: null
        }
    }

    hideInfo = () => {
        this.setState({ info: null });
    }

    componentDidMount() {
        axios.get('http://84.201.129.203:8888/api/officers', {
            headers: headers
        })
            .then(res => {
                const employess = res.data;
                this.setState({ employess });
            })
            .catch(err => {
                this.setState({
                    info: <Info onClick={this.hideInfo}>
                        <p>Вы не вошли в систему!</p>
                    </Info>,
                    listStyle: 'none'
                })
            })
    }

    userDelete = (id, index) => {
        axios.delete(`http://84.201.129.203:8888/api/officers/${id}`, {
            headers: headers
        })
            .then(res => {
                const newArr = this.state.employess.splice(index, 1);
                this.setState({ newArr });
            })
    }

    userApprove = (id) => {

        const data = { approved: this.state.toApprove }

        axios.put(`http://84.201.129.203:8888/api/officers/${id}`, data, {
            headers: headers
        })
        .then(res => {
            this.updateUserList();
        });

    }

    updateUserList = () => {
        axios.get('http://84.201.129.203:8888/api/officers', {
            headers: headers
        })
            .then(res => {
                const employess = res.data;
                this.setState({ employess });
            })
    }

    getUserId(id) {
        this.setState({ userId: id })
    }

    render() {

        const Employee = () => <EmployeePage userId={this.state.userId}
            updateUserList={this.updateUserList}
        />

        return (
            <Router>
                <Route path='/employeePage'
                    component={Employee} />
                <ContentContayner>
                    {this.state.info}
                    <UserList style={{ display: this.state.listStyle }}>
                        <Hover>Ответственные сотрудники:</Hover>
                        {this.state.employess.map((data, index) => <User><Link style={{ color: 'inherit', textDecoration: 'none' }} onClick={this.getUserId.bind(this, data._id)}
                            to='/employeePage'><ListElem>{data.firstName} {data.lastName} {data.approved ? ' (одобрен)' : ' (не одобрен)'}</ListElem></Link>
                            {data.approved ? null : <Btn onClick={() => this.userApprove(data._id)}>Одобрить</Btn>}
                            <Btn onClick={() => this.userDelete(data._id, index)}>Удалить сотрудника</Btn></User>)}
                    </UserList>
                </ContentContayner>
            </Router>
        )
    }
}

export default Employees