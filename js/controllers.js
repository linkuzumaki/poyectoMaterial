var contador = 0;
angular.module('app.controllers', [])
        .controller('mainController', function ($scope) {
            $scope.message = 'Hola, Mundo!';
        })
        .controller('aboutController', function ($scope) {
            $scope.message = 'Esta es la página "Acerca de"';
        })
        .controller('contactController', function ($scope) {
            $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
        })
        .controller('sideNavController', function ($scope, $mdSidenav) {
            $scope.openLeftMenu = function () {
                $mdSidenav('left').toggle();
            };
            $scope.openRightMenu = function () {
                $mdSidenav('right').toggle();
            };
        })
        .controller('EventoElementCtrl', ['$scope', '$compile', function ($scope, $compile) {
                $scope.eliminar = function () {
                    var id = event.target.id;
                    var idpadre = ($('#' + id).parent().attr('id'));
                    console.log('id del elemento a borrar : ' + idpadre);
                    var idhijo = $('#' + idpadre).children('.element').attr("id");
                    console.log('id del elemento a borrar : ' + idhijo);
                    var myEl = angular.element(document.querySelector('#' + idpadre));
                    myEl.remove();

                };
                $scope.crear = function () {
                    var id = event.target.id;// obtengo la id elemento del bar
                    var abuelo = $('#' + id).parent().attr("id");
                    var abueloclon = document.getElementById(abuelo); // id elemento
                    var copyabuelo = $(abueloclon).clone(true);//se crea un clon  del elemento
                    //se edita los atributos de objeto  clonado
                    $(copyabuelo).attr("id", "ElemClonadoab" + contador);
                    $(copyabuelo).children('.element').attr("id", "parrafoab" + contador);
                    $(copyabuelo).children('.panelbody').attr('id', "panelbody" + contador);
                    $(copyabuelo).children('.delete-button').attr("id", "eliminarab" + contador);
                    $(copyabuelo).children('.crear-button').attr("id", "crearab" + contador);
                    $(copyabuelo).children('.editar-button').attr("id", "editarab" + contador);

                    $('#contpizarra').append($compile(copyabuelo)($scope));

                    contador++;
                };

            }])
        .controller('grillaCtrl', ['$scope', function ($scope) {
                $scope.number = 12;
                $scope.getNumber = function (num) {
                    return new Array(num);
                };
            }])
        .controller('ModalCtrl', ["$scope", "ngDialog", "$compile", function ($scope, ngDialog, $compile) {
                $scope.clickToOpen = function () {
                    $('#elementosmodal').empty();//limpia el visualizador
                    idelemento = event.target.id;
                    ngDialog.open({
                        template: 'templates/modal.html',
                        width: '50%',
                        height: '100%',
                        controller: 'modaldatosCtrl',
                        scope: $scope
                    });
                };
                $scope.largotext=function(largo,id){
                    var padre=$('#'+id).parent().attr('id');
                    var elem=document.getElementById(padre);
                    if(largo==='1'){
                      elem.style.width='250px';
                    }
                    if(largo==='2'){
                      elem.style.width='350px';
                    }
                    if(largo==='3'){
                      elem.style.width='400px';
                    }
                    if(largo==='4'){
                      elem.style.width='500px';
                    }
                   
                    
                }
                $scope.guardarelemento = function (e) {

                    var abuelo = $('#' + idelemento).parent().attr("id");
                    console.log('abuelo :' + abuelo);
                    var classabuelo = $('#' + idelemento).parent().attr("class");
                    console.log('abuelo class:' + classabuelo);
                    var padre = $('#' + abuelo).children().attr('id');
                    console.log('padre :' + padre);

                    if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                        $('#' + padre).children('.textotitulo').attr('id', 'titulotxto' + padre);
                        var idh1 = $('#' + padre).children('.textotitulo').attr('id');
                        $('#' + idh1).text($('#nombreelemento').val());
                        $('#' + idh1).children('.textotitulo').attr("style", "font-size:" + $('#letrasize').val() + "px");
                    }
                    if ($('#' + abuelo).attr("class") === 'element boton ui-resizable') {
                        $("#" + padre).attr("value", $('#nombreelemento').val());
                        console.log($('#' + padre).text());
                        $('#' + padre).attr("style", "font-size:" + $('#letrasize').val() + "px");
                    }
                    if ($('#' + padre).children('.element').attr("class") === 'lead element') {
                        $('#' + padre).children('.element').text($('#nombreelemento').val());
                        $('#' + padre).children('.element').attr("style", "font-size:" + $('#letrasize').val() + "px");
                    }
                    if ($('#' + padre).attr("class") === 'panelP card grid _md') {

                        var id = $('#'+padre).children('.panelbody').attr('id',"panelb" + contador);
                        var hijo=$('#'+padre).children('.panelbody').attr('id')
                        console.log( 'n'+hijo);
                        nc = $('#columnas').val();
                        nf = $('#filas').val();
                        n = 0;
                        i = 1;
                        var idcol = "col" + hijo;
                        //creando la grilla
                        while (n < nc) {
                            var idrow = "fila" + hijo + n;
                            var row='<div layout="row" style="padding: 0px" class="ng-scope layout-row" id="' + idrow + '"></div>';
                            $('#'+hijo).append(row);
                           
                            for (i; i <= nf; i++) {
                                var col='<div layout="column" class="columnas ng-scope layout-column" id="' + idcol + i + n + '"></div>';
                               
                                $('#'+idrow).append(col);
                            }
                            console.log('padre panel :' + hijo);
                            n++;
                            i = 1;
                        }
                        console.log('entre al panel')
                    }
                    console.log($('#' + idelemento).text());
                    ngDialog.closeAll();
                };
            }])
        .controller('modaldatosCtrl', function () {
        })