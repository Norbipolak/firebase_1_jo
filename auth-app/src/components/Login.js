import { auth } from "./fb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const signIn = async ()=> {
        try {
            const response = await signInWithEmailAndPassword(auth, email, pass);

            navigate("/settings");
        } catch(err) {
            console.log(err.code);
            console-log(err.message);
        }
    };

    return (
        <div className="container center-text">
            <div className="box mw-500 margin-auto">
                <h3>Email</h3>
                <input onChange={e => setEmail(e.target.value)}
                    className="center-input w-80" type="text" />

                <h3>Password</h3>
                <input onChange={e => setPass(e.target.value)}
                    className="center-input w-80" type="password" />

                <button onClick={signIn}
                >Login</button>
            </div>
        </div>
    );
}

export default Login;

/*
Ami a Return.js return-jében van azt teljes egészében kimásoltuk, mert ugyanígy fog nagyjából kinézni 
lehetne úgy is csinálni, hogy paraméterekben megadjuk a dolgokat és akkor egy kicsit máshogy fog kinézni 
mert itt is van email meg password useState-s változó, egyedül ami nincs itt az a register függvény, amit majd 
a button onClick-jéből ki fogunk venni es egy másik függvényt fogunk megadni és helyette csinálunk egy signIn függvényt  
    <button onClick={signIn}
    >Login</button>
és akkor van email meg pass, amik oda vannak kötve, meg a signIn is a button-höz

nagyon fontos, hogy felül importálva legyen az auth és nem az Auth, mert az egy beépített függvény 
és emellett kell egy függvényt is importálni, amit majd meg fogunk hívni a signIn függvényünkben (signInWithEmailAndPassword)
-> 
import { auth } from "./fb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"; (ha van benne useState, akkor ezt is be kell hívni a reactből)

és akkor majd ezt fogjuk meghívni a signIn függvényben ->
const signIn = async ()=> {
    try {
        const response = await signInWithEmailAndPassword(auth. email, pass);
    } catch(err) {
        console.log(err.code);
        console-log(err.message);
    }
};

csak még annyi, hogy nem volt még ez az oldal meg (Login.js), ha sikeresen végbement minden a Registration.js-ben és nem 
mentünk be a catch ágba, akkor átírányitson ide a login oldalra, hogy be tudjunk jelentkezni és ehhez elöször meg kell csinálni ezt a route-ot 
az App.js-ben 
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav/>}>
                    <Route index element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
és akkor ide csináltunk egy route-ot, aminek a path-ja az /login lesz illetve az elementnek megadtuk ezt a Login-t 
-> 
<Route path="/login" element={<Login/>}/>
Nagyon Fontos!!!!!!!!!!!!!!!!!!!!
A Registration.js-ben lesz egy useNavigate, hogy átírányítson minket majd ide!!!
Meg van az egász folyamat, most már tudunk regosztrálni, kapunk egy megerősítő emailt, rákattintunk
de amugy ha beregisztráltunk, utána egyből atdob minket ide, ugye a useNavigate miatt és akkor itt be tudjuk írni az emailt meg 
a password-ot 
és ha minden jól ment, akkor innen a login-ről át kell majd írányítani a settings-re
ezért készítünk egy settings.js-t, hogy tudjunk majd hova átírányítani 
és akkor ugyanugy, minthogy ide juttottunk a Registration.js-ről, const navigate = useNavigate() 
a signIn függvényben, try részében pedig navigálunk a "/settings"-re
->
    const signIn = async ()=> {
        try {
            const response = await signInWithEmailAndPassword(auth, email, pass);

            navigate("/settings");
        } catch(err) {
            console.log(err.code);
            console-log(err.message);
        }
    };
    és akkor a settings-nek is kell csinálni az App.js-ben egy route-ot -> <Route path="/settings" element={<Settings/>}/>
    ->
        return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Nav/>}>
                    <Route index element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );

megprobáljuk, hogy ide valami olyat írunk be email-t ami nem lett regisztrálva
akkor ugye bemegy a catch(err) ágba, ahol pedig console.log(err.code), console.log(err.message)
-> 
auth/invalid-credential
Firebase: Error (auth/invalid-credential)
és akkor innen tudjuk, hogy rossz email címet és jelszót írtunk be

de ha viszont jót, ami már regisztrálva lett, akkor be is dobott minket a settings-re
megint kaptunk egy userCredentials objektumot, ugyanazokkal az értékekkel naggyából, mint amikor regisztráltunk 
van egy olyan, hogy emailVerified: true
Ha le akarjuk elenőrizni, hogy csak, akkor müködjön, hogyha az email meg van erősítve, azt innen tudjuk, de mivel ez kliens oldali, 
ezért nem tül biztonságos 

most akkor be tudtunk jelentkezni és itt vagyunk a settingsen 
*/

