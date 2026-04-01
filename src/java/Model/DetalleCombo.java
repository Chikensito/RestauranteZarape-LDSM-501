/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class DetalleCombo {
    private int idCombo;
    private int idProducto;
    private double precio;

    public DetalleCombo() {
    }

    public DetalleCombo(int idCombo, int idProducto, double precio) {
        this.idCombo = idCombo;
        this.idProducto = idProducto;
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

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "DetalleCombo{" + "idCombo=" + idCombo + ", idProducto=" + idProducto + ", precio=" + precio + '}';
    }
    
    
}
