'use client';

import { createContext, useReducer } from "react";

const initialState = {
    selectedForm: []
};

const formsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SELECTED_FORMS:
            return { ...state, selectedForm: payload.selectedForm }

        default:
            return state
    }
};

export const FormsContext = createContext(initialState);

export default function FormsProvider({ children }) {
    const [state, dispatch] = useReducer(formsReducer, initialState);

    return <FormsContext.Provider value={{ state, dispatch }}>
        {children}
    </FormsContext.Provider>
};