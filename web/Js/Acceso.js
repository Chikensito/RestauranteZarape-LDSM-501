function validarAcceso(){
    let u=document.getElementById("txtUsuario").value;
    let c=document.getElementById("txtContrasenia").value;

    if(u==="Chiken" && c==="10"){
        window.location.replace("Html/Principal.html");
    }else{
        //poner una alerta embellecida
        alert("Error de acceso");
        
        document.getElementById("txtUsuario").value="";
        document.getElementById("txtContrasenia").value="";
    }
}