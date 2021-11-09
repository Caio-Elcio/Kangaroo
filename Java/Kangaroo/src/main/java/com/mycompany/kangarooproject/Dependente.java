package com.mycompany.kangarooproject;

public class Dependente {

    private String nomeDependente;

    public String getNomeDependente() {
        return nomeDependente;
    }

    public void setNomeDependente(String nomeDependente) {
        this.nomeDependente = nomeDependente;
    }

    @Override
    public String toString() {

        return this.getNomeDependente();
    }
}