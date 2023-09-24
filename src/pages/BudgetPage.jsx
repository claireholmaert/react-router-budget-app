// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// loader
export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems(
        {
            category: "budgets",
            key: "id",
            value: params.id,
        }
    ) [0];

    const expenses = await getAllMatchingItems(
        {
            category: "expenses",
            key: "budgetId",
            value: params.id,
        }
    );

    if(!budget) {
        throw new Error("Le budget qui vous cherchez n'existe pas!");
    }
    return { budget, expenses };
}

// action
export async function budgetAction({request}) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if(_action === "createExpense") {
        try {
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget,
          })
          return toast.success(`Frais ${values.newExpense} crée!`)
        } catch (e) {
          throw new Error("Il y a eu un problème lors de la création de vos frais.")
        }
      }

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

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();
  return (
    <div className="gird-lg"
        style={{
            "--accent": budget.color,
        }}>
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        Aperçu
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {
        expenses && expenses.length > 0 && (
            <div className="grid-md">
                <h2>
                    <span className="accent">{budget.name}</span>
                    Dépenses
                </h2>
                <Table expenses={expenses} showBudget={false} />
            </div>
        )
      }
    </div>
  )
}

export default BudgetPage;
