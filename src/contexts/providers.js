'use client'

import { useReducer } from "react";
import { DispatchContext } from "./DispatchContext";
import { StateContext } from "./StateContext";

export default function Providers({ children }) {

    //All initial state variables
    const initialState = {
        formsData: []
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'CATCH_TOKEN':
                return {
                    ...state,
                    userToken: action.userTokenValue
                }
            default:
                return state;
        }
    }

    // Global state and dispatch variables
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Providers value={state}>
            <DispatchContext.Providers value={dispatch}>
                {children}
            </DispatchContext.Providers>
        </StateContext.Providers>
    );
};