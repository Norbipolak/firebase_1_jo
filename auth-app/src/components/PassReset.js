import { useState } from "react";
import { auth } from "./fb";
import { sendPasswordResetEmail } from "firebase/auth";

function PassReset() {
    const [email, setEmail] = useState("");

    const resetPass = async (e)=> {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

    return (
    <div className="container center-text">
        <form className="box mw-500 margin-auto">
            <h3>Email address</h3>
            <input onChange={e=>setEmail(e.target.value)}
            className="center-input w-80"
            type="text"/>

            <button onClick={resetPass}
            className="center-input w-80">Reset Password</button>
        </form>
    </div>
    );
}

export default PassReset;

/*
A PassReset úgy fog müködni, hogy van egy formunk, ide beírja az ember az email address-ét h3-as tag és input mező és egy button,
amivel reset-eljük az email address-t 
Mire jó a form 
->
The <form> element in HTML is used to create an HTML form for user input.
Forms are a fundamental part of web development and are commonly used to collect and submit user data.

A nav-on (nav.js) belül már van olyanunk, hogy Password reset, de a App.js-nél még nincsen 
ezért oda csinálunk neki egy route-ot -> <Route path="/pass-reset" element={<PassReset/>}/>

és akkor ezt megformázzuk, azokkal a dolgokkal, amiket a Registration-nál csináltunk, olyan css className-ekkel 
pl. box, center-input, mw-500, w-80
és, hogy a h3-as text is középen legyen, ezért a container-nek megadtunk egy center-text-et

Mi az, ami itt szükséges -> 
const [email, setEmail] = useState("");
és mivel ki szeretnénk olvasni és átadni ennek a useState-s változónak, hogy mi lett beírva az input mezőbe ezért ->
onChange={e=>setEmail(e.target.value)}
és akkor csinálunk egy async resetpass függvényt 
!!!!!!!!!!!!!
Erre is van egy beépített valami, mint registrációra meg a login-re 
fontos, hogy ezt is be kell rakni egy try-catch blokkba!!! meg fontos, hogy minden impoertálva legyen felül!!!!! 
pl. autentikációs objektum (auth), sendPasswordResetEmail
-> 
import { useState } from "react";
import { auth } from "./fb";
import { sendPasswordResetEmail } from "firebase/auth";

meg fontos!!! hogyha async a függvény, akkor await!!
await sendPasswordResetEmail(auth, email);
a sendPasswordResetEmail vár egy emailt és egy auth objektumot
Mert, hogy az email címre küldi azt a dolgot 

    const resetPass = async ()=> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

és akkor ezt a függvényt megadjuk a button-nek onClick-vel 
    <button onClick={resetPass}
    className="center-input w-80">Reset Password</button>

újratöltötte a dolgokat, ezért kell a e.preventDefault() a try blok elé
    const resetPass = async (e)=> {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);

!!!!!!!!!
folyamat leírása: 
1. Megcsináljuk a jsx dolgokat, ahol van egy input mező (lehet mondjuk formban is) meg egy button 
2. Csinálunk egy useState-s változót 
3. Megadjuk az input mezőnek az onChange-t, hogy ki tudjuk olvasni, mi lett oda beírva(ha ennek a mezőnek az állapota megváltozik)
ezt ugye meg set-teljük 
onChange={e=>setEmail(e.target.value)}
e - eseménykezelő és annak a target-je az input mező és ami bele van írva az pedig a target.value 
4. csinálunk egy függvényt 
    - ha async, akkor await 
    - try catch blokk (catch(err) error objektumnak van egy code és egy message-e, amit console.log)
    - beépített függvények(auth) és még ezen kivül megadjuk neki a useState-s változót, ha egy van mind itt akkor csak azt de lehet ez több is 
    pl. registration-nál az email meg a password is 
5. a button-nek egy onClick-vel megadjuk ezt a függvényt 
***********************************************************************************************************************************
beírtuk az email címünket, megnyomtuk a gombot és kaptunk az email címünkre egy email-t, amiben van egy link 
arra rákattintottunk és ez jött fel (ugye ez a beépített függvény miatt)

Reset your Password

for norlen0492@gmail.com

New password
________________

Save (ez egy button)
És akkor itt nem kell beírni a régi password-ot, mint amugy pár helyen csak az újat 

Meg volt, azt írta, hogy you can sign-in with your new password és majd jó lenne, hogy a login-ra vinne vissza 
szóval lehetne csinálni egy navigate = useNavigate()-t, fontos, hogy importálva legyen a router-dom-ból 
és a passreset try blokk végén pedig navigate("/login")
*********************************************************************************************************************
azt is lehet, hogy az email címünket változtatjuk majd meg, ezt most a Settings.js-ben fogjuk megcsinálni
*/ 