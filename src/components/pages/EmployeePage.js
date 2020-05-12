import React from 'react';
import styled from 'styled-components';
import employess from '../images/employess.jpg';
import axios from 'axios';

const token = localStorage.getItem('myToken');
const headers = { 'Authorization': `Bearer ${token}` };

const ContentContayner = styled.div`
    background-image: url(${employess});
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-size: cover;
    z-index: 151;

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

const EmployeeCard = styled.div`
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

const Hover = styled.h2`
    display: flex;
    justify-content: center;
    width: 328px;
    margin: 0 auto;
`;

const Input = styled.input`
    border: none;
    font-size: 14px;
    line-height: 23px;
    width: 293px;
    background-color: #fff0;
    color: #FFFFFF;
`;

const Field = styled.div`
    display: flex;
    width: 700px;
    margin: 0 auto;
    justify-content: space-between;
`;

const FieldName = styled.p`
    width: 200px;
`;

const Btn = styled.button`
    cursor: pointer;
    background: #fff0;
    color: white;
    border-radius: 2px;
    width: 149px;
    height: 33px;
    margin-top: 9px;
    position: relative;
    border: 1px solid #FFFFFF;
    transition: 0.5s;
    :hover{
        background: #E3B873;
    }
`;

const ExitBtn = styled.button`
    cursor: pointer;
    background: #fff0;
    color: white;
    border-radius: 2px;
    width: 20px;
    height: 20px;
    position: relative;
    border: 1px solid #FFFFFF;
    transition: 0.5s;
    :hover{
        background: #E3B873;
    }
`;

class EmployeePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            email: '',
            firstName: '',
            lastName: '',
            approved: '',
            inputValue: '',
        }

        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {

        localStorage.setItem('userId', this.state.userId);

        axios.get(`http://84.201.129.203:8888/api/officers/${localStorage.getItem('userId')}`, {
            headers: headers
        })
            .then(res => {
                this.setState({
                    email: `Почта: ${res.data.email}`,
                    firstName: `Имя: ${res.data.firstName}`,
                    lastName: `Фамилия: ${res.data.lastName}`,
                    approved: `Статус: ${res.data.approved ? 'одобрен' : 'не одобрен'}`
                });
            })
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value,
        })
    }

    editField(fieldName) {

        if (this.state.inputValue === '') {
            return;
        }

        const data = fieldName;

        axios.put(`http://84.201.129.203:8888/api/officers/${localStorage.getItem('userId')}`, data, {
            headers: headers
        })
            .then(res => {
                console.log(res)
                this.setState({ inputValue: '' })
            })
        this.updateUser();
        this.props.updateUserList();
    }

    updateUser() {
        axios.get(`http://84.201.129.203:8888/api/officers/${localStorage.getItem('userId')}`, {
            headers: headers
        })
            .then(res => {
                this.setState({
                    email: `Почта: ${res.data.email}`,
                    firstName: `Имя: ${res.data.firstName}`,
                    lastName: `Фамилия: ${res.data.lastName}`,
                    approved: `Статус: ${res.data.approved ? 'одобрен' : 'не одобрен'}`
                });
            })
    }

    toHome() {
        this.props.updateUserList();
        window.history.back();
    }

    render() {
        return (
            <ContentContayner>
                <EmployeeCard>
                    <div style={{display: 'flex'}}>
                        <Hover>Карточка сотрудника</Hover>
                        <ExitBtn onClick={this.toHome.bind(this)}>х</ExitBtn>
                    </div>
                    <Field><FieldName>{this.state.firstName}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { firstName: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.lastName}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { lastName: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.email}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { email: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.approved}</FieldName></Field>
                </EmployeeCard>
            </ContentContayner>
        )
    }
}

export default EmployeePage