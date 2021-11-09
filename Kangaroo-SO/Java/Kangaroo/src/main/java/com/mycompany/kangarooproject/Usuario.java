package com.mycompany.kangarooproject;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

public class Usuario {

    private String email;
    private String senha;
    private String cpf;
    private Boolean emailAchou;
    private Boolean senhaAchou;

    public Boolean getEmailAchou() {
        return emailAchou;
    }

    public void setEmailAchou(Boolean emailAchou) {
        this.emailAchou = emailAchou;
    }

    public Boolean getSenhaAchou() {
        return senhaAchou;
    }

    public void setSenhaAchou(Boolean senhaAchou) {
        this.senhaAchou = senhaAchou;
    }

    Conexao con = new Conexao();
    JdbcTemplate template = new JdbcTemplate(con.getBanco());

    public Usuario(String email, String senha, String cpf) {
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    //public void selectTeste(){
    List resultados = template.queryForList("SELECT email FROM Usuario");
    List resultadosSenha = template.queryForList("SELECT senha FROM Usuario");
    //System.out.println(resultados.toString());
    //}
}
