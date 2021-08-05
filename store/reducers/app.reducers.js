import * as Actions from '../actions';
import React, {Component} from 'react';

const initialState = {
    window_dimension : {
        height: 0,
        width: 0
    }
}

const appReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.UPDATE_WINDOW_DIMENSION:
        {
            return {
                ...state,
                window_dimension: action.window_dimension
            };
        }
        default:
        {
            return state;
        }
    }
}

export default appReducer;