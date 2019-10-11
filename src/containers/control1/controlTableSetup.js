import React, { Component } from 'react'
export const subComponent = row => {
    return (
        <div>
            {row.original.types.map((type, id) => {
                return (
                    <div className='subRow' key={id}>{type.name}</div>
                );
            })}
        </div>
    );
};