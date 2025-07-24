import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ScopeData, PriceEstimate } from './types';

interface ScopeBuilderState {
  currentStep: number;
  scopeData: ScopeData;
  priceEstimate: PriceEstimate | null;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

type ScopeBuilderAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_SCOPE_DATA'; payload: Partial<ScopeData> }
  | { type: 'SET_PRICE_ESTIMATE'; payload: PriceEstimate }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'RESET_SCOPE' };

const initialState: ScopeBuilderState = {
  currentStep: 0,
  scopeData: {
    issueType: '',
    subCategory: '',
    location: '',
    buildingArea: '',
    description: '',
    photos: [],
    videoClip: undefined,
    annotations: [],
    urgency: 'Soon',
    accessInstructions: '',
    preferredTimeframe: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  },
  priceEstimate: null,
  isSubmitting: false,
  errors: {}
};

function scopeBuilderReducer(state: ScopeBuilderState, action: ScopeBuilderAction): ScopeBuilderState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_SCOPE_DATA':
      return { 
        ...state, 
        scopeData: { ...state.scopeData, ...action.payload },
        errors: {} // Clear errors when data updates
      };
    case 'SET_PRICE_ESTIMATE':
      return { ...state, priceEstimate: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET_SCOPE':
      return initialState;
    default:
      return state;
  }
}

interface ScopeBuilderContextType {
  state: ScopeBuilderState;
  dispatch: React.Dispatch<ScopeBuilderAction>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateScopeData: (data: Partial<ScopeData>) => void;
  isCurrentStepValid: () => boolean;
}

const ScopeBuilderContext = createContext<ScopeBuilderContextType | undefined>(undefined);

export const useScopeBuilder = () => {
  const context = useContext(ScopeBuilderContext);
  if (!context) {
    throw new Error('useScopeBuilder must be used within a ScopeBuilderProvider');
  }
  return context;
};

interface ScopeBuilderProviderProps {
  children: ReactNode;
}

export const ScopeBuilderProvider: React.FC<ScopeBuilderProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(scopeBuilderReducer, initialState);

  const isCurrentStepValid = (): boolean => {
    const { scopeData, currentStep } = state;

    switch (currentStep) {
      case 0: // Issue Type Selection
        return !!scopeData.issueType && !!scopeData.subCategory;
      case 1: // Location Details
        return !!scopeData.location && !!scopeData.description && !!scopeData.urgency;
      case 2: // Media Capture
        return scopeData.photos.length > 0;
      case 3: // Review & Submit
        return !!scopeData.contactInfo.name && !!scopeData.contactInfo.email;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (isCurrentStepValid() && state.currentStep < 3) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    }
      // Validation failed - errors handled by isCurrentStepValid
  }
  const prevStep = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step <= 3) {
      dispatch({ type: 'SET_STEP', payload: step });
    }
  };

  const updateScopeData = (data: Partial<ScopeData>) => {
    dispatch({ type: 'UPDATE_SCOPE_DATA', payload: data });
  };

  const value: ScopeBuilderContextType = {
    state,
    dispatch,
    nextStep,
    prevStep,
    goToStep,
    updateScopeData,
    isCurrentStepValid
  };

  return (
    <ScopeBuilderContext.Provider value={value}>
      {children}
    </ScopeBuilderContext.Provider>
  );
};