import { useEffect, useState } from "react";
import { auth } from "./fb";
import { onAuthStateChanged, sendEmailVerification, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Settings() {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setEmail(u.email);
            } else {
                navigate("/login");
            }
        });
    }, []);

    const modifyEmail = async ()=> {
        try {
            await updateEmail(auth.currentUser, email);
            await sendEmailVerification(auth.currentUser);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

    const logout = async ()=> {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="container">
            <button onClick={logout}
            >Logout</button>

            <h3>Settings</h3>
            <h3>UID: {user.uid}</h3>
            <h3>Verified: {user.emailVerified ? "verified" : "not verified"}</h3>

            <h3>Email: </h3>
            <input onChange={e=>setEmail(e.target.value)}
            type="text" value={email} />

            <button onClick={modifyEmail}
            >Modify Email</button>
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

Csináltunk egy useState-s változót a user néven, ami egy üres obektum lesz 
const [user, setUser] = useState({});

Szóval az onAuthStateChanged-vel megkaptuk a useradatokat, és erre beállítjuk a user-t 
ha meg nem vagyunk bejelentkezve, akkor meg useNavigate-vel visszamegyünk a login oldalra 

setUser, ahelyett, hogy ezt így megadnánk lehetne így is 
ez van most 
-> 
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

lehetne simán úgy is, hogy megadjuk a setUser-nek az u-t csak és akkor nem csak azoakt a dolgokat, amiket az elöbb csináltunk hanem mindent 
useEffect(()=>{
    onAuthStateChanged(auth, (u)=> {
        if(u) {
            setUser(u);
        } else {
            navigate("/login");
        }
    });
}, []);
Tehát az első varáncióban a user-t ezzel a négy kulcspáros objektummal adtuk meg, frissítettük a másodikban meg mindegyik 
1. 
Explicitly extracts specific properties from the u object and constructs a new object with those properties.

The resulting user object has a custom structure with selected properties.
2. 
Sets the entire u object as the user state without extracting specific properties.

The resulting user object retains the original structure of the u object
****************************************************************************************************************
és akkor ha be vagyunk jelentkezve ki fogunk írni pár dolgot a user objektumból (2. variáció) a return-be 
    return(
        <div className="container">
            <h3>Settings</h3>
            {JSON.stringify(user)}
        </div>
    );
ki lehet írni az összes adatot, ami a userben van, fontos, hogy JSON.stringify-val legyen
-> 
In the provided code, the JSON.stringify(user) is used to display the content of the user object in the JSX. 
This is often done for debugging or development purposes, 
allowing you to visually inspect the structure and values of the user object in the rendered UI.

When rendering objects directly in JSX, 
it may not be human-readable or might result in unexpected output. !!!!!!!!!!!!!!!!!!!!!!!!!
Using JSON.stringify converts the object into a string, which can be easily displayed in the UI for debugging purposes.

Keep in mind that using JSON.stringify in the actual application UI might not be suitable for production 
as it reveals sensitive information to users. 
For production scenarios, you'd typically extract and display only the necessary information or use a more controlled approach.

Ezért nem ezt az egészet fogjuk megjeleníteni, hanem csak pár dolgot belöle!!!!!!!!!!!!!!!!!!!!!!

kiírjuk majd a uid-t meg az emailt, emailVerified-ot is 
<h3>Verified: {user.emailVerified ? "verified" : "not verified"}</h3>
ebben az objektumban, mit vissza kapunk ugy van, hogy emailVerified: true vagy false
és ugy szeretnénk kiírni, hogy "verified" vagy "not verified"
Tehát ezért ha az emialVerified az true lesz akkor ? "verified" különben : "not verified"

Itt majd egy dolgot lehet megcsinálni, az email-nek a cseréjét
de amit most meg fogunk oldani az a password reset

Ehhez csinálunk egy PassReset.js-t
***********************************************************************************************************************************************
Visszajüvönk ide és megcsináljuk az email reset-et, azok a dolgok után, amiket itt kiírtunk 
csináltunk egy input mezőt, aminek a value-jának megadtuk a user.email-t!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    <h3>Email: </h3>
    <input type="text" value={user.email}/>
felül csináltunk egy useState-s változót az email-re const [email, setEmail] = useState("");
és akkor erre az input mezőre csinálunk egy onChange-t setEmail szokásos módon az e - esemény objektum segítségével 
<input onChange={e=>setEmail(e.target.value)}

csináltunk egy button Modify email szöveggel és erre létrehozunk egy függvényt, amely async lesz 
és itt az updateEmail-t fogjuk a firebase/auth-ból kiszedni (import) az onAuthChange mellett 
-> import { onAuthStateChanged, updateEmail } from "firebase/auth";
Az updateEmail-nek nincsen visszatérési értéke, tehát void!!!!!!, szóval csak annyit mondunk, hogy 
await updateEmail();
ugy mint a await sendEmailVerification(auth.currentUser);
és nem úgy mint a const response = await createUserWithEmailAndPassword(auth, email, pass);
szóval nem kell a const ....
melyik void, melyik nem -> megnézni 

és ez az updateEmail() vár két paramétert 
1. auth.currentUser - ez a felhasználó, aki be van jelentkezve!!!!!!!!!!!!!!!!!!!!
2. email 
-> updateEmail(auth.currentUser, email)

és ezt is érdemes belerakni egy try-catch blokba, mert itt visszakapjuk a hibákat 
    const modifyEmail = async ()=> {
        try {
            await updateEmail(auth.currentUser, email);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

és ezt a modfyEmail-t pediig megadjuk a button-nak egy onClick-vel
    <button onClick={modifyEmail}
    >Modify Email</button>


Most jelenleg így van az input mezőnek adva az email -> value={user.email}

    <h3>Email: </h3>
    <input onChange={e=>setEmail(e.target.value)}
    type="text" value={user.email} />

de ez így nem lesz jó és hibaüzenetet fogunk kapni, ezért
a value az lesz, hogy mail és nem user.email (value={email})

És akkor azt fogjuk, mondani, hogy amikor itt lejön a user, akkor az email azt külön módosítjuk 
->
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setEmail(u.email);

ilyenkor beállítjuk ezt a változót const [email, setEmail] = useState("");
és ez a véltozó ide van hozzákötve value={email} és ezen az input mezőn van még egy onChange is 
és akkor nem fog hibaüzenet lenni, hogy valami nem jó 
************************************************************************************************************
Csinálunk ide egy logout függvényt és egy buttont is a jsx elemek elejére
csináltunk egy logout függvényt, amiben majd a signOut beépített (fontos, hogy importálva legyen ez is) metódust fogjuk használni 
Ennek sincsen visszatérési értéke és csak egy paramétert vár, méghozzá a auth (autentikációs objektumot)
Tehát csak elég azt írni, hogy await signOut(auth)
és ezután pedig navigálunk a főoldalra!!!!!!!!!!!
    const logout = async ()=> {
        await signOut(auth);
        navigate("/");
    };

és a button-nek, amit a tetején csináltunk annak megadjuk ezt a függvényt onClick-vel 
    <div className="container">
        <button onClick={logout}
        >Logout</button>
És akkor most nem vagyunk bent, szóval ha a Settings-re kattintunk, akkor visszadob a főoldalra 
Folyamat: 
1. Csinálunk egy button-t 
2. Csinálunk egy függvényt, ebben 2 dolgot csinálunk majd 
    - használjuk a signOut, beépített függvényt, aminek nincsen visszatérési értéke és csak az auth-ot várja paraméternek 
    - a navigate-vel visszamegyünk a főoldalra -> navigate("/")
3. ezt a függvényt megadjuk onClick-vel a buttonnek
******************************************************************************************************************************
Kicsit megváltozott a modifyEmail függvény -> hozzáraktuk a sendEmailVerification-t 

    const modifyEmail = async ()=> {
        try {
            await updateEmail(auth.currentUser, email);
            await sendEmailVerification(auth.currentUser);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

Úgy müködik, hogy be vagyunk jelentkezve valamilyen emailcímmel 
1. beírjuk, hogy melyik az új email, nyomunk egy gombot, hogy update-elje 
2. mivel itt van egy olyan, hogy sendEmailVerification, ezért az új emailcímre kapunk majd egy verification email-t 
és ha erre rákattintunk, akkor ez az email is verifikálva lesz 
itt nem kell kilépni meg újrabelépni, csak majd ha kiléptünk akkor az új dolgokkal lehet újra belépni 
************************************************************************************************************************************
Leírása az egésznek
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setEmail(u.email);
            } else {
                navigate("/login");
            }
        });
    }, []);
Az első, ami a useState-ben van, onAuthStateChanged, az azt vizsgálja, hogy valaki be van-e jelentkezve, szóval ha ez megváltozik, 
csinálunk egy login-t vagy egy logout-ot, akkor hajtódik végre az arrow function, ami meg van adva ennek az onAuthStateChange-nek 
Szóval ez az onAuthStateChanged ez két paramétert vesz fel az egyik az auth objektum a másik pedig egy callback function, ami akkor 
hajtódik végre, ha az állapot megváltozik, tehát van egy bejelentkezés pl. 

callback function - az vár egy u (user) objektumot paraméternek, tehát ha az u igaz, akkor valaki be van jelentkezve és a setUser-vel 
frissíti, updateli a komponens állapotát, és a setEmail-vel pedig updateli a user (u) email-t 
ha meg nincsen bejelentkezve, akkor áddobja a login oldalra 

Szóval itt az a lényeg, hogy kapunk csomó dolgot a onAuthStateChanged-ből és ezeket a dolgokat, meg megadjuk a useState-s változónak, 
hogy milyen formában az egészet vagy csak csinálunk egy objektumot, azzokkal a kulcspárokkal, amiket mi akarunk 
meg itt tudunk több useState-s változónak is megadni dolgokat 
pl. a user at mindent megkapott, a email pedog, csak a u.email-t 

és mivel ez egy useEffect-ben van ezért csak egyszer töltödik, amikor betöltödik a komponens!!!!!!!!!!!!!!!!!!

onAuthStateChanged, ha időközben változás áll be a user-nak a sign-in state-jébe, tehát be van-e jelentkezve vagy sem, akkor ez szépen 
érzékelni fogja 
vár egy autentikációs objektumot meg vár egy callback function-t és akkor itt csak, annyit csinálunk, hogy a user-t meg az email-t setteljük 
másik esetben ha ez az objektum (u) amit visszaad az null, akkor tudjuk, hogy nincsen bejelentkezve a felhasználó és visszadobjuk a főoldalra

Lehet még azt is csinálni a useEffect-ben, hogy akkor is dobjon vissza minket a főoldalra ha az u.emailVerified az false 
Tehát be vagyunk jelentkezve de viszont egy olyan email címmel, ami nincsen megerősítve

useEffect(()=> {
    onAuthStateChanged(auth, (u)=>{
        if(u) {
            setUser(u);
            setEmail(u.email);
            if(u.emailVerified === false) 
                navigate("/");
        } else {
            navigate("/");
        }
    });
}, []);

Mivel ez folyamatosan figyeli a státuszát a usernek és ha kijelentkezünk 
akkor a logout függvényben már nincs is szükségünk, arra, hogy navigate("/"), mert ezt már megcsinálná a 
onAuthStateChanged függvény, mert érzékelte, (ez egy observer) hogy ki vagyunk log-golva és akkor ő odavinne amugy is 
a főoldalra, hogy jelenkezzünk be 
Tehát, ami ott az else ágban van
*/