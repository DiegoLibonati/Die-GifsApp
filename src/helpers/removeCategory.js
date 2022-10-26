export const removeCategory = (e, categories, resetCategory) => {
  const categoryName =
    e.target.parentElement.parentElement.children[0].outerText;

  for (let i = 0; i < categories.length; i++) {
    if (categoryName === categories[i]) {
      categories.splice(categories.indexOf(categoryName), 1);
    }
  }

  return resetCategory([...categories]);
};
