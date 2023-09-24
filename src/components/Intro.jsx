import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
            Prends le contrôle de <span className="accent">Ton argent</span>
        </h1>
        <p>
        La budgétisation personnelle est le secret de la liberté financière. Commencez votre voyage aujourd'hui
        </p>
        <Form method="post">
            <input 
                type="text" 
                name="userName" 
                required 
                placeholder="Quel est ton nom ?" 
                aria-label="Ton nom" 
                autoComplete="given-name"
            />
            <input 
                type="hidden" 
                name="_action" 
                value="newUser" 
            />
            <button type="submit" className="btn btn--dark">
                <span>Créer un compte</span>
                <UserPlusIcon width={20}/>
            </button>
        </Form>
      </div>
      <img src={illustration} alt="personne avec argent" width={600} />
    </div>
  )
}

export default Intro;
