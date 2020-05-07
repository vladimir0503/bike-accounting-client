import React from 'react';
import styled from 'styled-components';
import homeImg from '../images/home.jpg';

const ContentContayner = styled.div`
    background-image: url(${homeImg});
    width: 100vw;
    height: 100vh;
    background-size: cover;
    position: absolute;

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

const ContentDiv = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    max-width: 1143px;
    margin: 0 auto;
    padding-top: 116px;
    position: relative;
    z-index: 1;
`;

const Home = ({ user }) => {
    return (
        <ContentContayner>
            <ContentDiv>
                <div style={{ width: '699px' }}>
                    <h2 style={{ margin: '0px' }}><span style={{ color: '#E3B873' }}>
                        Добро пожаловать {user}!</span></h2>
                    <p>Вы находитесь на странице сервиса по учету украденных велосипедов.</p>
                    <p>К большому сожалению, участились случаи краж нашего имущества. По-этому наша компания
                    запустила систему учета краж наших велосипедов. Если у Вас есть что сообщить, пожалуйста
                    кликните на кнопку меню в левой части страницы.</p>
                </div>
            </ContentDiv>
        </ContentContayner>
    )
}

export default Home