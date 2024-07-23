import axios from 'axios';

export const fetchDepartments = async (cityRef, searchText = '') => { // Функция для получения списка отделений
    const data = {
        apiKey: 'a030db66aabe1b33b3667ba05933379a',
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
            SettlementRef: cityRef,
            FindByString: searchText,
            Limit: '50',
        },
    };

    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data.map((item) => item.Description);
    } catch (error) {
        console.error(error);
        return [];
    }
};
