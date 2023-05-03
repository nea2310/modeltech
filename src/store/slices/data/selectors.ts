import { RootState } from '../../index';

const statusSelect = (state: RootState) => state.data.status;
const errorMessageSelect = (state: RootState) => state.data.errorMessage;
const entriesSelect = (state: RootState) => state.data.entries;

export { entriesSelect, errorMessageSelect, statusSelect };
