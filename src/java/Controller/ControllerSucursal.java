package Controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import org.utl.db.conexionMySQL;
import Model.Sucursal;
import Model.Ciudad;

public class ControllerSucursal {

    public void insert(Sucursal s) throws Exception {
        String sql = "INSERT INTO sucursal (nombre, latitud, longitud, foto, urlWeb, horarios, calle, numCalle, colonia, idCiudad, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)";

        conexionMySQL conMysql = new conexionMySQL();
        Connection conn = conMysql.open();
        PreparedStatement pstm = conn.prepareStatement(sql);

        pstm.setString(1, s.getNombre());
        pstm.setString(2, s.getLatitud() != null ? s.getLatitud() : "");
        pstm.setString(3, s.getLongitud() != null ? s.getLongitud() : "");
        pstm.setString(4, s.getFoto() != null ? s.getFoto() : "");
        pstm.setString(5, s.getUrlWeb() != null ? s.getUrlWeb() : "");
        pstm.setString(6, s.getHorarios() != null ? s.getHorarios() : "");
        pstm.setString(7, s.getCalle());
        pstm.setString(8, s.getNumCalle());
        pstm.setString(9, s.getColonia());

        int idCiu = (s.getCiudad() != null) ? s.getCiudad().getIdCiudad() : 1;
        pstm.setInt(10, idCiu);

        pstm.executeUpdate();
        pstm.close();
        conn.close();
        conMysql.close();
    }

    public void update(Sucursal s) throws Exception {
        String sql = "UPDATE sucursal SET nombre=?, latitud=?, longitud=?, foto=?, urlWeb=?, horarios=?, calle=?, numCalle=?, colonia=?, idCiudad=?, activo=? WHERE idSucursal=?";

        conexionMySQL conMysql = new conexionMySQL();
        Connection conn = conMysql.open();
        PreparedStatement pstm = conn.prepareStatement(sql);

        pstm.setString(1, s.getNombre());
        pstm.setString(2, s.getLatitud() != null ? s.getLatitud() : "");
        pstm.setString(3, s.getLongitud() != null ? s.getLongitud() : "");
        pstm.setString(4, s.getFoto() != null ? s.getFoto() : "");
        pstm.setString(5, s.getUrlWeb() != null ? s.getUrlWeb() : "");
        pstm.setString(6, s.getHorarios() != null ? s.getHorarios() : "");
        pstm.setString(7, s.getCalle());
        pstm.setString(8, s.getNumCalle());
        pstm.setString(9, s.getColonia());

        int idCiu = (s.getCiudad() != null) ? s.getCiudad().getIdCiudad() : 1;
        pstm.setInt(10, idCiu);

        pstm.setInt(11, s.getActivo());
        pstm.setInt(12, s.getIdSucursal());

        pstm.executeUpdate();
        pstm.close();
        conn.close();
        conMysql.close();
    }

    public void delete(int idSucursal) throws Exception {
        String sql = "UPDATE sucursal SET activo=0 WHERE idSucursal=?";
        conexionMySQL conMysql = new conexionMySQL();
        Connection conn = conMysql.open();
        PreparedStatement pstm = conn.prepareStatement(sql);
        pstm.setInt(1, idSucursal);
        pstm.executeUpdate();
        pstm.close();
        conn.close();
        conMysql.close();
    }

    public List<Sucursal> getAll() throws Exception {
        String sql = "SELECT s.*, c.nombre AS nombreCiudad, c.idEstado FROM sucursal s INNER JOIN ciudad c ON s.idCiudad = c.idCiudad";

        conexionMySQL conMysql = new conexionMySQL();
        Connection conn = conMysql.open();
        PreparedStatement pstm = conn.prepareStatement(sql);
        ResultSet rs = pstm.executeQuery();

        List<Sucursal> lista = new ArrayList<>();

        while (rs.next()) {
            Sucursal s = new Sucursal();
            Ciudad c = new Ciudad();

            s.setIdSucursal(rs.getInt("idSucursal"));
            s.setNombre(rs.getString("nombre"));
            s.setLatitud(rs.getString("latitud"));
            s.setLongitud(rs.getString("longitud"));
            s.setFoto(rs.getString("foto"));
            s.setUrlWeb(rs.getString("urlWeb"));
            s.setHorarios(rs.getString("horarios"));
            s.setCalle(rs.getString("calle"));
            s.setNumCalle(rs.getString("numCalle"));
            s.setColonia(rs.getString("colonia"));
            s.setActivo(rs.getInt("activo"));

            c.setIdCiudad(rs.getInt("idCiudad"));
            c.setNombre(rs.getString("nombreCiudad"));
            c.setIdEstado(rs.getInt("idEstado"));
            s.setCiudad(c);

            lista.add(s);
        }
        rs.close();
        pstm.close();
        conn.close();
        conMysql.close();
        return lista;
    }
}