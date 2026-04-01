package org.utl.db;
import java.sql.Connection;
import java.sql.DriverManager;
/**
 *
 * @author mauca
 */
public class conexionMySQL {
    Connection conn;
    
    public Connection open(){
        String user = "root";
        String password = "12345678";
        String bd_name= "zarape";
        String url = "jdbc:mysql://127.0.0.1:3306/"+ bd_name;//Nadamas cambia el nombre de la base de datos "Personas"
        String parametros = "?allowpublickeyretryval=true&useSSL=false&useUnicode=true"
                + "&characterEncoding=utf-8";
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url+parametros,user,password);
            return conn;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    public void close(){
        if (conn != null){
            try{
                conn.close();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
