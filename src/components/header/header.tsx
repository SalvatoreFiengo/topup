import { FC } from 'react';
import styled from 'styled-components';

const HeaderComponent:FC = ()=>{
    const links = ["Top-Up", "Login", "Sign-up"];
    return(
        <Header>
            <div>TopUp <div>{links.map((link, i)=><a key={i}>{link}</a>)}</div></div>
        </Header>
    );
};

const Header = styled.header`
    height: 64px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.4s ease 0s;
    margin-bottom: 2em;
    div{
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 0px 16px;
        width: 100%;
        max-width: 1140px;
        margin: 0px auto;
        div{
            -webkit-box-flex: 1;
            flex-grow: 1;
            display: flex;
            -webkit-box-pack: end;
            place-content: center flex-end;
            a{ margin-right:1em;}
        }
    }
`;
export default HeaderComponent;