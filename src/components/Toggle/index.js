import React from 'react'
import './styles.css'

export default function Toggle({ isToggled, onClicked }) {
    return (
        <div className="ToggleWrapper">
            <div className={!isToggled ? 'toggle' : 'toggle night'} onClick={onClicked}>
                <div className="notch">
                    <div className="crater"></div>
                    <div className="crater"></div>
                </div>
                <div>
                    <div className="shape sm"></div>
                    <div className="shape smmd"></div>
                    <div className="shape md"></div>
                    <div className="shape lg"></div>
                    <div className="halfmoon"></div>
                </div>
            </div>
        </div>
    )
}