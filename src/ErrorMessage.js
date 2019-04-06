import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = props => {
    if (!props.children ||
        (typeof props.children === "string" && props.children.trim().length < 1))
        return null;

    const drawCloseButton = (typeof props.closeButton === 'boolean') ? props.closeButton : true;

    const closeErrorWindow = e => {
        // e.persist();
        const errorWindow = e.target.parentNode;

        errorWindow.style.opacity = 0;
        setTimeout(() => errorWindow.remove(), 400);
    }

    return (
        <div className="ErrorMessage_window">
            {drawCloseButton && <i className="fas fa-times-circle ErrorMessage_closeWindowBtn" onClick={closeErrorWindow} />}
            <i className="fas fa-exclamation-circle ErrorMessage_warningIcon" />
            {props.children}
        </div>
    )
}

export default ErrorMessage;