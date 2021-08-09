import { FC } from 'react';
import styled from 'styled-components';

const HeaderComponent:FC = ()=>{

    return(
        <Header>
            <div>TopUp App</div>
        </Header>
    );
};

const Header = styled.header`
    height: 64px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.4s ease 0s;
    background: rgb(204, 255, 246);
    font-weight: bold;
    div{
        font-size: 28px;
        text-align: center;
        padding: 0px 16px;
        width: 50%;
        max-width: 1140px;
        margin: 0px auto;
    }
`;
export default HeaderComponent;