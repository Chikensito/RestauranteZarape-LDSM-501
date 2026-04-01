/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author mauca
 */
public class Empleado {
    private int idEmpleado;
    private int idSucursal;
    private int idPersona;
    private int idUsuario;
    private int activo;

    public Empleado() {
    }

    public Empleado(int idEmpleado, int idSucursal, int idPersona, int idUsuario, int activo) {
        this.idEmpleado = idEmpleado;
        this.idSucursal = idSucursal;
        this.idPersona = idPersona;
        this.idUsuario = idUsuario;
        this.activo = activo;
    }

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Empleado{" + "idEmpleado=" + idEmpleado + ", idSucursal=" + idSucursal + ", idPersona=" + idPersona + ", idUsuario=" + idUsuario + ", activo=" + activo + '}';
    }
    
    
}
