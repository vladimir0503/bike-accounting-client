import React from 'react';
import styled from 'styled-components';
import theftImg from '../images/theftImg.jpg';

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
    height: 398px;
    background: rgba(0, 0, 0, 0.46);
    position: relative;
    z-index: 151;
    color: white
`;

const FormContayner = styled.div`
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

class ReportTheft extends React.Component {
    render() {
        return (
            <ContentContayner>
                <Form>
                    <FormContayner>
                        <h2 style={{ marginLeft: '22px' }}>Сообщить о краже:</h2>
                        <Input type='date' />
                        <Input type='text' placeholder='Номер лицензии:' />
                        <Input type='text' placeholder='Цвет:' />
                        <Input type='text' placeholder='Полное имя владельца:' />
                        <SendBtn>Отправить</SendBtn>
                    </FormContayner>
                </Form>
            </ContentContayner>
        )
    }
}

export default ReportTheft