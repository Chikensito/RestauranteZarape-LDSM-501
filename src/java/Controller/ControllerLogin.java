/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Usuario;
import java.sql.PreparedStatement;
import org.utl.db.conexionMySQL;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.ResultSet;
/**
 *
 * @author mauca
 */
public class ControllerLogin {
    public Usuario validarLogin(Usuario user) throws SQLException {

        Usuario usuarioValidado = null;
        String sql = "SELECT * FROM usuario WHERE nombre = ? AND contrasenia = ?";

        conexionMySQL conMysql = new conexionMySQL();
        Connection conn = conMysql.open();

        PreparedStatement pstm = conn.prepareStatement(sql);
        pstm.setString(1, user.getNombre());
        pstm.setString(2, user.getContrasenia());

        ResultSet rs = pstm.executeQuery();

    if (rs.next()) {
        usuarioValidado = new Usuario();
        usuarioValidado.setIdUsuario(rs.getInt("idUsuario"));
        usuarioValidado.setNombre(rs.getString("nombre"));
        usuarioValidado.setContrasenia(rs.getString("contrasenia"));
        usuarioValidado.setActivo(rs.getInt("activo"));
    }

    rs.close();
    pstm.close();
    conn.close();
    conMysql.close();

    return usuarioValidado;
    }
}
