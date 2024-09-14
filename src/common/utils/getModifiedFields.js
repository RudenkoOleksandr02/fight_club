const isObject = (value) => {
    return value && typeof value === 'object' && !Array.isArray(value);
};

const formatStringValue = (value) => {
    if (isObject(value)) {
        return Object.keys(value).map(key => String(value[key]));
    }
    if (Array.isArray(value)) {
        return value.map(item => String(item));
    }
    return String(value);
};

const deepCompare = (value1, value2) => {
    if (isObject(value1) && isObject(value2)) {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!deepCompare(value1[key], value2[key])) {
                return false;
            }
        }

        return true;
    } else if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) return false;

        for (let i = 0; i < value1.length; i++) {
            if (!deepCompare(value1[i], value2[i])) {
                return false;
            }
        }

        return true;
    }

    return value1 === value2;
};

export const getModifiedFields = (initialData, currentData) => {
    const modifiedFields = {};
    for (const key in initialData) {
        if (!deepCompare(initialData[key], currentData[key])) {
            modifiedFields[key] = currentData[key];
        }
    }
    return modifiedFields;
};