package com.mycompany.kangarooproject;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GerenciadorDeLog {

    Date data = new Date();

    public void adicionarLog(String titulo, String aviso) {
        try ( FileWriter criadorArquivo = new FileWriter("log.txt", true);  BufferedWriter buffer = new BufferedWriter(criadorArquivo);  PrintWriter escritorArquivo = new PrintWriter(buffer)) {
            escritorArquivo.append("\n" + data + " - " + titulo + " - " + aviso);
        } catch (IOException e) {
            Logger.getLogger(GerenciadorDeLog.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    /*public static void abriu() throws IOException{
        Login login = new Login();
        
        FileWriter log = new FileWriter("C:\\Users\\Public\\log.txt");
        PrintWriter gravarLog = new PrintWriter(log);
        
        gravarLog.printf("20210610_2306_Log_Aplicacao_Java_inicializada_com_sucesso!");
        
        log.close();
    }
    
    public static void fechou() throws IOException{
        FileWriter log = new FileWriter("C:\\Users\\Public\\log.txt");
        PrintWriter gravarLog = new PrintWriter(log);
        
        gravarLog.printf("20210610_2306_Log_Aplicacao_Java_inicializada_com_sucesso!");
        
        log.close();
    }*/
}