/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Sucursal {
    private int idSucursal;
    private String nombre;
    private String latitud;
    private String longitud;
    private String foto;
    private String urlWeb;
    private String horarios;
    private String calle;
    private String numCalle;
    private String colonia;
    private int idCiudad;
    private int activo;

    public Sucursal() {
    }

    public Sucursal(int idSucursal, String nombre, String latitud, String longitud, String foto, String urlWeb, String horarios, String calle, String numCalle, String colonia, int idCiudad, int activo) {
        this.idSucursal = idSucursal;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.foto = foto;
        this.urlWeb = urlWeb;
        this.horarios = horarios;
        this.calle = calle;
        this.numCalle = numCalle;
        this.colonia = colonia;
        this.idCiudad = idCiudad;
        this.activo = activo;
    }

    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLatitud() {
        return latitud;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public String getLongitud() {
        return longitud;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getUrlWeb() {
        return urlWeb;
    }

    public void setUrlWeb(String urlWeb) {
        this.urlWeb = urlWeb;
    }

    public String getHorarios() {
        return horarios;
    }

    public void setHorarios(String horarios) {
        this.horarios = horarios;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getNumCalle() {
        return numCalle;
    }

    public void setNumCalle(String numCalle) {
        this.numCalle = numCalle;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public int getIdCiudad() {
        return idCiudad;
    }

    public void setIdCiudad(int idCiudad) {
        this.idCiudad = idCiudad;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Sucursal{" + "idSucursal=" + idSucursal + ", nombre=" + nombre + ", latitud=" + latitud + ", longitud=" + longitud + ", foto=" + foto + ", urlWeb=" + urlWeb + ", horarios=" + horarios + ", calle=" + calle + ", numCalle=" + numCalle + ", colonia=" + colonia + ", idCiudad=" + idCiudad + ", activo=" + activo + '}';
    }

    
    
}
