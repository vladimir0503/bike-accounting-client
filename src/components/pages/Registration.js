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
    height: 478px;
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
`;

const FormContent = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 500px;
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

// const CheckboxContayner = styled.div`
//     display: flex;
//     margin-bottom: 38px;
// `;

// const Checkbox = styled.input`
//     margin-right: 15px;
//     margin-left: 0px;
// `;

// const Label = styled.label`
//     color: gray;
//     font-size: 15px;
//     margin-top: -2px;
// `;

const SendBtn = styled.button`
    cursor: pointer;
    background: #fff0;
    color: white;
    border-radius: 2px;
    width: 161px;
    height: 37px;
    margin: 0 auto;
    position: relative;
    bottom: 2px;
    border: 0;
    border: 1px solid #FFFFFF;
    transition: 0.5s;
    :hover{
        background: #E3B873;
    }
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 334px;
    height: 38px;
    margin: 0 auto;
    margin-top: -536px;
    background: rgba(0,0,0,0.46);
    color: white;
    z-index: 151;
    cursor: pointer;
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
            clientId: '',
            approved: false,
            info: null
        }

    }

    hideInfo() {
        this.setState({ info: null });
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.name === 'approved' ? e.target.checked : e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const formData = [
            this.state.email,
            this.state.firstName,
            this.state.lastName,
            this.state.password,
            this.state.repassword,
            this.state.clientId
        ];

        for (let i = 0; i < formData.length; i++) {
            if (formData[i] === '') {
                this.setState({
                    info: <Info onClick={this.hideInfo.bind(this)}>
                        <p>Заполненны не все поля!</p>
                    </Info>
                })
                return;
            }
        }

        const user = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            repassword: this.state.repassword,
            clientId: this.state.clientId,
            approved: this.state.approved
        }

        axios.post('http://84.201.129.203:8888/api/auth/sign_up', {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            repassword: this.state.repassword,
            clientId: this.state.clientId,
            approved: this.state.approved
        })
            .then(res => {
                window.location.reload();
                console.log(res);
                this.setState({
                    info: <Info onClick={this.hideInfo.bind(this)}>
                        <p>Регистрация прошла успешно.</p>
                    </Info>
                })
            })

        console.log(user);
    }

    render() {

        return (
            <ContentConteyner>
                <Form>
                    <FormContent onSubmit={this.handleSubmit}>
                        <h2 style={{ marginLeft: '22px' }}>Регистрация:</h2>
                        <Input type='text' name='firstName' placeholder='Имя:' value={this.state.firstName} onChange={this.handleChange} />
                        <Input type='text' name='lastName' placeholder='Фамилия:' value={this.state.lastName} onChange={this.handleChange} />
                        <Input type='password' name='password' placeholder='Пароль:' value={this.state.password} onChange={this.handleChange} />
                        <Input type='password' name='repassword' placeholder='Повторите пароль:' value={this.state.repassword} onChange={this.handleChange} />
                        <Input type='text' name='email' placeholder='E-mail:' value={this.state.email} onChange={this.handleChange} />
                        <Input type='text' name='clientId' placeholder='ID клиента' value={this.state.clientId} onChange={this.handleChange} />
                        {/* <CheckboxContayner>
                            <Checkbox type='checkbox' name='approved' checked={this.state.approved} onChange={this.handleChange} />
                            <Label>Одобренный сотрудник</Label>
                        </CheckboxContayner> */}
                        <SendBtn type='submit'>Зарегистрироваться</SendBtn>
                    </FormContent>
                </Form>
                {this.state.info}
            </ContentConteyner>
        )
    }
}

export default Registration