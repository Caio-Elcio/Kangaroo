package com.mycompany.kangarooproject;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.springframework.jdbc.core.JdbcTemplate;

public class Computador {

    Looca looca = new Looca();
    Sistema sistema = new Sistema();
    Conexao con = new Conexao();
    JdbcTemplate template = new JdbcTemplate(con.getBanco());

    private String sistemaOperacional;
    private long tempoDeUso;

    public String getSistemaOperacional() {
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    public long getTempoDeUso() {
        return tempoDeUso;
    }

    public void setTempoDeUso(long tempoDeUso) {
        this.tempoDeUso = tempoDeUso;
    }

    @Override
    public String toString() {
        return "Computador{" + "sistemaOperacional=" + sistemaOperacional + ", tempoDeUso=" + tempoDeUso + '}';
    }
}