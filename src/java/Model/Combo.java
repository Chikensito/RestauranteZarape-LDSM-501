/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Combo {
    private int idCombo;
    private String nombre;
    private double total;

    public Combo() {
    }

    public Combo(int idCombo, String nombre, double total) {
        this.idCombo = idCombo;
        this.nombre = nombre;
        this.total = total;
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

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Combo{" + "idCombo=" + idCombo + ", nombre=" + nombre + ", total=" + total + '}';
    }
    
    
}
