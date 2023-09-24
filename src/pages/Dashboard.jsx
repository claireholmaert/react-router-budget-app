// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers";

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

// action
export async function dashboardAction({request}) {
  await wait();

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

  // new user submission
  if(_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Bienvenue, ${values.userName}`);
    } catch (e) {
      throw new Error("Il y a eu un problème lors de la création du compte.");
    }
  }

  if(_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget crée!")
    } catch (e) {
      throw new Error("Il y a eu un problème lors de la création de votre budget.")
    }
  }

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

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Bon retour,  
            <span className="accent"> {userName}</span>
            </h1>
            <div className="grid-sm">
              {
                budgets && budgets.length > 0 ?
                (<div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Budgets existant</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                    {
                      expenses && expenses.length > 0 && (
                        <div className="grid-md">
                          <h2>Dépenses récentes</h2>
                          <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)} />
                          {expenses.length > 8 && (
                            <Link 
                              to="expenses"
                              className="btn btn--dark"
                            >
                              Voir toutes les dépenses
                            </Link>)}
                        </div>
                      )
                    }
                </div>)
                : (
                  <div className="grid-sm">
                    <p>la budgétisation personnelle est le secret de la liberté.</p>
                    <p>Créer un budget pour commencer!</p>
                    <AddBudgetForm />
                  </div>
                )
              }
            </div>
        </div>
      ) : <Intro />}
    </>
  )
}

export default Dashboard;
