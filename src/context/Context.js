import React, { createContext } from 'react';

export const AppContext = createContext();

const initialState = {};

export const ContextProvider = ({ children }) => {
	return <AppContext.Provider value={value}>
		{children}
	</AppContext.Provider>
};