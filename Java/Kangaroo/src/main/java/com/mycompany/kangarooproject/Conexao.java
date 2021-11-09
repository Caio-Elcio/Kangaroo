package com.mycompany.kangarooproject;

import java.util.List;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

public class Conexao {

    private BasicDataSource banco;

    public Conexao() {
        this.banco = new BasicDataSource();

        this.banco = new BasicDataSource();
        banco.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        banco.setUrl("jdbc:sqlserver://srvkangaroo.database.windows.net;"
                + "databaseName=dbKangaroo");
        banco.setUsername("kangaroo");
        banco.setPassword("#Gfgrupo9");
    }

    public BasicDataSource getBanco() {
        return banco;
    }

    List<Login> query(String select_email_from_Usuario_where_email__, BeanPropertyRowMapper beanPropertyRowMapper, String loginDaVez) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    List<Login> query(String select_email_from_Usuario_where_email__, String loginDaVez) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}