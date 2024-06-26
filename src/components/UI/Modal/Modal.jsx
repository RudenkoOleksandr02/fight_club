import cl from './Modal.module.css';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? `${cl.modal + ' ' + cl.active}` : cl.modal} onClick={() => setActive(false)}>
            <div className={active ? `${cl.modal__content + ' ' + cl.active}` : cl.modal__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;