Árbol de directorios:
    -css
        style.css: Fichero donde guardamos los estilos del logo, banner y demas elementos que no contienen boostrap.
    -files
        productos.json: Json de los Productos con sus Características.
    -fonts
        Ficheros de nuestra tipografía (Roboto-Slab)
    -img
        Alamcenamos las imagenes de productos, el logo y demás archivos multimedia
    -js
        Almacenamos los Scripts individuales de cada Página html

    Aboutus.html: Página Sobre nosotros.
    index.html: Página Principal.
    carrito.html: Página que muestra el carrito de dicho usuario.
    licencias.txt: Guardamos los autores de cada imagen y video utilizado en la web.
    producto.html: Se genera una pagina unica para cada producto. El producto se envía en la url.
    tienda.html: Página donde se muestra el catalogo completo. Tambien se puede filtrar por categoria o buscar por producto.

Logueo y registro de usuarios:
     Expresiones regulares:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_+-,\$%\^&\*])(?=.{8,})/
        La contraseña tiene que cumplir los siguientes requisistos:
            -minuscula
            -mayuscula
            -numero
            -Simbolo(@#_+-)
            - Minimo de 8 caracteres

Cookies y webstorage:
    -Cookies: Guardamos un precio Random. En unn futuro se utilizará para almacenar Características del usuario.
    -localStorage:
        -Array de Usuarios: (usuario1-contraseña1;usuario2-contraseña2)
            Separamos el usuario y contraseña con "-" y los usuarios entre ellos con ";"
        -items:
            Almacenamos el carrito de cada usuario como items_usuario:
                Se almacena usando Json.Stringify: de la siguiente forma:
                    ["producto:cantidad","producto:cantidad"]
    -SessionStorage:
        -sesion: True or False. Para saber si hay una sesion iniciada.
        -usuario: Guardamos el nombre de usuario que esta logeado actualmente.

Elementos multimedia:
    Video: En sobre nosotros, al final de la página se encuentra un video de una vebre presentación de nuestra página.
Notificaciones:
    Al registrarte en el index aparecerá una Notificación dando la vienvenida al usuario.
