export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        alert: "",
        loading: false,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token"); // Remove token instead of setting it to an empty string
      return {
        ...state,
        loading: false,
        user: null, // Only clear the user state upon logout
      };
    case "LOADING":
      return {
        ...state,
        alert: "",
        loading: true,
      };
    case "ALERT":
      return {
        ...state,
        loading: false,
        alert: action.payload, // Do not modify user state for an alert action
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        alert: "",
      };
    default:
      return state;
  }
};
