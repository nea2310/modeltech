import { AnyAction } from '@reduxjs/toolkit';

import { NAMESPACE } from './constants';

const isResolved = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('fulfilled')
  );
};

const isPending = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('pending')
  );
};

const isRejected = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('rejected')
  );
};

export { isPending, isRejected, isResolved };
