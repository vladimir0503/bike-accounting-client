import React from 'react';
import styled from 'styled-components';
import RegImg from '../images/RegImg.jpg';
import axios from 'axios';

const ContentContayner = styled.div`
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
    height: 260px;
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
`;

const FormContayner = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 400px;
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
    margin-top: -319px;
    background: rgba(0,0,0,0.46);
    color: white;
    z-index: 151;
    cursor: pointer;
`;

class Autorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            info: null
        }
    }

    hideInfo = () => {
        this.setState({ info: null });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const formData = [
            this.state.email,
            this.state.password
        ];

        for (let i = 0; i < formData.length; i++) {
            if (formData[i] === '') {
                this.setState({
                    info: <Info onClick={this.hideInfo}>
                        <p>Заполненны не все поля!</p>
                    </Info>
                })
                return;
            }
        }

        axios.post('http://84.201.129.203:8888/api/auth/sign_in', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                this.setState({
                    info: <Info onClick={this.hideInfo}>
                        <p>Вы успешно авторизованны.</p>
                    </Info>
                });
                let token = res.data.token;
                let user = res.data.firstName;
                localStorage.setItem('myToken', token);
                localStorage.setItem('user', user);
                window.location.reload();
                this.props.styleEnterBtn();
            })
            .catch(err => {
                const error = err.message;
                if(error) {
                    this.setState({
                        info: <Info onClick={this.hideInfo}>
                            <p>Учетные данные не верны!</p>
                        </Info>
                    });
                }
            })
            
    }

    render() {
        return (
            <ContentContayner>
                <Form>
                    <FormContayner onSubmit={this.handleSubmit}>
                        <h2 style={{ marginLeft: '22px' }}>Авторизация:</h2>
                        <Input type='text' name='email' placeholder='E-mail:' value={this.state.email} onChange={this.handleChange} />
                        <Input type='password' name='password' placeholder='Пароль:' value={this.state.password} onChange={this.handleChange} />
                        <SendBtn type='submit'>Войти</SendBtn>
                    </FormContayner>
                </Form>
                {this.state.info}
            </ContentContayner>
        )
    }
}

export default Autorization