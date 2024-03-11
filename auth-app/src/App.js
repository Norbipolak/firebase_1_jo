import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Registration from './components/Registration';


function App() {
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
}

export default App;

/*
Az app.js-ben már csak egy browser router lesz innentől kezdve
fontos, hogy felül minden be legyen hívva -> import { BrowserRouter, Routes, Route } from 'react-router-dom';

eddig így néz ki, de majd csinálunk Registration-t is és akkor nem null lesz ide beírva -> <Route index element={null}/>
most megcsináljuk a registration-t -> Registration.js a components-ben

készen van és ide szépen behívjuk és most már az egész így fog kinézni ->
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Nav/>}>
                <Route index element={<Registration/>}/>
            </Route>
        </Routes>
    </BrowserRouter>

Inside this main route, there is another nested Route component with the index attribute. T
his means that this route will be rendered when the parent route is the index (i.e., when the path is '/').

csinálunk egy npm start-ot és már így néz ki az egész a honlapon formázás előtt 

Legfelül a 4 link, ami a Nav-ból származik és utána az email, password kíírás és input mező meg egy register gomb

- Registration
- Login
- Settings
- Password reset

Email 
itt az input mezeje

Password 
itt az input mezeje és itt mellette van a button
*/

