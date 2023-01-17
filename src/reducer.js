export default function reducer(state, action) {
  switch (action.type) {
    case "addEntry":
      return {
        ...state,
        entries: [...state.entries, action.newEntry],
      }
    case "setEntries":
      return {
        ...state,
        entries: action.entries,
      }
    case "setCategories":
      return {
        ...state,
        categories: action.categories,
      }
    default:
      return state
  }
}
