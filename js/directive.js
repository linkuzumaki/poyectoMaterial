var contador =0;
var borrarHtml = ("<button ng-controller='EventoElementCtrl' class='delete-button right'  style='float: right;color:black' id='borrar'>x</button>");
var editarHtml = ("<button ng-controller='ModalCtrl' class='editar-button right'  style='float: right;color:black' id='editar'>/</button>");
var agregarHtml = ("<button ng-controller='EventoElementCtrl' class='crear-button right'  style='float: right;color:black' id='editar'>+</button>");

angular.module('app.directive', [])

.directive('crearElementos',function($compile){
    return {
        scope:{},
        link: function(scope, element, attrs, controller) {
            element.bind("click",function(e) {
                console.log('directiva');
                var id = e.target.id;// obtengo la id elemento del bar
                var idelemento;
                if (id === 'elemt1') {
                    idelemento = 'parrafos'; //id del elemento
                }
                if (id === 'elemt2') {
                    idelemento = 'boton';
                }
                if (id === 'elemt3') {
                    idelemento = 'texbox';
                }
                if (id === 'elemt4') {
                    idelemento = 'check';
                }
                if (id === 'elemt5') {
                    idelemento = 'label';
                }
                if (id === 'elemt6') {
                    idelemento = 'panel';

                }
                var elemento = document.getElementById(idelemento); // id elemento
                console.log('directiva e'+elemento)
                var copy = $(elemento).clone(true);//se crea un clon  del elemento
                //se edita los atributos de objeto  clonado
                $(copy).attr("id", "ElemClonado" + contador);
                $(copy).children('.element').attr("id", "parrafo" + contador);// crea la id  para  el hijo con clase element
                //se agregan atributos al clon
                $(copy).children('.element').attr("style", "width:100%;height:100%");
                $(copy).attr("ondragstart", "start(event)");
                $(copy).attr("ondragend", "end(event)");
                if (idelemento !== 'panel') {
                    $(copy).attr("style", "display:show;width:150px");
                } else {
                    $(copy).attr("style", "display:show;width: 100%;padding-top: 0px;padding-bottom: 0px;margin-top: 0px; " +
                        "margin-bottom: 0px;");
                    $(copy).children('.panelP').attr('id', "panelP" + contador);
        
                }
                $(copy).attr("draggable", true);
                // el elemento tipo text y check no tienen  el resisable
                if (idelemento !== 'texbox' && idelemento !== 'check' && idelemento !== 'parrafos' && idelemento !== 'panel') {
                    //$(copy).resizable();
                }
                $(copy).clone(true, true);// se confirma que los eventos y atributos esten activos
                $(borrarHtml).appendTo(copy);//se agrega el btn eleminar
                $(editarHtml).appendTo(copy);//se agrega el btn editar
                $(agregarHtml).appendTo(copy);//se agrega el btn editar
                $(copy).children('.delete-button').attr("id", "eliminar" + contador);
                $(copy).children('.delete-button').attr("ng-click", "eliminar()");//se agrega el evento eliminar  despues de agregar el boton al clon
                $(copy).children('.editar-button').attr("id", "editar" + contador);
                $(copy).children('.editar-button').attr("ng-click", "clickToOpen()");
                $(copy).children('.crear-button').attr("id", "crear" + contador);
                $(copy).children('.crear-button').attr("ng-click", "crear(e)");
                angular.element(document.getElementById('contpizarra'))
                    .append($compile(copy)(scope));

                contador += 1;
            })
        }
    }

})



