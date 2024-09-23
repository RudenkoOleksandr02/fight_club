export const initialObject = {loading: true, error: null, data: []};

export const handlePending = (state, key) => {
    state[key].loading = true;
    state[key].error = false;
};

export const handleFulfilled = (state, action, key) => {
    state[key].loading = false;
    state[key].data = action.payload;
};

export const handleRejected = (state, action, key) => {
    state[key].loading = false;
    state[key].error = true;
};

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));