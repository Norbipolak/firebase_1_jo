function Nav() {
    return(
        <>
        <nav>
            <ul>
                <li>
                    <Link to={"/"}>Registration</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/settings"}>Settings</Link>
                </li>
                <li>
                    <Link to={"/password-reset"}>Password reset</Link>
                </li>
            </ul>
        </nav>

        <Outlet/>
        </>
    );
}

export default Nav;

/*
Registration lesz a kezdőoldal 
ezért vezet a Link a /-re -> to={"/"}

megcsináljuk a többit is, de még nem készítjük el hozzá a komponenseket 

A settings oldal lesz, amikor be vagyunk jelentkezve
    <li>
        <Link to={"/settings"}>Settings</Link>
    </li>

És akkor van egy főoldalunk, ami a ("/") és az a neve, hogy Registration, tehát ez lesz az első oldal, amikor megkéri a felhasználót, hogy 
regisztráljon 
utána van egy login oldal, ahol meg kell adni a regisztrált email címedet meg a jelszavadat, vagy egy settings oldal, ha megadtuk az emailt és 
a jelszót, akkor ide visz majd minket 
és a password-reset oldal, pedig ha meg szeretnénk változtatni a jelszavunkat, akkor ide visz majd minket át 

!!!!!!!!!!!!!!!!!!!!!!!!
Fontos, hogy ezek alatt legyen egy Outlet -> <Outlet/>, mert majd ide töltjük be a tartalmat
*/