package com.mycompany.kangarooproject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class SitesMaliciosos {

    private String titulo;
    private String url;
    private Integer idNavegacao;
    private String momentoVisitaSite = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));

    private List<String> sitesMaliciosos = new ArrayList<>();

    public SitesMaliciosos() {
        sitesMaliciosos.add("www.morte.com");
        sitesMaliciosos.add("www.se-matar.com");
        sitesMaliciosos.add("https://www.omegle.com/");
        sitesMaliciosos.add("www.hao123.com");

        sitesMaliciosos.add("https://sitesapostasbrasil.com/");
        sitesMaliciosos.add("https://sitedeapostas.com/bet365");
        sitesMaliciosos.add("https://sitedeapostas.com/betway");
        sitesMaliciosos.add("http://www.planecrashinfo.com/lastwords.htm");
    }

    public String getMomentoVisitaSite() {
        return momentoVisitaSite;
    }

    public void setMomentoVisitaSite(String momentoVisitaSite) {
        this.momentoVisitaSite = momentoVisitaSite;
    }

    public List<String> getSitesMaliciosos() {
        return sitesMaliciosos;
    }

    public void setSitesMaliciosos(List<String> sitesMaliciosos) {
        this.sitesMaliciosos = sitesMaliciosos;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getIdNavegacao() {
        return idNavegacao;
    }

    public void setIdNavegacao(Integer idNavegacao) {
        this.idNavegacao = idNavegacao;
    }

    @Override
    public String toString() {
        return this.url;
    }
}