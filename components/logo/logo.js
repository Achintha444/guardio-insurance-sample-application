import React from 'react'

export default function Logo(props) {
    return (
        <div>
            <h1 style={{
                fontSize: props.fontSize,
                letterSpacing: props.letterSpacing,
                wordSpacing: props.wordSpacing
            }}>
                <span>Guardio</span> Insurance
            </h1>
        </div>
    )
}
