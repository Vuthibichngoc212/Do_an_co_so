const ENV = {
  PORT: import.meta.env.PORT || 3000,
  MODE: import.meta.env.VITE_NODE_ENV || "development",
  APP_URL: import.meta.env.VITE_REACT_APP_URL || "",
  API_VERSION: import.meta.env.VITE_REACT_APP_API_VERSION || "",
};

export default ENV;
