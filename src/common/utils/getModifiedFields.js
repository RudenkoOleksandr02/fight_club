const formatStringValue = (value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value).map(key => String(value[key]));
    }
    if (Array.isArray(value)) {
        return value.map(item => String(item));
    }
    return String(value);
};

export const getModifiedFields = (initialData, currentData) => {
    const modifiedFields = {};
    for (const key in initialData) {
        if (JSON.stringify(formatStringValue(initialData[key])) !== JSON.stringify(formatStringValue(currentData[key]))) {
            modifiedFields[key] = currentData[key];
        }
    }
    return modifiedFields;
};
