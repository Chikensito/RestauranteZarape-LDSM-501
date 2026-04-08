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
    private int idDetalleCombo;
    private int idCombo;
    private Integer idAlimento;
    private Integer idBebida;
    private String tipoComponente;
    private String nombreProducto;
    private double precioUnitario;

    public DetalleCombo() {
    }

    public DetalleCombo(int idDetalleCombo, int idCombo, Integer idAlimento, Integer idBebida, String tipoComponente, String nombreProducto, double precioUnitario) {
        this.idDetalleCombo = idDetalleCombo;
        this.idCombo = idCombo;
        this.idAlimento = idAlimento;
        this.idBebida = idBebida;
        this.tipoComponente = tipoComponente;
        this.nombreProducto = nombreProducto;
        this.precioUnitario = precioUnitario;
    }

    public int getIdDetalleCombo() {
        return idDetalleCombo;
    }

    public void setIdDetalleCombo(int idDetalleCombo) {
        this.idDetalleCombo = idDetalleCombo;
    }

    public int getIdCombo() {
        return idCombo;
    }

    public void setIdCombo(int idCombo) {
        this.idCombo = idCombo;
    }

    public Integer getIdAlimento() {
        return idAlimento;
    }

    public void setIdAlimento(Integer idAlimento) {
        this.idAlimento = idAlimento;
    }

    public Integer getIdBebida() {
        return idBebida;
    }

    public void setIdBebida(Integer idBebida) {
        this.idBebida = idBebida;
    }

    public String getTipoComponente() {
        return tipoComponente;
    }

    public void setTipoComponente(String tipoComponente) {
        this.tipoComponente = tipoComponente;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    @Override
    public String toString() {
        return "DetalleCombo{" + "idDetalleCombo=" + idDetalleCombo + ", idCombo=" + idCombo + ", idAlimento=" + idAlimento + ", idBebida=" + idBebida + ", tipoComponente=" + tipoComponente + ", nombreProducto=" + nombreProducto + ", precioUnitario=" + precioUnitario + '}';
    }
}
