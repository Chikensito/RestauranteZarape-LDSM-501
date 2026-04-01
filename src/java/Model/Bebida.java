/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Bebida {
    private int idBebida;
    private int idProducto;

    public Bebida() {
    }

    public Bebida(int idBebida, int idProducto) {
        this.idBebida = idBebida;
        this.idProducto = idProducto;
    }

    public int getIdBebida() {
        return idBebida;
    }

    public void setIdBebida(int idBebida) {
        this.idBebida = idBebida;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    @Override
    public String toString() {
        return "Bebida{" + "idBebida=" + idBebida + ", idProducto=" + idProducto + '}';
    }
    
    
}
