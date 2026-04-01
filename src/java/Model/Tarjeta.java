/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Tarjeta {
    private int idTarjeta;
    private String titular;
    private String numero;
    private String yy;
    private String mm;
    private String cvv;
    private String calle;
    private String numCalle;
    private String colonia;
    private String cp;
    private int activo;
    private int idCliente;
    private int idEstado;

    public Tarjeta() {
    }

    public Tarjeta(int idTarjeta, String titular, String numero, String yy, String mm, String cvv, String calle, String numCalle, String colonia, String cp, int activo, int idCliente, int idEstado) {
        this.idTarjeta = idTarjeta;
        this.titular = titular;
        this.numero = numero;
        this.yy = yy;
        this.mm = mm;
        this.cvv = cvv;
        this.calle = calle;
        this.numCalle = numCalle;
        this.colonia = colonia;
        this.cp = cp;
        this.activo = activo;
        this.idCliente = idCliente;
        this.idEstado = idEstado;
    }

    public int getIdTarjeta() {
        return idTarjeta;
    }

    public void setIdTarjeta(int idTarjeta) {
        this.idTarjeta = idTarjeta;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getYy() {
        return yy;
    }

    public void setYy(String yy) {
        this.yy = yy;
    }

    public String getMm() {
        return mm;
    }

    public void setMm(String mm) {
        this.mm = mm;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
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

    public String getCp() {
        return cp;
    }

    public void setCp(String cp) {
        this.cp = cp;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(int idEstado) {
        this.idEstado = idEstado;
    }

    @Override
    public String toString() {
        return "Tarjeta{" + "idTarjeta=" + idTarjeta + ", titular=" + titular + ", numero=" + numero + ", yy=" + yy + ", mm=" + mm + ", cvv=" + cvv + ", calle=" + calle + ", numCalle=" + numCalle + ", colonia=" + colonia + ", cp=" + cp + ", activo=" + activo + ", idCliente=" + idCliente + ", idEstado=" + idEstado + '}';
    }
    
    
}
