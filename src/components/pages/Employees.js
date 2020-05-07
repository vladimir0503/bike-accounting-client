import React from 'react';
import styled from 'styled-components';
import employess from '../images/employess.jpg';
import axios from 'axios';

let token = localStorage.getItem('myToken');

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
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
    padding: 1px;
`;

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 705px;
    border: 1px solid #FFFFFF;
    padding: 5px;
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

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employess: [],
            info: null,
            listStyle: null,
            toApprove: true
        }
    }

    hideInfo() {
        this.setState({ info: null });
    }

    componentDidMount() {
        axios.get('http://84.201.129.203:8888/api/officers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const employess = res.data;
                this.setState({ employess })
                console.log(employess)
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

    userDelete(id, index) {
        axios.delete(`http://84.201.129.203:8888/api/officers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                const newArr = this.state.employess.splice(index, 1);
                this.setState({ newArr });
            })
    }

    userApprove(id) {
        axios.put(`http://84.201.129.203:8888/api/officers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            approved: this.state.toApprove
        })
            .then(res => {
                console.log(res);
            });
        console.log(id);
    }

    render() {


        return (
            <ContentContayner>
                {this.state.info}
                <UserList style={{ display: this.state.listStyle }}>
                    <Hover>Ответственные сотрудники:</Hover>
                    {this.state.employess.map((data, index) => <ul><Li>{data.firstName} {data.lastName}
                        {data.approved ? ' (одобрен)' : ' (не одобрен)'}
                        {data.approved ? null : <Btn onClick={this.userApprove.bind(this, data._id)}>Одобрить</Btn>}
                        <Btn onClick={this.userDelete.bind(this, data._id, index)}>Удалить сотрудника</Btn></Li></ul>)}
                </UserList>
            </ContentContayner>
        )
    }
}

export default Employees