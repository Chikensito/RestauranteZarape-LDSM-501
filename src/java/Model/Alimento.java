/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Alimento {
    private int idAlimento;
    private int idProducto;

    public Alimento() {
    }

    public Alimento(int idAlimento, int idProducto) {
        this.idAlimento = idAlimento;
        this.idProducto = idProducto;
    }

    public int getIdAlimento() {
        return idAlimento;
    }

    public void setIdAlimento(int idAlimento) {
        this.idAlimento = idAlimento;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    @Override
    public String toString() {
        return "Alimento{" + "idAlimento=" + idAlimento + ", idProducto=" + idProducto + '}';
    }
    
    
}
