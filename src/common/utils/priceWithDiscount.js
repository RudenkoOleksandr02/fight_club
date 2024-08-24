export const priceWithDiscount = (price, discount) => {
    return price - ((price / 100) * discount)
}