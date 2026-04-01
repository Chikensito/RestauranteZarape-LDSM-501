/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Cliente {
    private int idCliente;
    private int idPersona;
    private boolean activo;

    public Cliente() {
    }

    public Cliente(int idCliente, int idPersona, boolean activo) {
        this.idCliente = idCliente;
        this.idPersona = idPersona;
        this.activo = activo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Cliente{" + "idCliente=" + idCliente + ", idPersona=" + idPersona + ", activo=" + activo + '}';
    }
    
    
}
