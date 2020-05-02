import React from 'react';
import RegImg from '../images/RegImg.jpg';
import styled from 'styled-components';

import axios from 'axios';

// Мой ID d817345b-a4aa-4372-b935-79d3de6b22cc

const ContentConteyner = styled.div`
    background-image: url(${RegImg});
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

const Form = styled.div`
    margin: 0 auto;
    margin-top: 139px;
    width: 334px;
    height: 467px;
    background: rgba(0, 0, 0, 0.46);
    position: relative;
    z-index: 151;
    color: white
`;

const FormContayner = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 445px;
    margin: 0 auto;
`;

const Input = styled.input`
    border: none;
    font-size: 14px;
    line-height: 23px;
    width: 231px;
    background-color: #fff0;
    color: #FFFFFF;
    margin-bottom: 31px;
`;

const SendBtn = styled.button`
    cursor: pointer;
    background: #E3B873;
    color: white;
    border-radius: 2px;
    width: 161px;
    height: 37px;
    margin: 0 auto;
    position: relative;
    bottom: 2px;
    border: 0;
`;

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            repassword: '',
            clientId: ''
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://84.201.129.203:8888/api/auth/sign_up', {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            repassword: this.state.repassword,
            clientId: this.state.clientId
        })
            .then(res => {
                console.log(res);
            })
    }

    render() {

        return (
            <ContentConteyner>
                <Form>
                    <FormContayner onSubmit={this.handleSubmit}>
                        <h2 style={{ marginLeft: '22px' }}>Регистрация:</h2>
                        <Input type='text' name='firstName' placeholder='Имя:' value={this.state.firstName} onChange={this.handleChange} />
                        <Input type='text' name='lastName' placeholder='Фамилия:' value={this.state.lastName} onChange={this.handleChange} />
                        <Input type='password' name='password' placeholder='Пароль:' value={this.state.password} onChange={this.handleChange} />
                        <Input type='password' name='repassword' placeholder='Повторите пароль:' value={this.state.repassword} onChange={this.handleChange} />
                        <Input type='text' name='email' placeholder='E-mail:' value={this.state.email} onChange={this.handleChange} />
                        <Input type='text' name='clientId' placeholder='ID клиента' value={this.state.clientId} onChange={this.handleChange} />
                        <SendBtn type='submit'>Зарегистрироваться</SendBtn>
                    </FormContayner>
                </Form>
            </ContentConteyner>
        )
    }
}

export default Registration