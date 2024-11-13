'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

interface CommonContext {
  open: any;
  getCurrencyCode: any;
  handlePopup: (data?: any) => void;
  setCurrencyCodeFn: (data?: any) => void;
}

const CommonContext = createContext<CommonContext | undefined>({
  open: false,
  getCurrencyCode: 'CAD',
  handlePopup: () => { },
  setCurrencyCodeFn: () => { },
});

function CommonReducer(state: any, action: any) {
  if(action.type === 'DISPLAY_POPUP') {
    return {
      items: {
        currencyCode: { ...state.items.currencyCode },
        open: action.payload,
      },
    };
  } else if(action.type === 'CURRENCY_CODE') {
    return {
      items: {
        open: state.items.open,
        currencyCode: action.payload,
      },
    };
  }
  return state;
}

export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [commonState, commonDispatch] = useReducer(CommonReducer, {
    items: {
      open: false,
      currencyCode: 'CAD',
    }
  });

  const handlePopup = (open: any) => {
    commonDispatch({
      type: 'DISPLAY_POPUP',
      payload: open
    });
  }

  const setCurrencyCodeFn = (items: any) => {
    commonDispatch({
      type: 'CURRENCY_CODE',
      payload: items
    });
  }

  const value = {
    open: commonState?.items?.open,
    getCurrencyCode: commonState?.items?.currencyCode,
    handlePopup,
    setCurrencyCodeFn
  };

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>;
};

export const useCommonContext = () => {
  const context = useContext(CommonContext);

  if (context === undefined) {
    throw new Error('useCommonContext must be used within a CommonContext');
  }

  return context;
};
