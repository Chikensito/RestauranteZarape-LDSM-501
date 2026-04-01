/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Comanda {
    private int idComanda;
    private int idTicket;
    private int estatus;

    public Comanda() {
    }

    public Comanda(int idComanda, int idTicket, int estatus) {
        this.idComanda = idComanda;
        this.idTicket = idTicket;
        this.estatus = estatus;
    }

    public int getIdComanda() {
        return idComanda;
    }

    public void setIdComanda(int idComanda) {
        this.idComanda = idComanda;
    }

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    @Override
    public String toString() {
        return "Comanda{" + "idComanda=" + idComanda + ", idTicket=" + idTicket + ", estatus=" + estatus + '}';
    }
    
    
}
