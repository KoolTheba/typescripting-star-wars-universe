export interface Action {
    type: "error" | "loading" | "fetchComplete";
    data?: any;
    error?: any;
    loading?: boolean;
};