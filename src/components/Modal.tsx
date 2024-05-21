import { useEffect, useRef } from "react"
import styled from "styled-components"

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    padding: 50px;
    z-index: 1000;
`

interface IProps {
    children: JSX.Element
    onClose: () => void
}

const Modal = ({children, onClose}: IProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const onDismiss = (e: any) => {
        if (wrapperRef.current === e.target) onClose()
    }

    useEffect(()=> {
        const element = wrapperRef.current
        if (element) {
            element.addEventListener('click', onDismiss);
            return () => {
                element.removeEventListener('click', onDismiss);
            };
        }
    }, [onDismiss, wrapperRef])


    return (
        <ModalWrapper ref={wrapperRef}>{children}</ModalWrapper>
    )
}

export default Modal