import { FC } from 'react';
import styled from 'styled-components';

type ModalType = {
    isOpen: boolean;
    toggleModal: (bool:boolean)=>void;
    modalTitle: string;
    modalMsg: string;
};
const ModalComponent: FC<ModalType> = ({isOpen, modalTitle, modalMsg, toggleModal})=>{
    
    modalTitle = modalTitle === ""? " Message " : modalTitle;
    const handleToggleModal = ()=>{
        toggleModal(false);
    };
    return(
        <>
        {isOpen?
            <Modal>
                <div className="modal-title"><p>{modalTitle}</p></div>
                <div className="modal-body"><p>{modalMsg}</p></div>
                <button className="modal-btn" onClick={handleToggleModal}>Ok</button>
            </Modal>
        :
            null
        }
        </>
    );
};
const Modal = styled.div`
    position: absolute;
    width: 320px;
    left: calc(50% - 160px);
    border: 1px solid black;
    border-radius: 4px;
    heigth: 200px;
    modal-title{
        border-bottom: 1px solid black;
        margin-bottom: 1em;
    }
    p{
        text-align: center;
    }
`
export default ModalComponent;