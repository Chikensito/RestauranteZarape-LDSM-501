/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mauca
 */
public class Combo {
    private int idCombo;
    private String nombre;
    private String descripcion;
    private double precio;
    private int activo;
    private List<DetalleCombo> detalles;

    public Combo() {
        this.detalles = new ArrayList<>();
    }

    public Combo(int idCombo, String nombre, String descripcion, double precio, int activo, List<DetalleCombo> detalles) {
        this.idCombo = idCombo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.activo = activo;
        this.detalles = detalles == null ? new ArrayList<>() : detalles;
    }

    public int getIdCombo() {
        return idCombo;
    }

    public void setIdCombo(int idCombo) {
        this.idCombo = idCombo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public List<DetalleCombo> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCombo> detalles) {
        this.detalles = detalles == null ? new ArrayList<>() : detalles;
    }

    @Override
    public String toString() {
        return "Combo{" + "idCombo=" + idCombo + ", nombre=" + nombre + ", descripcion=" + descripcion + ", precio=" + precio + ", activo=" + activo + ", detalles=" + detalles + '}';
    }
}
