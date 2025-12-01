//

import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "https://expense-tracker-app-built-on-react.onrender.com";

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([
        {
            "amount": "2000.00",
            "category": "cart",
            "created_at": "2025-11-27T00:00:00.000Z",
            "title": "cart",
            "txn_id": 3,
            "user_id": "user_3456"
        }

    ]);
    const [summary, setSummary] = useState();

    const [isloading, setLoading] = useState(false);

    // using callback to cache the function to avoid calling it unncessarily and avoid getting different refernces

    // function to fetch transactions
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/expenses/${userId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions", error);

        }
    }

        , [userId]);

    // function to fetch summary 

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/expenses/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {

            console.error("Error fetching summary", error);

        }
    }

        , [userId]);
    // function to load data 
    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            // using promise.all to fetch transactions in parallel, 
            // insted of calling them one by one . why wait ?

            await Promise.all([fetchTransactions(), fetchSummary()]);

        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            console.log("data fetched successfully");
            setLoading(false);
        }

    }, [fetchSummary, fetchTransactions, userId]);

    // function to delete data 
    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/expenses/${id}`, { method: "DELETE" });
            if (!response) throw new Error("Failed to delete transactions");

            // reloading again
            loadData();
            Alert.alert("Transaction deleted successfully")

        } catch (error) {
            console.error("Error deleting transactions", error);
            Alert.alert("Error deleting transactions", error.message);
        }
    }

    return { isloading, summary, transactions, loadData, deleteTransaction };
};