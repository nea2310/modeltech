import { RootState } from '../../index';

const statusSelect = (state: RootState) => state.data.status;
const errorMessageSelect = (state: RootState) => state.data.errorMessage;

export { errorMessageSelect, statusSelect };
