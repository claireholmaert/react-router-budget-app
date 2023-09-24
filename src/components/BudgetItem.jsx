// rrd imports
import { Form, Link } from "react-router-dom";

// library
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

// helper
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({budget, showDelete = false}) => {
const { id, name, amount, color } = budget;
const spent = calculateSpentByBudget(id);
  return (
    <div 
        className="budget"
        style={{
            "--accent": color,
        }} 
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency (amount)} budgétisé</p>
      </div>
      <progress value={spent} max={amount}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} dépensé</small>
        <small>{formatCurrency(amount - spent)} restant</small>
      </div>
      {
        showDelete ? (
          <div className="flex-sm">
            <Form 
              method="post"
              action="delete"
              onSubmit={(event) => {
                if(!confirm("Etes-vous sûr de vouloir supprimer ce budget ?")) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Supprimer</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link
              to={`/budget/${id}`}
              className="btn"
            >
            <span>Voir les détails</span>
            <BanknotesIcon width={20}/>
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default BudgetItem;
