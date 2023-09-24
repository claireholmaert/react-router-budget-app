// rrd imports
import { redirect } from "react-router-dom";

// toast
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
    // delete the user
    deleteItem({key: "userName"})
    deleteItem({key: "budgets"})
    deleteItem({key: "expenses"})
    toast.success("Votre compte est supprimé")
    // return redirect
    return redirect("/")
}