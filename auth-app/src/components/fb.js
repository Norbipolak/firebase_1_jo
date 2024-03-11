// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx64zBNySMCoFLfsOSlzZlwLEMCGoo4-Q",
  authDomain: "lengyelnorbert-5cfb3.firebaseapp.com",
  projectId: "lengyelnorbert-5cfb3",
  storageBucket: "lengyelnorbert-5cfb3.appspot.com",
  messagingSenderId: "102517803582",
  appId: "1:102517803582:web:a4c23aa8bc1fa4df1b5f6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/*
Eddig csináltunk egy react-ot meg a firebase-en elkezdtük az applikációnkat 
beírtuk, hogy npm install firebase, majd ami utána van dolgot azt ide bemásoltuk 
és az app-ot (const app = initi....) ami itt van azt exportáljuk!!!
*/
export default app;
export {auth};

/*
Ha ez megvan, akkor csinálunk egy firebase init-et a terminalba beírjuk

még nem sikerült feltelepíteni 

de akkor kiválasztjuk azt, hogy 
1. csak eggyet választunk ki ->
Hosting: Configure files for Firebase Hosting and (optionally) set up the GitHub Action deploys
2. Use an existing project
és akokr megkeressük azt, amit létrehoztunk a firebase-en project vagy app name-nek (lengyel-norbert-auth)
3. Fontos, hogy a directory az nem a public lesz hanem a build!!!! (build kell ide beírni)
4. Consfigure as a single-page app? (y)
5. Set up automatic builds and deploys with GitHub? (n)

még nem fogunk deploy-olni, hanem megcsináljuk ezt az autentikációs szolgáltatást

itt nekünk nem csak az app-ot kell majd exportálnunk 
hanem -> !!!!!!!!!!!!!!!! (fontos, hogy ez be legyen importálva felül -> import { getAuth } from "firebase/auth";)
const auth = getAuth(app)

ennek kell alul lenni -> 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

!!! és két darab exportunk van 
1. export default app;
2. export {auth};

Erre lesz itt szülségünk, mit csináltunk itt
-> 
Az app, az a firebase app objektumunk és ennek a beállításait és tulajdonságait használva a getAuth-val visszakapunk egy 
autentikációs objektumot és ennek a különböző metodusait fogjuk meghívogatni 

egyébként itt a forebaseConfig-ban itt az 1. apiKey (-> apiKey: "AIzaSyCx64zBNySMCoFLfsOSlzZlwLEMCGoo4-Q") az az a kulcs, ami a mi 
api-nkhoz tartozik tehát ez egyfajta azonosítás, innen tudja a rendszer, hogy tényleg te használod ezt a dolgot 
következő a 2. domain utána a 
3. projectId -> 
az ugyanazt, mit beírtunk az elején vagy hozzáfüzz egy vélelten karaktesort, attól függ, hogy létezik már egy ilyen nevű
projekt a rendszerükben vagy sem
4. storageBucket -> ugyanaz, mint az authDomain, egy domaincím ahonnan elérheted az applikációdat 
5. appId pedig az appunknak az azonosítója 

továbbmegyünk, hogy continue to console a böngészőben és lesz egy olyan, hogy authetication 
-> 
ott lesz egy olyan, hogy get started
itt nagyon sok autentikációs megoldást léthatunk pl. Email/Password, Google, Facebook, Play Games, Phone, Apple, GitHub, Twitter, Microsoft

Nekünk most az Email/Password kell mert az a leglogikusabb azt használni elöször, tehát email-val és jelszóval regisztrálsz
és akkor ott azt mondjuk, hogy az email/password enable!!!!!!!!!!!!!!!!!! Save

és innentől kezdve már be tudunk regisztrálni, be tudunk jelentkezni, meg tudjuk nézni, hogy be van-e jelentkezve a felhasználó 
Tudunk jelszóemlékeztető email-t küldeni, tudunk emailcímet cserélni 

felül átmegyünk a Templates-re, a Sign-in methiod mellett van 
A templates az arra szolgál, hogy pl. az email, az account megerósítő email, amely arra szolgál, hogy tényleges emailcímmel regisztráltál-e be
vagy csak egy bot vagy vagy ilyesmi, amire mindig rá kell kattintani, hogy megerősítsük a regisztrációt 
-> 
Ennek a szövege az itt található 
és az első sorban tudjuk változtatni az email címünket, amiről jön ez a bizonyos email 
tehát, mondjuk a from-ba be lehet írnunk, hogy register@valami.hu (és akkor erről jön majd a felhasználónak)
és ha azt modnjuk, hogy save, akkor erről az email címről fog majd jönni a levél 

alatta van egy olyan, hogy message, ahol be lehet állítani, hogy mi legyen az üzenet és van egy link, amire rá kell 
majd kattintania, csak ott lesz majd az api azonosítonk benne
-> 
https://lengyelnorbert-5cfb3.firebaseapp.com/__/auth/action?mode=action&oobCode=code
************************************************************************************************************
Majd alatta ott van a password reset
Ezt is az emailt is tudjuk majd módosítani password-reset.valami.hu-ra vagy akármicsodára 
és alul ugyanugy át tudjuk írni a szöveget is 
ez az alap szöveg 
->
<p>Hello,</p>
<p>Follow this link to reset your %APP_NAME% password for your %EMAIL% account.</p>
<p><a href='%LINK%'>%LINK%</a></p>
<p>If you didn’t ask to reset your password, you can ignore this email.</p>
<p>Thanks,</p>
<p>Your %APP_NAME% team</p>
és akkor ezt át lehet írni és ezt fogja majd elküldeni
***********************************************************************************************************
Következő az email address change, ami szintén ugyanígy müködik, pl. át lehet írni az email-changed@valami.hu-ra
de mindegyik maradhat a no-reply-on, csak van ilyen lehetőség, hogy ezt ki lehet cserélni
csak arról az emailcímről fog érkezni a levél, amikor te kicseréled az email címedet
***********************************************************************************************************
SMTP settingsben be tudunk állítani egy sajátlevelező szervert, ilyen levelezőszervert lehet vásárolni, mármint a szerver erőforrásait
és lehet ilyeneket bérelni x dollárért, hogy tudjunk rajtuk keresztül levelezni 
1. van egy email címe neki 
2. van egy host-ja, van a gmail-nek is egy ilyenje, smtp.gmail.com a host neve
3. be kell állítani egy port-ot (587)
4. és hogyha saját gmail fiókodnak a levelezőrendszerét szeretnéd használni, akkor itt a account username-ben be kell állítani a felhasználóneved
5. account password -> és a levelezőcymhez tartozó jelszót 
és akkor ugy fognak érkezni az innen küldött levelek, hogy norlen0492@gmail.com 
*******************************************************************************************************************
Sms verification, de ez pénzdíjas, meg lehet venni az sms szolgáltatást és akkor sms-kpént x összeget felszámolnak 

Ezzel nagyon kell vigyázni, mert ez a rendszer nem a végletekig biztonságos 
pl. kliens oldalról ezeket az adatokat, amik a firebaseConfig-ben vannak -> 
const firebaseConfig = {
  apiKey: "AIzaSyCx64zBNySMCoFLfsOSlzZlwLEMCGoo4-Q",
  authDomain: "lengyelnorbert-5cfb3.firebaseapp.com",
  projectId: "lengyelnorbert-5cfb3",
  storageBucket: "lengyelnorbert-5cfb3.appspot.com",
  messagingSenderId: "102517803582",
  appId: "1:102517803582:web:a4c23aa8bc1fa4df1b5f6f"
};

Ezeket az adatokat simán ki tudod olvasni és ez azért problematikus, mert ha az apiKey-det valaki ellopja 
ráadásul ez az email-ben is szerepel, amit küldünk, amikor megerősíteni kell a jelszót stb. konkrétan benne ott és 
akkor a te nevedben bárkinek küldözhet emailt 
Mert ugye ez kell, ezzel validálod saját magadat 
Ha biztonságosabb rendszert szeretnénk, akkor kell csinálni egy sajátot, le kell programozni egy sajátot beck-end-en, mert 
különben ilyet kapunk
**************************************************************************************************************************
Telepítenünk kell egy react-router-dom-ot -> npm i react-router-dom
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Mert ez több oldal lesz, van egy regisztrációs oldal, egy log-in oldal, egy bejelentkezett oldal 
ezért csinálunk egy navigációs menüt -> Nav.js
*/ 