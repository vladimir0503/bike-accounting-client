import React from 'react';
import styled from 'styled-components';
import theftImg from '../images/theftImg.jpg';
import axios from 'axios';

const token = localStorage.getItem('myToken');
const headers = { 'Authorization': `Bearer ${token}` };

const ContentContayner = styled.div`
    background-image: url(${theftImg});
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
    height: 451px;
    background: rgba(0,0,0,0.46);
    position: relative;
    z-index: 151;
    color: white;
`;

const FormContent = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 431px;
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

const DateContayner = styled.div`
    display: flex;
    max-width: 200px;
    color: gray;
`;

const Label = styled.label`
    margin-right: 17px;
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
    margin-top: -510px;
    background: rgba(0,0,0,0.46);
    color: white;
    z-index: 151;
    cursor: pointer;
`;

const ErrorInfo = styled.div`
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

class NewCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            errorInfo: null,
            styleForm: null
        }
    }

    componentDidMount() {
        axios.get('http://84.201.129.203:8888/api/cases', {
            headers: headers
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    info: <ErrorInfo onClick={this.hideInfo.bind(this)}>
                        <p>Вы не вошли в систему!</p>
                    </ErrorInfo>,
                    styleForm: 'none'
                })
            })
    }

    hideInfo() {
        this.setState({ info: null });
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const formData = [
            this.state.date,
            this.state.licenseNumber,
            this.state.color,
            this.state.ownerFullName,
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

        const data = {
            date: this.state.date,
            licenseNumber: this.state.licenseNumber,
            color: this.state.color,
            ownerFullName: this.state.ownerFullName,
            clientId: this.state.clientId
        };

        axios.post('http://84.201.129.203:8888/api/cases', data, {
            headers: headers
        })
            .then(res => {
                console.log(res);
                this.setState({
                    info: <Info onClick={this.hideInfo.bind(this)}>
                        <p>Сообщение отправленно.</p>
                    </Info>,
                    date: '',
                    licenseNumber: '',
                    color: '',
                    ownerFullName: '',
                    clientId: ''
                })
            })
    }

    render() {
        return (
            <ContentContayner>
                {this.state.errorInfo}
                <Form style={{ display: this.state.styleForm }}>
                    <FormContent onSubmit={this.handleSubmit}>
                        <h2 style={{ marginLeft: '22px' }}>Новый случай:</h2>
                        <DateContayner>
                            <Label>Дата:</Label>
                            <Input type='date' name='date' value={this.state.date} onChange={this.handleChange} />
                        </DateContayner>
                        <Input type='text' name='color' placeholder='Цвет:' value={this.state.color} onChange={this.handleChange} />
                        <Input type='text' name='licenseNumber' placeholder='Номер лицензии:' value={this.state.licenseNumber} onChange={this.handleChange} />
                        <Input type='text' name='ownerFullName' placeholder='Полное имя владельца:' value={this.state.ownerFullName} onChange={this.handleChange} />
                        <Input type='text' name='clientId' placeholder='ID клиента' value={this.state.clientId} onChange={this.handleChange} />
                        <SendBtn type='submit'>Отправить</SendBtn>
                    </FormContent>
                </Form>
                {this.state.info}
            </ContentContayner>
        )
    }
}

export default NewCase