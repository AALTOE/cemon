function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
var aData;
readTextFile("data.json", function(text){
        aData = JSON.parse(text);
        aData = aData.TelefonosCEDIS
        _Filtrar();
});


const sBuscador = document.querySelector("#buscador");

const _Filtrar = () =>{
    var x = aData;
    const sTexto = sBuscador.value.toLowerCase();
    var sTableHTML = "";
    var iContador  = 0;
    for (let oData of aData) {
        let sCEDIS  = oData.NOMBRE.toLowerCase();
        let sEXT    = oData.EXT.toLowerCase();
        let sDEPTO  = oData.PUESTO.toLowerCase();
        
        if(sCEDIS.indexOf(sTexto) !== -1){
            sTableHTML += _EscribirTabla(oData);
            iContador = iContador+1;
        }else if(sEXT.indexOf(sTexto) !== -1){
            sTableHTML += _EscribirTabla(oData);
            iContador = iContador+1;
        }else if(sDEPTO.indexOf(sTexto) !== -1){
            sTableHTML += _EscribirTabla(oData);
            iContador = iContador+1;
        }
        
    }

    if(sTableHTML === ""){
        sTableHTML += _noData();
    }

    document.getElementById("tablecount").innerHTML = iContador;
    document.getElementById("tableContacts").innerHTML = sTableHTML;
}

sBuscador.addEventListener('keyup', _Filtrar);


function _EscribirTabla (aPhones){
    var sFila = "<tr>"+
            "<td>"+
            "<div class='d-flex px-2 py-1'>"+
            "<div>"+
            "  <i class='material-icons me-3'>person</i>"+
            "</div>"+
            "<div class='d-flex flex-column justify-content-center'>"+
            "  <h6 class='mb-0'>"+aPhones.NOMBRE+"</h6>"+
            "</div>"+
            "</div>"+
            "</td>"+
            "<td>"+
            "<div class='align-middle text-center'>"+
            "    <h6 class='mb-0 '>"+aPhones.EXT+"</h6>"+
            "</div>"+
            "</td>"+
            "<td class='align-middle text-center text-sm'>"+
            "    <h6 class='mb-0 '>"+aPhones.PUESTO+"</h6>"+
            "</td>"+
            "<td class='align-middle text-center'>"+
            "<div class='progress-wrapper w-75 mx-auto'>"+
            "   <a href='#' role='button'"+
            "   <span class='btn-inner--icon'><i class='material-icons'>edit</i></span>"+
            "   </a>"+
            "   <a href='#' role='button'"+
            "   <span class='btn-inner--icon'><i class='material-icons'>delete</i></span>"+
            "   </a>"+
            "</div>"+
            "</td>"+
            "</tr>";
    return sFila;
}

function _noData (){
    var sFila = "<tr>"+
    "<td>"+
    "<div class='d-flex px-2 py-1'>"+
    "<div>"+
    "  <i class='material-icons me-3'>person</i>"+
    "</div>"+
    "<div class='d-flex flex-column justify-content-center'>"+
    "  <h6 class='mb-0 text-sm'>Sin datos</h6>"+
    "</div>"+
    "</div>"+
    "</td>"+
    "</tr>";
    return sFila;
}





