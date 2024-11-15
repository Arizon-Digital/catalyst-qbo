'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

interface CommonContext {
  open: any;
  getCurrencyCode: any;
  getCartId: any;
  handlePopup: (data?: any) => void;
  setCurrencyCodeFn: (data?: any) => void;
  setCartIdFn: (data?: any) => void;
}

const CommonContext = createContext<CommonContext | undefined>({
  open: false,
  getCurrencyCode: 'CAD',
  getCartId: '',
  handlePopup: () => { },
  setCurrencyCodeFn: () => { },
  setCartIdFn: () => { },
});

function CommonReducer(state: any, action: any) {
  if(action.type === 'DISPLAY_POPUP') {
    return {
      items: {
        open: action.payload,
        currencyCode: { ...state.items.currencyCode },
        cartId: {... state.items.cartId}
      },
    };
  } else if(action.type === 'CURRENCY_CODE') {
    return {
      items: {
        open: state.items.open,
        currencyCode: action.payload,
        cartId: {... state.items.cartId}
      },
    };
  } else if(action.type === 'CART_ID') {
    return {
      items: {
        open: state.items.open,
        currencyCode: { ...state.items.currencyCode },
        cartId: action.payload,
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
      cartId: '',
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

  const setCartIdFn = (items: any) => {
    commonDispatch({
      type: 'CART_ID',
      payload: items
    });
  }

  const value = {
    open: commonState?.items?.open,
    getCurrencyCode: commonState?.items?.currencyCode,
    getCartId: commonState?.items?.cartId,
    handlePopup,
    setCurrencyCodeFn,
    setCartIdFn
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
