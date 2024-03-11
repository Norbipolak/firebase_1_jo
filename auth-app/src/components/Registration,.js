import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./fb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const register = async ()=> {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, pass);

            await sendEmailVerification(auth.currentUser);

            navigate("/login");
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };

    return(
        <div className="container center-text">
            <div className="box mw-500 margin-auto">
                <h3>Email</h3>
                <input onChange={e=>setEmail(e.target.value)}
                className="center-input w-80" type="text"/>

                <h3>Password</h3>
                <input onChange={e=>setPass(e.target.value)}
                className="center-input w-80" type="password"/>

                <button onClick={register}
                >Register</button>
            </div>
        </div>
    );
}

export default Registration;

/*
Email-vel és jelszóval regisztrálunk, más adat itt nem szükséges

!!! fontos, hogy a password-nél az input mező type-ja az password legyen -> <input type="password"/>
mert különben látjuk, hogy mit irunk be, nem csak így *****, hanem ténylegesen a betűket

ami fontos itt css-ben
container
-mindig adunk neki egy szélességet, általában width: 1080px 
-kap egy margin: auto-ot, hogy középen legyen 
-kap valamilyen padding-et 
és csináltunk neki egy center-text, hogy minden szöveg mező, ami ebben van a középen legyen, tehát a <h3> dolgok 
de pl. ebben van a box, azt nem fogja középre tenni, ezért kell neki megcsinálni a margin-auto-t ami középre teszi majd
, amiben benne vannak, jelenleg ez a container

box
-kap egy background-colort, hogy más színű legyen 
-border, hogy be legyen keretezve, azért box a neve 
-és kapott egy ugyanolyan padding-et, mint a container
kapott egy margin-autot, hogy középre legyen helyezve a container-ben 
mw-500-hogy maximum szélessége az 500px legyen, de ha huzzuk be a képernyőt akkor kisebb lesz -> responsive design!!!

input, select, button 
-kaptak egy padding-et 
-egy center-input-ot, ami azt jelenti, hogy a ezeket majd középre helyezi a boxban, amiben benne van 
fontos, hogy display: block legyenm hiszen csak így tudjuk ezeket a dolgokat középre helyezni a margin: auto-val 
illetve pontosan ez margin: 10px auto itt, tehát 10px alul, felül és horizontálisan középen van így 
w-80, azért kell az input mezőnek, hogy kiférjen az, amit ide bele írtunk 
************************************************************************************************************************
és akkor itt van a register gombunk, amire majd létre kell hozni egy metódust, de ami itt nekünk mindenképpen szükséges!!!!!!!!!!!!
hogy felül be legyen importálva az auth!!!!!!
import { auth } from "./fb";
ugye erre az autentikációs objektumra van szükségünk, mert ennek a szolgáltatásait fogjuk lekérni
-> 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

lesz egy ilyen metódusunk, hogy register, mi async lesz 
ahol használunk egy beépített metódust, hogy createUserWithEmailAndPassword(auth, "", "")
és akkor ő vár 3 paramétert
1. egy auutentikációs objektumot (auth)
2. egy emailt
3. egy password-ot

de it még nincsen nekünk email illetve password, ezért az üres stringek
!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ezért csinálunk egy useState-s változót vagyis kettőt, eggyet az email-nek, eggyet a password-nek
->
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
és akkor ezeket be kell állítani a jsx elemeknek méghozzá a az input mezőknek, hogy az email useState-s változó megkapja az 
inputnak az értékét -> onChange
<input onChange={e=>setEmail(e.target.value)} -> elmagyarazas.js

és akkor a pass az ugyanígy van 
Tehát van egy useState-s változónk const [pass, setPass] = useState("") és azt szeretnénk, hogy az input mező, amit csináltunk a pass-ra 
ha oda beírunk valamit, akkor ez a useState-s változó megkapja azt az aktuális értéket
-> 
<input onChange={e=>setPass(e.target.value)}
className="center-input w-80" type="password"/>

!!!fontos, hogy az input mezőnek a type-ja az legyen password és nem text, mert ha text-en hagyjuk, akkor látható lesz mit írunk be 
az input mezőbe -> pl. ha text-re van állítva titkospassword, ha pedig type="password", akkor ******************
**********************************************************************************************************
és ha ez meg van, akkor át kell adni ezeket a createUserWithEmailAndPassword-nek, amire ugye vár három dolgot 
1. auth, amit ugye csináltunk a fb.js-ben 
2. az email-t 
3. a password-ot

const register = async ()=> {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
};
Akkor itt kapunk egy userCredentials objektumot a response-ban
és a button-nak meg átadjuk ezt a register függvényt egy onClick-vel
-> 
    <button onClick={register}
    >Register</button> 

Mi történik, ha ezt üresen, úgyhogy nem írtunk be semmit az input mezőkbe, úgy szeretnénk beküldeni 
->
hibaüzenet(auth/invalid-email)
Kapunk egy Bad Request-es http választ (400)
így néz ki -> 
POST https://identitytoolkit.googleapis.com/v1/accounts... 400(Bad Request)
await in (anonymous) (async)
register
és még emellett kapunk egy auth/invalid-email hibaüzenetet 
tehét ezt a kettőt 
!!!!!!!!!!!!!!!!!!!!!!
Ha ezt ki akarjuk védeni, akkor be kell raknunk ezt egy try-catch blokba
->
const register = async ()=> {
try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
} catch(err) {
    console.log(err.code)
    console.log(err.message)
}
};
catch(err), ennek az error objektumnak, amit itt megkapunk van egy code-ja és egy message-je 
és ezeket fogjuk majd kiírni
code alapján meg tudjuk nézni, hogy mi a hiba,  message meg elmondja nekünk konkrétan, hogy ez milyen hiba
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Tehát, így már nem áll le a kódnak a futása meg nem kapunk hibaüzeneteket, hanem azt fogja majd kiírni a console-ra, hogy 
auth/invalid-email ez a err.code-ra(itt küldhetnének egy számot, hogy pontosan mi a hiba, mert vannak, amik nagyon hasonlóak 
úgy meg szám alapján meg tudnánk nézni pontosan, hogy mi a hiba)
Firebase: Error (auth/invalid-email) ez a err-message-re
Tehát, így visszakaptunk egy hibaüzenetet és ezt érdemes megjeleníteni ha ezzel valami probléma van, hogy tudja a felhasználó, hogy mi az
***************************************************************************************************************************************
Van ez a 10 min email, az annyit tesz, hogy van egy emailcímed, ami 10 percig él 
és ez tényleg csak arra jó, hogy ilyen szolgáltatásokat meg kódokat teszteljünk 

beírjuk ezt az email címet a email input mezőben és megadunk egy password-ot is rákkatintunk, hogy register 
!!!!Visszakapunk egy userCredential objektumot -> console.log(response)
-> 
UserCredentialImpl {user:UserImpl, providerId:null, _tokenResponse:....}
operationType: "singIn"
providerId: null
user: UserImpl {providerId: 'firebase', proactiveRefresh:...}
_tokenResponse: {kind: 'identitytoolkit#SignupNewUserResponse', ...}
[[Prototype]]: Object

operationType: "signIn" - tehát, hogy megprobált regisztrálni
és ha lenyítjuk a user-t ott találunk mindenféle dolgot a user-ről (pl. az id-ját -> uid, vagy metadatokat, hogy mikor készült el)
accessToken: "sfdgrtdh345n346ni235o"
displayName: null 
email: "norlen0492@gmail.com"
emailVerified: false
isAnonymous: false
metadata: UserMetaData
    createdAt: "94998798449"
    creationTime: "Tue, 27 Feb 2024 10:18:25 GMT"
    lastLoginAt: "484885858585"
    lastSignInTime: "Tue, 27 Feb 2024 10:18:25 GMT"
providerId:"firebase"
uid:"exTh5747hcddTdb3474jr"

és ha visszamegyünk a firebase oldalra, akkor van egy olyan, hogy Authetication 
azon belül egy Users(az első fül)
oda érkezik be  ilyen formában 
Identifier                 Providers          Created              Signed In                   UserUid
norlen0492@gmail.com                        Feb 27,2024          Feb 27,2024            mvweun43654TnfewFEHU56
ezt kitöröljül onnan
!!!!!!!!!
Úgy szeretnénk megoldani ezt a rendszert, hogy küldjön egy megerősítő emailt (ezt kliens oldalon kell megcsinálni)
tehát a register függvényben amit csináltunk -> await sendEmailVerification(auth.currentUser);

    const register = async ()=> {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            await sendEmailVerification(auth.currentUser);
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };
és akkor így kaptunk egy email a 10 min emailcímünkre, hogy Sender:register@lengyel-norbert-auth-firebase... Subject:Verify your email for ..
és akkor ott az emailben van egy link, amire rákattintva tudunk verify-olni 
https://lengyel-norbert-auth-firebaseapp.com/_/auth/action/?mode=verifyEmail&oobCode=dsfeihngwginveifndwviegvim3543=apiKey=&lang=eng
és akkor ebben van egy apiKey, ami jelenleg üres és emiatt azt fogja mondani, hogy error encountered, ha rákattintunk 
!!!!!!!!!!mert, hogyha mincs ott az apiKey-nk, akkor nem müködik a dolog -> ez egy rendszerbug, hogy néha nem rakja oda az apiKey-t 
de hogyha meg ott van és valaki tudja a te apiKey-det, mert küldtél neki egy megerősítő emailt, akkor az meg elég durva biztonsági kockázat 
mert akkor elvileg hozzá tud férni, szóval ez nem túl biztonságos rendszer így 

ezt megcsináltuk mégegyszer, hogy beregisztráltuk és kaptunk még egy email-t, amiben már ott van az apiKey
szóval rákattintunk a linkre, ami benne van az üzenetben és akkor kaptunk egy olyat 
Your email has been verified
You can sign in with your new account 
és akkor meg van erősítve az email, tehát a folyamatnak ezen a részén már túljutottunk 
következő, hogy csinálunk egy Login.js-et, mert szeretnénk belogin-olni
***************************************************************************************************************************************
Megcsináltuk a Login.js-t és az App.js-en csináltunk neki egy route-ot is 
<Route path="/login" element={<Login/>}/>
és azt szeretnénk, ha minden jólt csináltunk itt, akkor átvigyen minket erre az oldalra 
-> 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ezért itt létrehozunk 
const navigate = useNavigate();
ami a react-router-dom-ból eredezthető, ezért fontos, hogy be legyen hívva felülre 
import { useNavigate } from "react-router-dom";
és ha navigate function-be azt írjuk, hogy /login, akkor át fog minket írányítani a login oldalra -> navigate("/login")
méghozzá ezt a register függvényben kell megoldani a sendEmailVerification után 

    const register = async ()=> {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, pass);

            await sendEmailVerification(auth.currentUser);

            navigate("/login");
        } catch(err) {
            console.log(err.code);
            console.log(err.message);
        }
    };
!!!!!!!!!
De úgy írányít minket ide át, hogy tölti be újra ezt az oldalt, hanem history.pushState metódusdt alkalmazza
elmagyarazas.js - mi az a history.pushState és useNavigate()
*/

