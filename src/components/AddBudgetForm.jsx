// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

// library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Créer le budget
      </h2>
      <fetcher.Form 
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
            <label htmlFor="newBudget">Nom du Budget</label>
            <input 
                type="text" 
                name="newBudget" 
                id="newBudget"
                placeholder="e.g., Groceries"
                required
                ref={focusRef}
            />
        </div>
        <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Nouveau montant du budget</label>
            <input 
                type="number"
                step="0.01"
                name="newBudgetAmount"
                id="newBudgetAmount"
                placeholder="e.g, 350€"
                required
                inputMode="decimal"
            />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {
              isSubmitting ? 
              <span>Création du budget...</span> : 
              (<>
                <span>Créer le budget</span>
                <CurrencyDollarIcon width={20} />
              </>)
            }
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm
