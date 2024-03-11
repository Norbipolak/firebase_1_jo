import { useEffect, useState } from "react";
import { auth } from "./fb";
import { onAuthStateChanged } from "firebase/auth";

function Settings() {
const [user, setUser] = useState({});
const navigate = useNavigate();

useEffect(()=>{
    onAuthStateChanged(auth, (u)=> {
        if(u) {
            setUser({
                uid:u.uid,
                email:u.email,
                creationTime:u.metadata.creationTime,
                lastSignInTime:u.metadata.lastSignInTime
            });
        } else {
            navigate("/login");
        }
    });
}, []);

    return(
        <div className="container">
            <h3>Settings</h3>
        </div>
    );
}

export default Settings;

/*
És akkor majd a Login.js-ről a useNavigate segítségével ide fog minket átírányítani 

Itt meg kellene nézni, hogy be vagyunk-e jelentkezve, hogy a felhasználó be van-e jelentkezve
ha nincsen bejeltkezve, akkor vissza kell dobnunk a login oldalra 
-> 
erre csinálunk egy useEffect-et
fontos, hogy itt is be legyenek importálva a dolgok 

és akkor kell nekünk itt egy beépített függvény onAuthStateChanged()
amelynek van kettő paramétere 
1. auth, autentikációs objektum 
2. egy callback function (vissza fogunk kapni egy user-t (u))
*/