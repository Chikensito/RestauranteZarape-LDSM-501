/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class DetalleTicket {
    private int idTicket;
    private int cantidad;
    private double precio;
    private int idCombo;
    private int idProducto;

    public DetalleTicket() {
    }

    public DetalleTicket(int idTicket, int cantidad, double precio, int idCombo, int idProducto) {
        this.idTicket = idTicket;
        this.cantidad = cantidad;
        this.precio = precio;
        this.idCombo = idCombo;
        this.idProducto = idProducto;
    }

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getIdCombo() {
        return idCombo;
    }

    public void setIdCombo(int idCombo) {
        this.idCombo = idCombo;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    @Override
    public String toString() {
        return "DetalleTicket{" + "idTicket=" + idTicket + ", cantidad=" + cantidad + ", precio=" + precio + ", idCombo=" + idCombo + ", idProducto=" + idProducto + '}';
    }
    
    
}
