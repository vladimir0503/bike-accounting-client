import React from 'react';
import styled from 'styled-components';
import stolen from '../images/stolen.jpg';
import axios from 'axios';

const token = localStorage.getItem('myToken');
const headers = { 'Authorization': `Bearer ${token}` };

const ContentConteyner = styled.div`
    background-image: url(${stolen});
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

const BikeCard = styled.div`
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

const Select = styled.select`
    background-color: #fff0;
    color: #FFFFFF;
    border: 0;
    width: 236px;
    height: 36px;
    position: relative;
    top: 21px;
    right: 28px;
`;

const Option = styled.option`
    color: black;
`;

class BikePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            date: '',
            licenseNumber: '',
            color: '',
            type: '',
            ownerFullName: '',
            officer: '',
            createdAt: '',
            updateAt: '',
            clientId: '',
            description: '',
            resolution: '',
            userId: [],
            hideResolution: null,
            hideStatusSelect: null
        }
    }

    componentDidMount() {

        localStorage.setItem('bikeId', this.props.bikeId);

        axios.get(`http://84.201.129.203:8888/api/cases/${localStorage.getItem('bikeId')}`, {
            headers: headers
        })
            .then(res => {

                const statusMapper = {
                    new: 'Новый',
                    in_progress: 'В процессе выполнения',
                    done: 'Завершен',
                };

                const status = statusMapper[res.data.status];
                let hideResolution = 'none';
                let hideStatusSelect = null;

                if(res.data.status === 'new') {
                    hideResolution = 'none';
                    hideStatusSelect = null;
                }else if (res.data.status === 'in_progress') {
                    hideResolution = 'none';
                    hideStatusSelect = null;
                } else {
                    hideResolution = null;
                    hideStatusSelect = 'none';
                }
                
                this.setState({
                    status: `Статус: ${status}`,
                    date: `Дата: ${res.data.date}`,
                    licenseNumber: `Номер лицензии: ${res.data.licenseNumber}`,
                    color: `Цвет: ${res.data.color}`,
                    ownerFullName: `Имя владельца: ${res.data.ownerFullName}`,
                    officer: `ID сотрудника: ${res.data.officer}`,
                    createdAt: `Дата создания: ${res.data.createdAt}`,
                    updateAt: `Дата обновления: ${res.data.updateAt}`,
                    description: `Описание: ${res.data.description}`,
                    resolution: `Завершающий коментарий: ${res.data.resolution}`,
                    hideResolution: hideResolution,
                    hideStatusSelect: hideStatusSelect
                });
            })

        axios.get('http://84.201.129.203:8888/api/officers', {
            headers: headers
        })
            .then(res => {
                const userId = res.data;
                this.setState({ userId });
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

        axios.put(`http://84.201.129.203:8888/api/cases/${localStorage.getItem('bikeId')}`, data, {
            headers: headers
        })
            .then(res => {
                console.log(res)
                this.setState({ inputValue: '' })
            })
        this.props.updateBikeList();
    }

    toHome() {
        this.props.updateBikeList();
        window.history.back();
    }

    render() {

        return (
            <ContentConteyner>
                <BikeCard>
                    <div style={{ display: 'flex' }}>
                        <Hover>Карточка велосипеда:</Hover>
                        <ExitBtn onClick={this.toHome.bind(this)}>х</ExitBtn>
                    </div>
                    <Field><FieldName>{this.state.status}</FieldName>
                        <Select style={{ display: this.state.hideStatusSelect }} onChange={this.handleChange.bind(this)}>
                            <Option value={'new'}>Новый</Option>
                            <Option value={'in_progress'}>В процессе выполнения</Option>
                            <Option value={'done'}>Завершен</Option>
                        </Select>
                        <Btn style={{ display: this.state.hideStatusSelect }} onClick={this.editField.bind(this, { status: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.date}</FieldName>
                        <Input type='date' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { date: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.licenseNumber}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { licenseNumber: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.color}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { color: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.ownerFullName}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { ownerFullName: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.officer}</FieldName>
                        <Select onChange={this.handleChange.bind(this)}>{this.state.userId.map(user => <Option key={user._id} value={user._id}>
                            {user.firstName} {user.lastName}</Option>)}</Select>
                        <Btn onClick={this.editField.bind(this, { officer: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.createdAt}</FieldName>
                        <Input type='datetime-local' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { createdAt: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.updateAt}</FieldName>
                        <Input type='datetime-local' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { updateAt: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field><FieldName>{this.state.description}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { description: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                    <Field style={{ display: this.state.hideResolution }}><FieldName>{this.state.resolution}</FieldName>
                        <Input type='text' placeholder='Введите данные для редактирования:' onChange={this.handleChange.bind(this)} />
                        <Btn onClick={this.editField.bind(this, { resolution: this.state.inputValue })}>Редактировать</Btn>
                    </Field>
                </BikeCard>
            </ContentConteyner>
        )
    }
}

export default BikePage