// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });
        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        });
        associatedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            });
        });
        toast.success("Budget supprimé avec succès!")
    } catch (e) {
        throw new Error("Il y a eu un problème lors de la suppression du budget.");
    }
    return redirect("/");
}