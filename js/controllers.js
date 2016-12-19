var contador = 0;
var guardarcont=0
var ancho,largo,posicion,colorfuente,fuente,size,altoElemento,anchoElemento,texto,colorfondo, alignvalor="";
angular.module('app.controllers', [])
        .controller('mainController', function ($scope) {
            $scope.message = 'Hola, Mundo!';
        })
        .controller('aboutController', function ($scope) {
            $scope.ver=function(){

                alert('Esta es la página "Acerca de');
            }
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
                    idelemento = event.target.id;

                    $scope.dialog= ngDialog.open({
                        class:'ngdialog-theme-default',
                        template: 'templates/modal.html',
                        width: '50%',
                        height: '100%',
                        controller: 'modaldatosCtrl',
                        scope: $scope
                    });
                };
                $scope.enter=function () {
                       /* var html3=('<div id="ElemClonado" class="textoP ng-scope">'+
                            '<div class="input-group element textoPH" id="parrafo0" style="width:100%;height:100%">'+
                            '<span class="input-group-addon textotitulo" id="titulotxtoparrafo0">titulo</span>'+
                            '<input type="text" class="form-control texto" id="teo" aria-describedby="basic-addon3">'+
                            '</div>'+
                           '<div id="elementos23"></div>');*/

                       /* var abuelo = $('#' + idelemento).parent().attr("id");
                        var elemento = document.getElementById(abuelo); // id elemento
                        angular.element(document.getElementById('view'))
                            .append($compile(elemento)($scope));*/

                    }
                $scope.salir=function () {

                    /* var abuelo = $('#eliminar0').parent().attr("id");
                     console.log(abuelo+'visualizador')
                     var padre = $('#' + abuelo).children().attr('id');
                     console.log(padre+'padre')
                     $scope.editartexto(padre);
                     */
                }
                $scope.editarboton=function (padre) {
                    var id=$scope.elemento.boton.id;
                    var idh = document.getElementById(id);
                    var abuelo = $('#' + idelemento).parent().attr("id");
                    var idp = document.getElementById(abuelo);
                    console.log('id del boton : '+abuelo)

                    console.log($scope.anchoelement.width)
                    console.log($scope.altoelement.height)

                    idp.style.width=  $scope.anchoelement.width;
                    idp.style.height= $scope.altoelement.height;
                    idh.style.backgroundColor= $scope.textConfig.colorfondo;
                    idh.style.color=$scope.textConfig.textcolor
                    idh.style.fontSize=$scope.font_size.opcion;
                    $('#' +id).val($scope.nomb_elementobtn);

                }
                $scope.editartexto=function(padre) {
                    var idh1=$('#' + padre).children('.textotitulo').attr('id');
                    var hijoid = document.getElementById(idh1);

                        //largo del texbox//

                        $scope.largotext(largo, padre);
                        // ancho del texbox

                        $scope.anchotext(ancho, padre);

                        // cambio posicion del titulo al textbox//

                        $scope.posiciontext(posicion, padre);

                        //cambio del nombre

                        $('#' + idh1).text($('#nombreelemento').val());

                        //fuente opciones

                        $scope.fontfamily(fuente,hijoid);
                        $scope.fontsize(size,hijoid);
                        hijoid.style.color=colorfuente;
                        hijoid.style.background=colorfondo;


                }
                $scope.editarparrafo=function(padre){

                    var id=$scope.elemento.parrafo.id;
                    var hijoid = document.getElementById(id);
                    $('#' + id).text($scope.modal.nomb_elemento);
                    hijoid.style.color=$scope.textConfig.textcolor;
                    hijoid.style.fontSize=$scope.font_size.opcion;
                    hijoid.style.textAlign= alignvalor;
                    hijoid.style.fontFamily=  $scope.familiaelegida.name;
                    hijoid.style.height='150px';
                    hijoid.style.width='250px';

                   // $scope.elemento={'parrafo':[{}]};
                   // $scope.elementos.push({element:[{  id: $scope.elemento.parrafo.id }]});
                }
                $scope.alignjustificar=function(){
                   alignvalor='justify';
                }
                $scope.aligncentrar=function(){
                    alignvalor='center';
                }
                $scope.alignderecha=function(){
                    alignvalor='right';
                }
                $scope.alignizquierda=function(){
                    alignvalor='left';
                }

                $scope.editarcheck=function (padre) {

                    idh1=$('#' + padre).children('.check').attr('id');
                    idh2=$('#' + padre).children('.textocheck').attr('id');
                    var padreid=document.getElementById(padre);
                    var hijoid = document.getElementById(idh1);
                    var hijoid2 = document.getElementById(idh2);
                    var posicion=  $scope.posicion.opcion;

                    padreid.style.width= $scope.largoelemento.width;
                    console.log('name ele: '+$scope.anchoelegido.name)
                    if( $scope.anchoelegido.name==='grande'){
                        $(padreid).attr('class',$scope.anchoelegido.clase)
                    }else if( $scope.anchoelegido.name==='pequeño'){
                        $(padreid).attr('class',$scope.anchoelegido.clase)
                    }else if( $scope.anchoelegido.name==='normal'){
                        console.log('cambio de clas :'+$scope.anchoelegido.name)
                        $(padreid).attr('class',$scope.anchoelegido.clase)
                    }

                    $scope.posiciontext( posicion, padre);
                    hijoid.style.backgroundColor=  $scope.textConfig.colorfondo;




                }
                $scope.editarimg=function (padre) {

                }
                $scope.anchosizeelement=function(size,elem){
                    if(size==='1'){
                        elem.style.width='100px';
                    }
                    if(size==='2'){
                        elem.style.width='200px';
                    }
                    if(size==='3'){
                        elem.style.width='300px';
                    }
                    if(size==='4'){
                        elem.style.width='400px';
                    }

                }
                $scope.altosizeelement=function(size,elem){
                if(size==='1'){
                    elem.style.height='100px';
                }
                if(size==='2'){
                    elem.style.height='200px';
                }
                if(size==='3'){
                    elem.style.height='300px';
                }
                if(size==='4'){
                    elem.style.height='400px';
                }

            }
                $scope.fontsize=function(size,elem){

                    if(size==='0'){
                        elem.style.fontSize='10px';
                    }
                    if(size==='1'){
                        elem.style.fontSize='15px';
                    }
                    if(size==='2'){
                        elem.style.fontSize='18px';
                    }
                    if(size==='3'){
                        elem.style.fontSize='20px';
                    }
                    if(size==='4'){
                        elem.style.fontSize='24px';
                    }
                    if(size==='5'){
                        elem.style.fontSize='30px';
                    }


                }
                $scope.fontfamily=function(fuente,elem){

                    if(fuente==='1'){
                        elem.style.fontFamily='Arial';
                    }if(fuente==='2'){
                        elem.style.fontFamily='Arial Black';
                    }if(fuente==='3'){
                        elem.style.fontFamily='Courier New';
                    }if(fuente==='4'){
                        elem.style.fontFamily='Georgia';
                    }if(fuente==='5'){
                        elem.style.fontFamily='Comic Sans MS';
                    }if(fuente==='6'){
                        elem.style.fontFamily='Impact';
                    }if(fuente==='7'){
                        elem.style.fontFamily='Times New Roman';
                    }if(fuente==='8'){
                        elem.style.fontFamily='Trebuchet MS';
                    }if(fuente==='9'){
                        elem.style.fontFamily='Verdana';
                    }
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
                $scope.anchotext=function (anch,id) {
                    if( anch=== '1'){
                        //grande
                        $('#' + id).attr("class","input-group input-group-lg");
                    }
                    else if (anch === '2') {
                        //normal
                        $('#' + id).attr("class","input-group");
                    } else if (anch === '3') {
                        //pequeño
                        console.log('entre')
                        $('#' + id).attr("class","input-group input-group-sm");
                    }
                }
                $scope.posiciontext=function(posicion,id){
                    if(posicion==='derecha'){
                        $($('#' + id).children('.textotitulo')).before($('#' + id).children('.texto')); //derecha
                        $($('#' + id).children('.check')).before($('#' + id).children('.textocheck')); //derecha
                    }else if(posicion==='izquierda'){
                        $($('#' + id).children('.texto')).before($('#' + id).children('.textotitulo'));//izquierda
                        $($('#' + id).children('.textocheck')).before($('#' + id).children('.check')); //izquierda
                    }
                }
                $scope.guardarelemento = function (e) {
                    var abuelo = $('#' + idelemento).parent().attr("id");
                    var classabuelo = $('#' + idelemento).parent().attr("class");
                    var padre = $('#' + abuelo).children().attr('id');

                    //texto
                    if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                        $scope.editartexto(padre);
                    }
                    //imagen
                    if ($('#'+padre).children('.element').attr("class")==='thumbnail element'){

                    }
                    //boton
                    if ($('#' + abuelo).attr("class") === 'element boton grid ng-scope') {
                       var padre= $('#' + abuelo).children('.element').attr("id");
                        console.log(padre);
                        $scope.editarboton(abuelo);
                    }
                    //parrafo
                    if ($('#' + padre).children('.element').attr("class") === 'lead element') {

                            $scope.editarparrafo(padre);


                        alignvalor="";

                    }
                    //panel
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
                    }
                    //check
                    if ($('#'+padre).attr("class") === 'input-group element' || $('#'+padre).attr("class") === 'input-group input-group-lg' || $('#'+padre).attr("class") === 'input-group input-group-sm'){

                        $scope.editarcheck(padre);
                        }
                    console.log($('#' + idelemento).text());

                    ngDialog.closeAll();
                };
            }])
        .controller('modaldatosCtrl',["$scope","$compile",function ($scope,$compile) {

            var abuelo = $('#' + idelemento).parent().attr("id");
            var classabu=$('#'+abuelo).attr("class")
            var padre = $('#' + abuelo).children().attr('id');

            //cambio id del hijo texto
            $('#'+padre).children('.textotitulo').attr('id','titulotxto'+padre);
            //cambio id hijo parrafo
            $('#'+padre).children('.element').attr('id','textoparrafo'+padre);
            //cambio id hijo check
            $('#' + padre).children('.check').attr('id','check'+padre);
            $('#' + padre).children('.textocheck').attr('id','check hermano'+padre);


            var idh1=$('#'+padre).children('.textotitulo').attr('id');

            //$scope.textConfig = {};
            $scope.ancho = {
                opcion: null,
            }
            $scope.largo = {
                opcion: null,
            }
            $scope.posicion = {
                opcion: 'izquierda'
            }
            $scope.fonts = {
                opcion: null,
            };
            $scope.size ={
                opcion:null,
            };
            $scope.textConfig = {
                optionsf:{
                    label: "color fuente",
                    icon: "brush",
                    default: "#000000",
                    genericPalette: false,
                    history: false
                },
                optionsb:{
                    label: "color fondo",
                    icon: "brush",
                    default: "rgb(205, 205, 205)",
                    genericPalette: false,
                    history: false
                },
                optionsborder:{
                    label: "color borde",
                    icon: "brush",
                }
            };
            $scope.anchoElemento = {
                opcion: null,
            }
            $scope.altoElemento = {
                opcion: null,
            }
            $scope.texto={};
            $scope.modal={
                textConfig :{}
            }
            $scope.font_size={
                opcion:null,
            }
            $scope.fontfamilia = [
                { id: 1, name: 'Arial' },
                { id: 2, name: 'Arial Black' },
                { id: 3, name: 'Courier New' },
                { id: 4, name: 'Georgia' },
                { id: 5, name: 'Comic Sans MS' },
                { id: 6, name: 'Impact' },
                { id: 7, name: 'Times New Roman' },
                { id: 8, name: 'Trebuchet MS' },
                { id: 9, name: 'Verdana' }
            ];
            $scope.widthbuton=[
                {id:1,width:'50px'},
                {id:2,width:'100px'},
                {id:3,width:'150px'},
                {id:4,width:'200px'},
                {id:5,width:'250px'},
                {id:6,width:'300px'},
                {id:7,width:'350px'},
                {id:8,width:'400px'},
            ]
            $scope.heightbuton=[
                {id:1,height:'50px'},
                {id:2,height:'100px'},
                {id:3,height:'150px'},
                {id:4,height:'200px'},
                {id:5,height:'250px'},
                {id:6,height:'300px'},
                {id:7,height:'350px'},
                {id:8,height:'400px'},

            ]
            $scope.anchotexto=[
                {id:1,name:'grande', clase:'input-group input-group-lg'},
                {id:2,name:'pequeño',clase:"input-group input-group-sm"},
                {id:3,name:'normal',clase:"input-group element"},
            ]
            $scope.widthcheck=[
                {id:1,width:'150px'},
                {id:2,width:'200px'},
                {id:3,width:'250px'},
                {id:4,width:'300px'},
                {id:5,width:'350px'}
            ]

            //$scope.elementos=[];

            console.log($scope.elemento);
            // obtengo los valores de los atributos del elemento texbox//
            //     textbox
            if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                $scope.elemento={}
                $scope.verattrtexto = 'true';
                $scope.nomb_elemento = $('#' + idh1).text();
                //$scope.textConfig.textColor=colorfuente;

                $scope.textConfig.textColor;
                $scope.textConfig.fondoColor;
                $scope.cambio = function () {
                    ancho = $scope.ancho.opcion;
                    largo = $scope.largo.opcion;
                    posicion = $scope.posicion.opcion;
                    fuente=$scope.fonts.opcion;
                    size=$scope.size.opcion;
                    colorfuente= $scope.textConfig.textColor;
                    colorfondo= $scope.textConfig.fondoColor;
                }
            }
            //panel
            if ($('#' + padre).attr("class") === 'panelP card grid _md') {
                $scope.verattrpanel='true';
            }
            //boton
            if ($('#'+abuelo).attr("class") === 'element boton grid ng-scope'){

                $scope.elemento={boton:{}};
                $scope.verattrboton = 'true';
                $scope.elemento.boton.id=$('#' + padre).attr('id');
                $scope.elemento.boton.valor=$('#' + padre).val();
                $scope.elemento.boton.color=$('#' + padre).css('color')
                $scope.elemento.boton.font_size=$('#' + padre).css('font-size');
                $scope.elemento.boton.color_fondo=$('#' + padre).css('background-color');

                $scope.elemento.boton.widthbton=$('#' + padre).css('width');
                $scope.elemento.boton.heightbton=$('#' + padre).css('height');

                $scope.widthbuton.push({id:9,width: $scope.elemento.boton.widthbton});
                $scope.anchoelement=$scope.widthbuton[8];

                $scope.heightbuton.push({id:9,height: $scope.elemento.boton.heightbton});
                $scope.altoelement=$scope.heightbuton[8];

                $scope.textConfig.textcolor= $scope.elemento.boton.color;
                $scope.textConfig.colorfondo= $scope.elemento.boton.color_fondo;
                $scope.nomb_elementobtn=  $scope.elemento.boton.valor;
                $scope.font_size.opcion= $scope.elemento.boton.font_size;

                $scope.cambio = function () {
                    $scope.anchoelement
                    $scope.altoelement
                    $scope.font_size.opcion
                    $scope.textConfig.colorfondo
                    $scope.textConfig.textcolor
                }
            }
            //check
            if ($('#'+padre).attr("class") === 'input-group element' || $('#'+padre).attr("class") === 'input-group input-group-lg' || $('#'+padre).attr("class") === 'input-group input-group-sm'){

                idh1=$('#' + padre).children('.check').attr('id');
                idh2=$('#' + padre).children('.textocheck').attr('id');
                console.log('id hermano : '+idh2)
                $scope.verattrcheck = 'true';
                $scope.elemento={
                    check:{}
                }

                $scope.elemento.check.id= $('#' + idh1).attr('id');
                $scope.elemento.check.color_fondo=$('#' + idh1).css('background-color');
                $scope.elemento.check.color_borde=$('#' + idh1).css('border-color');
                $scope.elemento.check.clase=$('#' + padre).attr('class');
                $scope.elemento.check.widthcheck=$('#' + padre).css('width');

                $scope.widthcheck.push({id:6,width:  $scope.elemento.check.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];

                console.log('width check : '+ $scope.elemento.check.widthcheck);

                if(  $scope.elemento.check.clase==='input-group element'){
                    $scope.anchoelegido =$scope.anchotexto[2]

                }else if( $scope.elemento.check.clase==='input-group input-group-lg'){
                    $scope.anchoelegido =$scope.anchotexto[0]

                }else if( $scope.elemento.check.clase==='input-group input-group-sm'){
                    $scope.anchoelegido =$scope.anchotexto[1]
                }

                $scope.textConfig.colorfondo= $scope.elemento.check.color_fondo;
                $scope.textConfig.colorborde= $scope.elemento.check.color_borde;
                $scope.posicion.opcion
                console.log($scope.anchoelegido)
                $scope.cambio = function () {
                    $scope.textConfig.colorborde
                    $scope.textConfig.colorfondo
                    $scope.posicion.opcion
                    $scope.anchoelegido
                    $scope.largoelemento

                }
            }
            //parrafo
            if ($('#'+padre).attr("class") === 'input-group element parrafoPH layout-padding _md flex'){
                var idh1=$('#' + padre).children('.element').attr('id');
                $scope.elemento={parrafo:{}};
                $scope.verattrparrafo = 'true';

                $scope.elemento.parrafo.id=$('#' + idh1).attr('id');
                $scope.elemento.parrafo.valor=$('#' + idh1).text();
                $scope.elemento.parrafo.color=$('#' + idh1).css('color')
                $scope.elemento.parrafo.font_size=$('#' + idh1).css('font-size');
                $scope.elemento.parrafo.font_family=$('#' + idh1).css('font-family');

                $scope.modal.nomb_elemento=$scope.elemento.parrafo.valor;
                $scope.textConfig.textcolor= $scope.elemento.parrafo.color;
                $scope.font_size.opcion= $scope.elemento.parrafo.font_size;
                $scope.fontfamilia.push({id:10,name:$scope.elemento.parrafo.font_family});
                $scope.familiaelegida=$scope.fontfamilia[9];


                $scope.cambio = function () {
                    $scope.fonts.opcion;
                    $scope.textConfig.textcolor;
                    $scope.font_size.opcion
                    $scope.modal.nomb_elemento
                    $scope.familiaelegida
                }
            }
        }])
        .controller('fotoCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
            $scope.uploadPic = function(file) {
                file.upload = Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {username: $scope.username, file: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }])



