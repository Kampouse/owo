import React, { createContext, useContext, useState, useEffect } from "react";

const UiContext = createContext();
const isMobile = true //typeof navigator !== 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false
const DEFAULT_UI_STATE = {
  latestConversationOpenedId: 'offer',
  onboardingRegistration: false,  // went trough the registration onboarding process
  onboardingListings: false,
  onboardingMessages: false,
  toasts: [],
}

export const UiContextProvider = ({ children }) => {
  const [uiState, setUiState] = useState(() => {
    const storedState = (typeof window !== "undefined") ? localStorage.getItem("uiState") : undefined;
    return storedState ? {...DEFAULT_UI_STATE, ...JSON.parse(storedState)} : DEFAULT_UI_STATE;
  });

  const [virtualKeyboardOpen, setVirtualKeyboardOpen] = useState(false);


  const changeUi = (key, value) => {
    const updatedState = { ...uiState, [key]: value };
    setUiState(updatedState);
    if (typeof window !== "undefined") {
      localStorage.setItem("uiState", JSON.stringify(updatedState));
    }
  };

  const addToast = (toast) => {
    const curentToasts = [...uiState.toasts]
    curentToasts.push(toast)
    changeUi('toasts', curentToasts)

    setTimeout(() => {
      const curentToasts = [...uiState.toasts]
      const newToasts = curentToasts.filter(t => t.id !== toast.id)
      changeUi('toasts', newToasts)
    }, 8*1000); // because in ToastContainer we have a delay of 7s
  }


  const watchKeyboard = {
    onFocus: () => {
      if (isMobile) { setVirtualKeyboardOpen(true) }
    },
    onBlur: () => {
      if (isMobile) { setVirtualKeyboardOpen(false) }
    }
  }


  return (
    <UiContext.Provider
      value={{
        uiState,
        changeUi,
        addToast,
        keyboard: {
          isOpen: virtualKeyboardOpen,
          watchKeyboard
        }
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within a UiProvider.");
  }
  return context;
};
