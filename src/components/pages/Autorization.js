import React from 'react';
import styled from 'styled-components';
import RegImg from '../images/RegImg.jpg';

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

class Autorization extends React.Component {
    render() {
        return (
            <ContentConteyner>
                <Form>
                    <FormContayner>
                        <h2 style={{ marginLeft: '22px' }}>Авторизация:</h2>
                        <Input type='text' placeholder='Имя:' />
                        <Input type='text' placeholder='Фамилия:' />
                        <Input type='text' placeholder='Отчество:' />
                        <Input type='text' placeholder='E-mail:' />
                        <SendBtn>Войти</SendBtn>
                    </FormContayner>
                </Form>
            </ContentConteyner>
        )
    }
}

export default Autorization