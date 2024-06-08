import React from "react";

export default function Button({ value, disabled }) {
    return (
        <div className="submit-section">
            <button className="btn btn-primary submit-btn" type="submit" disabled={disabled}>
            {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
            </button>
        </div>
    );
}