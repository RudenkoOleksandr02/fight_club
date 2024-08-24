export const getParentCategories = (categories) => {
    return categories.filter(category => category.parentCategoryId === 0)
}