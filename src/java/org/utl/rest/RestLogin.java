/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.rest;
import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import Controller.ControllerLogin;
import Model.Usuario;
/**
 *
 * @author mauca
 */
@Path("login")
public class RestLogin {
    
    @Path("validar")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response validar(@QueryParam("user") String user,
                            @QueryParam("password") String password) throws SQLException {
        
        String out = "";
        
        Usuario usuario = new Usuario();
        usuario.setNombre(user);
        usuario.setContrasenia(password);
        
        ControllerLogin cl = new ControllerLogin();
        Gson gson = new Gson();
        
        usuario = cl.validarLogin(usuario);
        
        if (usuario != null) {
            out = gson.toJson(usuario);
        } else {
            out = "{\"error\":\"Usuario o contraseña incorrectos\"}";
        }
        
        return Response.ok(out).build();
    }
}
