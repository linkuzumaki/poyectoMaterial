var contador = 0;
var alignvalor="";
var imgsave
angular.module('app.controllers', [])
    .controller('mainController', function ($scope) {
            $scope.message = 'Hola, Mundo!';
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
    .controller('grillaCtrl',['$scope', function ($scope) {

       /* $scope.number = 12;
        $scope.getNumber = function (num) {
            return new Array(num);
        };*/
       var nc=8,nf =6,n=0,i= 1;
        //creando la grilla
        while (n < nc) {
            var idcol = "col" + n;

            var row='<div layout="row" style="padding: 0px" class="ng-scope layout-row" id="' + idcol + '"></div>';
            $('#contpizarra').append(row);

            for (i; i <= nf; i++) {
                var idrow = "fila" + i;
                var col='<div layout="column" class="columnas ng-scope layout-column" id="' + idrow + i + n + '"></div>';
                $('#'+idcol).append(col);
            }
            n++;
            i = 1;
        }


    }])
    .controller('ModalCtrl',["$scope","storageLista","ngDialog","$compile","fileReader", function ($scope,storageLista,ngDialog,$compile,fileReader) {

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
                $scope.verlista=function(index) {
                    var idelemento = event.target.id;
                    var padre = $('#' + idelemento).parent().attr("id");
                    $scope.lista = storageLista.listadatos(padre)
                    $scope.listan=$scope.lista;
                    console.log($scope.listan)
                }
                $scope.leerarchivo=function(){
                    fileReader.readAsDataUrl($scope.file,$scope).then(function(result){
                        $scope.srcimagen=result;
                        imgsave=$scope.srcimagen
                    })
                }
                $scope.agregardatos=function () {
                    var id=$scope.elemento.select.id
                    if ($scope.nuevodato != null)
                        $scope.datos.push({texto: $scope.nuevodato});
                        storageLista.guardarlista($scope.datos,id);
                    $scope.nuevodato = null;
                    $scope.lista=storageLista.listadatos($scope.elemento.select.id)
                    $scope.listaelegida=$scope.lista[0];

                }
                $scope.consola=function(persona,index) {
                   console.log(persona);
                   console.log(index);
                }
                $scope.eliminarlista=function(index) {
                    storageLista.removelista(index,$scope.lista)
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
                    var abuelo = $('#' + padre).parent().attr("id");
                    var padreid=document.getElementById(padre);
                    var abueloid=document.getElementById(abuelo);
                    var id=$scope.elemento.textbox.id;
                    var hijoid = document.getElementById(id);
                    var posicion=  $scope.posicion.opcion;

                    console.log('id padre '+padre)
                    $('#' + id).text($scope.nomb_elemento);
                    hijoid.style.color= $scope.textConfig.textcolor;
                   // hijoid.style.fontSize= $scope.font_size.opcion;
                    hijoid.style.fontFamily= $scope.familiaelegida.name;
                    hijoid.style.backgroundColor= $scope.textConfig.colorfondo;
                    abueloid.style.width= $scope.largoelemento.width;
                    $scope.posiciontext( posicion, padre);

                    if( $scope.anchoelegido.name==='grande'){
                        $(padreid).attr('class',$scope.anchoelegido.clase)
                    }else if( $scope.anchoelegido.name==='pequeño'){
                        $(padreid).attr('class',$scope.anchoelegido.clase);
                    }else if( $scope.anchoelegido.name==='normal'){
                        $(padreid).attr('class',$scope.anchoelegido.clase)
                    }

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
                    var abuelo = $('#' + padre).parent().attr("id");
                    var idh1=$('#' + padre).children('.thumb').attr('id');
                    var abueloid=document.getElementById(abuelo);
                    var hijoid = document.getElementById(idh1);
                    var padreid = document.getElementById(padre);

                    if($scope.formaimmagen.opcion==="true"){

                        hijoid.style.borderTopLeftRadius='0% 0%';
                        hijoid.style.borderTopRightRadius='0% 0%';
                        hijoid.style.borderBottomLeftRadius='0% 0%';
                        hijoid.style.borderBottomRightRadius='0% 0%';
                        padreid.style.backgroundColor='rgba(255, 255, 255, 0.88)';
                        padreid.style.border='border: 1px solid #ddd;';

                    }
                    if($scope.formaimmagen.opcion==="false"){
                        //$('#'+idh1).attr('class','circular--square')

                        hijoid.style.borderTopLeftRadius='50% 50%';
                        hijoid.style.borderTopRightRadius='50% 50%';
                        hijoid.style.borderBottomLeftRadius='50% 50%';
                        hijoid.style.borderBottomRightRadius='50% 50%';
                        padreid.style.backgroundColor='rgba(255, 255, 255, 0)';
                        padreid.style.border='0px !important';

                    }

                    hijoid.src= imgsave;
                    abueloid.style.width=  $scope.anchoelement.width;
                    abueloid.style.height= $scope.altoelement.height;

                }
                $scope.editarselect=function(padre){
                    var abuelo = $('#' + padre).parent().attr("id");
                    var padreid=document.getElementById(padre);
                    var abueloid=document.getElementById(abuelo);
                    console.log($scope.largoelemento.width);
                    var id=$scope.elemento.select.idtitulo;
                    $('#' + id).text($scope.tituloselect);
                    abueloid.style.width= $scope.largoelemento.width;
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


                    console.log($('#'+padre).children('.thumb').attr("class"))

                    //texto
                    if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                        $scope.editartexto(padre);
                    }
                    //imagen
                    if ($('#' + padre).attr("class") === 'thumbnail element') {
                        console.log('save img')
                        $scope.editarimg(padre);
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


                        var hijo=$('#'+padre).children('.panelbody').attr('id')
                        console.log( 'n'+hijo);
                        nc = $('#columnas').val();
                        nf = $('#filas').val();
                        n = 0;
                        i = 1;
                        var idcol = "colpanel" + hijo;
                        //creando la grilla
                        while (n < nc) {
                            var idrow = "filapanel" + hijo + n;
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
                    if ($('#' + padre).children('.check').attr("class") === 'input-group-addon check' ){

                        $scope.editarcheck(padre);
                        }
                        //select
                    if($('#' + padre).attr("class") === 'form-group element selectP ng-scope'){
                        $scope.editarselect(padre);
                    }
                    console.log($('#' + idelemento).text());

                    ngDialog.closeAll();
                };
            }])
    .controller('modaldatosCtrl',["$scope","$compile","fileReader","storageLista",function ($scope,$compile,fileReader,storageLista) {

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
            //cambio id panel
            console.log(abuelo)
            $('#'+padre).children('.panelbody').attr('id',"panelb" + contador);
            //cambio id img
            $('#'+padre).children('.thumb').attr('id',"imagen" + contador);
            var idh1=$('#'+padre).children('.textotitulo').attr('id');
            //cambio id select
            $('#'+padre).children('.selecthijo').attr('id',"select" + contador);
            $('#'+padre).children('.textoselect').attr('id',"selecttexto" + contador);



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
            $scope.datos = [];
            $scope.lista=[]
            $scope.listamain=[];

            $scope.formaimg= [
                {title: 'cuadrado',value:'true',name:"cuadrado"},
                {title: 'circular',value:'false',name:"circular"}
            ];

            $scope.formaimmagen={
            opcion:null,
            }

            // textbox
            if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                $scope.elemento={
                    textbox:{}
                }
                $scope.verattrtexto = 'true';
                $scope.elemento.textbox.id=$('#' + idh1).attr('id');
                $scope.elemento.textbox.texttitulo=$('#' + idh1).text();
                $scope.elemento.textbox.color=$('#' + idh1).css('color')
                $scope.elemento.textbox.color_fondo=$('#' + idh1).css('background-color');
                $scope.elemento.textbox.font_size=$('#' + idh1).css('font-size');
                $scope.elemento.textbox.font_family=$('#' + idh1).css('font-family');
                $scope.elemento.textbox.clase=$('#' + padre).attr('class');

                $scope.fontfamilia.push({id:10,name: $scope.elemento.textbox.font_family});
                $scope.familiaelegida=$scope.fontfamilia[9];
                $scope.elemento.textbox.widthcheck=$('#' + padre).css('width');
                $scope.widthcheck.push({id:6,width:  $scope.elemento.textbox.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];

                $scope.nomb_elemento=$scope.elemento.textbox.texttitulo;
                $scope.textConfig.textcolor= $scope.elemento.textbox.color;
                $scope.textConfig.colorfondo= $scope.elemento.textbox.color_fondo;
                $scope.font_size.opcion=$scope.elemento.textbox.font_size;
                $scope.posicion.opcion
                console.log('clase :'+$scope.elemento.textbox.clase)

                if(  $scope.elemento.textbox.clase==='input-group element'){
                    $scope.anchoelegido =$scope.anchotexto[2]

                }else if( $scope.elemento.textbox.clase==='input-group input-group-lg'){
                    $scope.anchoelegido =$scope.anchotexto[0]

                }else if( $scope.elemento.textbox.clase==='input-group input-group-sm'){
                    $scope.anchoelegido =$scope.anchotexto[1]
                }

                $scope.cambio = function () {
                    $scope.nomb_elemento;
                    $scope.font_size.opcion
                    $scope.textConfig.textcolor
                    $scope.textConfig.colorfondo
                    $scope.familiaelegida
                    $scope.anchoelegido
                    $scope.largoelemento
                    $scope.posicion.opcion
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
            if ($('#' + padre).children('.check').attr("class") === 'input-group-addon check'){

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
            //img
            if ($('#' + padre).attr("class") === 'thumbnail element') {
                var idh1=$('#' + padre).children('.thumb').attr('id');
                var abuelo = $('#' + padre).parent().attr("id");
                $scope.verattrimg='true';
                $scope.elemento={imagen:{}};

                $scope.elemento.imagen.id=$('#' + idh1).attr('id');
                $scope.elemento.imagen.widthbton=$('#' + abuelo).css('width');
                $scope.elemento.imagen.heightbton=$('#' + abuelo).css('height');

                $scope.formaimmagen.opcion=$scope.formaimg.name;

                var img = document.getElementById($scope.elemento.imagen.id);
                $scope.elemento.imagen.recurso=img.src;
                $scope.srcimagen= $scope.elemento.imagen.recurso;

                $scope.widthbuton.push({id:9,width: $scope.elemento.imagen.widthbton});
                $scope.anchoelement=$scope.widthbuton[8];

                $scope.heightbuton.push({id:9,height: $scope.elemento.imagen.heightbton});
                $scope.altoelement=$scope.heightbuton[8];


                $scope.cambio = function () {
                    $scope.anchoelement
                    $scope.altoelement
                    $scope.imageSrc
                    $scope.formaimmagen

                    if($scope.formaimmagen.opcion==="true"){
                        console.log('cuadrado')
                        $('#imgcuadrado').attr('style','display:show')
                        $('#imgcircular').attr('style','display:none')
                    }
                    if($scope.formaimmagen.opcion==="false"){
                        console.log('circulo')
                        $('#imgcuadrado').attr('style','display:none')
                        $('#imgcircular').attr('style','display:show')
                    }

                }
            }
            //select
            if ($('#' + padre).attr("class") === 'form-group element selectP ng-scope'){
                $scope.verattrselect='true';
                $scope.elemento={select:{}}

                var idh1=$('#'+padre).children('.selecthijo').attr('id');
                var idh2=$('#'+padre).children('.textoselect').attr('id');

                $scope.elemento.select.id=$('#' + padre).attr('id');
                $scope.elemento.select.idtitulo=$('#' + idh2).attr('id')
                $scope.elemento.select.widthcheck=$('#' + abuelo).css('width');
                $scope.elemento.select.texttitulo=$('#' + idh2).text();
                $scope.widthcheck.push({id:6,width:  $scope.elemento.select.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];
                $scope.tituloselect=$scope.elemento.select.texttitulo;
                $scope.lista=storageLista.listadatos($scope.elemento.select.id);
                $scope.elemento.select.idvisualselect=$('#sel1').attr('id');

                $scope.cambio = function () {
                    $scope.elemento.select.idtitulo
                    $scope.lista
                    $scope.largoelemento

                }


            }




            }])
    .controller('UploadController',["$scope","fileReader",function ($scope, fileReader) {
        $scope.readFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;

                });

        };
    }])


