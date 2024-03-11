/*
BrowserRoute-nak az elmagyarázása
*/


/*In the context of React Router, the index attribute in a <Route> component is used to indicate 
that the nested route should be rendered when the parent route's path is matched exactly (i.e., when the parent route is the "index" route).
*/

<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>

/*
In this example, the <Route index element={<Home />} /> means that when the path is '/', the Home component will be rendered. 
This is a way to specify the default content for the root or index route.
****************************************************************************************************************************************
Létrehoztunk egy useState-s változót és az email-re van egy input mezőnk és azt szeretnénk, hogy a useState-s változó megkapja azt az
értéket, amit beírunk az input mezőben
Ehhez a kód , amit meg kell adni az input mezőnek egy onChange-ben ->
*/
input onChange={e => setEmail(e.target.value)} 
/*
Ennek az elmagyarázása 
1. onChange - egy esemánykezelő a React-ben, akkor fog lefutni, ha az input mezőnek az értéke megváltozik 
2. e - ez egy objektum (esemény objektum), ami automatikusan át lesz adva a függvénynek amikor az "onChange" esemény megtörténik 
3. e.target.value - kinyeri az input mező aktuális értékét 
!!!!!e.target - az elemre utal, ami kiváltotta az eseményt, ebben az esetben az input és a 
value - ennek az aktuális értékét fogja megkapni, tehát az input mező aktuális értéket, ami bele van írva
4. setEmail-vel meg frissítjük a email értékét const [email, setEmail] = useState("");
és akkor az email változónak az értéke már nem egy üres string lesz, hanem megkapja az input-nak az értékét, azt ami oda be lett írva
tehát a setEmail-t használjuk a az email változó állapotának a frissítésére, a felhasználó által bevitt új értékkel 
*******************************************************************************************************************************************

The history.pushState() method is a part of the Web History API, 
which provides methods to manipulate the browser's session history programmatically. 
It allows you to add or modify entries in the browser's history stack. 
The pushState() method adds a new state to the history, and !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
it's commonly used in client-side routing in web applications to update the URL without triggering a full page reload.

Here's a basic example of using history.pushState():
*/
const newState = { data: 'some state data' };
const newTitle = 'New Page Title';
const newUrl = '/new-url';

history.pushState(newState, newTitle, newUrl);
/*
newState: The state object associated with the new history entry. This can be any JavaScript object.
newTitle: The title of the new history entry.
newUrl: The new URL that you want to appear in the address bar.

It's important to note that using pushState alone doesn't trigger any navigation or page reload. 
It simply updates the URL and state in the history.
*******************************************************************************
useNavigate() is a hook provided by React Router that gives you access to the navigation object. 
This object has methods for navigating around your application. 
The navigate() method from this object is often used to navigate to different routes.
*/
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/new-url');
  };

  return (
    <button onClick={handleButtonClick}>Navigate to /new-url</button>
  );
};
/*
In this example, useNavigate() is used to obtain the navigate function, 
which you can then call to programmatically navigate to a different route.

This is similar to using history.pushState(), 
but React Router abstracts away the underlying details and provides a more convenient API for navigation in a React application.
*/
