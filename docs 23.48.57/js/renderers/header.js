"use strict";

import { parseHTML } from "../utils/parseHTML.js";


const HeaderRender = {
    asNavBarLogin: function (user) {
        let html = `<div>
                        <header>
                            <input type="checkbox" id="id-btn-menu">
                            <label for="id-btn-menu"><img src="./images/menu.png" width="30px" alt=""></label>
                            <nav class="class-menu">
                                <ul>
                                    <li class="nav-item dropdown" id="navbar-user">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDesplegableId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                        <div class="dropdown-menu text-center bg-dark" aria-labelledby="navbarDropdownMenuLink"> 
                                            <a class="dropdown-item text-white" id="id-desplegable-perfil-profile" href="profile.html?userId=${user.userId}">Ver perfil</a>
                                            <a class="dropdown-item text-white" id="id-desplegable-perfil-logout" href="#">Cerrar Sesión</a> 
                                        </div>
                                    </li>
                                    <li id="navbar-login"><a href="login.html" id="id-no-loged">Iniciar Sesión</a></li>
                                    <li id="navbar-post"><a href="new-post.html"> Publicación</a></li>
                                    <li><a href="index.html">Inicio</a></li>
                                    <li><a href="trends.html">Tendencia</a></li>
                                    <li><a href="contacts.html">Contáctanos</a></li>
                                    <li>
                                        <form id="search-form">
                                            <input type="search" id="id-search" alt="Search" placeholder="Buscar usuario o categoría" name="search">
                                        </form>
                                    </li>
                                </ul>
                            </nav> 
                        </header>
                    </div>`;

        let content = parseHTML(html);
        return content;
    },

    asNavBarGuest: function () {
        let html = `<div>
                        <header>
                            <input type="checkbox" id="id-btn-menu">
                            <label for="id-btn-menu"><img src="./images/menu.png" width="30px" alt=""></label>
                            <nav class="class-menu">
                                <ul>
                                    <li class="nav-item dropdown" id="navbar-user">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDesplegableId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                        <div class="dropdown-menu text-center bg-dark" aria-labelledby="navbarDropdownMenuLink"> 
                                            <a class="dropdown-item text-white" id="id-desplegable-perfil-profile" href="profile.html?">Ver perfil</a>
                                            <a class="dropdown-item text-white" id="id-desplegable-perfil-logout" href="#">Cerrar Sesión</a> 
                                        </div>
                                    </li>
                                    <li id="navbar-login"><a href="login.html" id="id-no-loged">Iniciar Sesión</a></li>
                                    <li id="navbar-post"><a href="new post.html"> Publicación</a></li>
                                    <li><a href="index.html">Inicio</a></li>
                                    <li><a href="trends.html">Tendencia</a></li>
                                    <li><a href="contacts.html">Contáctanos</a></li>
                                    <li>
                                        <form id="search-form">
                                            <input type="search" id="id-search" alt="Search" placeholder="Buscar usuario o categoría" name="search">
                                        </form>
                                    </li>
                                </ul>
                            </nav> 
                        </header>
                    </div>`;

        let content = parseHTML(html);
        return content;
    }
};

export { HeaderRender };