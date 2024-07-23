import axios from 'axios';

export const fetchCities = async (searchText) => { // Функция для получения списка городов
    const data = {
        apiKey: 'a030db66aabe1b33b3667ba05933379a',
        modelName: 'Address',
        calledMethod: 'getSettlements',
        methodProperties: {
            FindByString: searchText,
            Warehouse: '1',
            Limit: '20',
        },
    };

    try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data.map((item) => ({
            id: item.Ref,
            name: `${item.Description}, ${item.AreaDescription}`,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};
