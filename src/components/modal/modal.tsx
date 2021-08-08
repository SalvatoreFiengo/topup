import { FC } from 'react';
import styled from 'styled-components';
type ModalType = {
    isOpen: boolean;
    toggleModal: ()=>void;
    modalTitle: string;
    modalMsg: JSX.Element;
    color: string
    isError?: boolean;
};
const ModalComponent: FC<ModalType> = ({isOpen, modalTitle, modalMsg, toggleModal,color, isError=false})=>{
    
    modalTitle = modalTitle === ""? " Message " : modalTitle;

    return(
        <>
        {isOpen?
            <Backdrop onClick={toggleModal}>
                <Modal color={color}>
                    <div className="modal-title"><p>{modalTitle}</p></div>
                    <div className="modal-body">{modalMsg}</div>
                    {isError?<div><p>Data will be loaded using 'mock data'</p></div>:null}
                    <button className="modal-btn" onClick={toggleModal}>Ok</button>
                </Modal>
            </Backdrop>
        :
            null
        }
        </>
    );
};
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
`
const Modal = styled.div`
    position: absolute;
    background-color: whitesmoke;
    width: 260px;
    left: calc(50% - 130px);
    top: 50%;
    border: 1px solid ${(props)=>props.color};
    border-radius: 4px;
    z-index: 100000;
    text-align: center;
    modal-title{
        border-bottom: 1px solid black;
        margin-bottom: 1em;
    }
    p{
        
        color: ${(props)=>props.color};
    }
    .modal-btn {
        background-color: rgb(203 242 0);
        border: 1px solid rgb(112, 140, 140);
        border-radius: 4px;
        margin-bottom: 4px;
    }
`
export default ModalComponent;