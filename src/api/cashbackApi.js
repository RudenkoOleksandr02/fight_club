import {instance, CashbackUrls} from "./urls/apiUrls";

export const cashbackApi = {
    getBalance: async () => {
        const response = await instance.get(CashbackUrls.GetBalance);
        return response.data;
    },
    getBalanceByPhone: async (phoneNumber) => {
        const response = await instance.get(CashbackUrls.GetBalanceByPhone(phoneNumber));
        return response.data;
    }
};
