import {instance, CashbackUrls} from "./urls/apiUrls";

export const cashbackApi = {
    getBalance() {
        return instance.get(CashbackUrls.GetBalance)
            .then(response => {
                return response.data.balance
            })
    },
    getBalanceByPhone(phoneNumber) {
        return instance.get(CashbackUrls.GetBalanceByPhone(phoneNumber))
            .then(response => response.data.balance)
    }
};