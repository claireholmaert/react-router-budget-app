// rrd imports
import { useLoaderData } from "react-router-dom";

// helpers
import { deleteItem, fetchData } from "../helpers";

// components
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

// loader
export async function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses };
}

// action
export async function expensesAction({request}) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if(_action === "deleteExpense") {
        try {
          deleteItem({
            key: "expenses",
            id: values.expenseId,
          })
          return toast.success("Dépense supprimée!")
        } catch (e) {
          throw new Error("Il y a eu un problème lors de la suppression d'une dépense'.")
        }
      }
}

const ExpensesPage = () => {
    const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
        <h1>Toutes mes dépenses</h1>
        {
            expenses && expenses.length > 0 ?
            (
                <div className="grid-md">
                    <h2>Dépenses récentes 
                        <small> ({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) :
            <p>Pas de dépenses</p>
        }
    </div>
  )
}

export default ExpensesPage;
