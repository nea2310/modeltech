import { toast } from 'react-toastify';

import { DataErrorMessages } from '../../shared/constants/DataErrorMessages';

type PromiseType = 'success' | 'error';

const errorMessages = {
  [DataErrorMessages.DATA_NOT_FOUND]: 'Данные не найдены',
};

const setPromiseAlert = (toastId: string, text: string) => {
  toast(text, {
    toastId,
    isLoading: true,
    draggable: false,
    closeButton: false,
    theme: 'colored',
  });
};

const updatePromiseAlert = (
  toastId: string,
  type: PromiseType,
  text: string
) => {
  let message = text;
  let errorType = text;

  if (text.includes(':')) {
    errorType = text.split(':')[0].trim();
  }

  if (errorMessages[errorType as keyof typeof errorMessages])
    message = errorMessages[errorType as keyof typeof errorMessages];

  toast.update(toastId, {
    render: message,
    type,
    autoClose: 5000,
    hideProgressBar: true,
    isLoading: false,
  });
};

export { setPromiseAlert, updatePromiseAlert };
