package org.utl.rest;

import com.google.gson.Gson;
import java.util.List;
import Controller.ControllerSucursal;
import Model.Sucursal;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("sucursal")
public class RestSucursal {

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = "";
        try {
            ControllerSucursal cs = new ControllerSucursal();
            List<Sucursal> lista = cs.getAll();
            out = new Gson().toJson(lista);
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"No se pudo consultar la lista\"}";
            return Response.serverError().entity(out).build();
        }
    }

    @Path("insert")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response insert(@FormParam("datos") @DefaultValue("") String datos) {
        String out = "";
        try {
            if (datos == null || datos.trim().isEmpty()) {
                throw new IllegalArgumentException("El parámetro 'datos' llegó vacío desde el frontend.");
            }
            
            Gson gson = new Gson();
            Sucursal s = gson.fromJson(datos, Sucursal.class);
            
            if (s == null) {
                throw new NullPointerException("El JSON no coincidió con la estructura de Sucursal.");
            }

            ControllerSucursal cs = new ControllerSucursal();
            cs.insert(s);

            out = "{\"result\":\"OK\"}";
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Error al insertar: " + e.getMessage() + "\"}";
            return Response.serverError().entity(out).build();
        }
    }

    @Path("update")
    @POST 
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@FormParam("datos") @DefaultValue("") String datos) {
        String out = "";
        try {
            if (datos == null || datos.trim().isEmpty()) {
                throw new IllegalArgumentException("El parámetro 'datos' llegó vacío desde el frontend.");
            }

            Gson gson = new Gson();
            Sucursal s = gson.fromJson(datos, Sucursal.class);

            if (s == null) {
                throw new NullPointerException("El JSON no coincidió con la estructura de Sucursal.");
            }

            ControllerSucursal cs = new ControllerSucursal();
            cs.update(s);

            out = "{\"result\":\"OK\"}";
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Error al actualizar: " + e.getMessage() + "\"}";
            return Response.serverError().entity(out).build();
        }
    }

    @Path("delete")
    @POST 
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idSucursal") @DefaultValue("0") int idSucursal) {
        String out = "";
        try {
            ControllerSucursal cs = new ControllerSucursal();
            cs.delete(idSucursal);

            out = "{\"result\":\"OK\"}";
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"Error al eliminar\"}";
            return Response.serverError().entity(out).build();
        }
    }
}