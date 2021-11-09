/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/

package com.mycompany.kangarooproject;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import org.springframework.jdbc.core.JdbcTemplate;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.json.JSONObject;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

public class Cpu extends javax.swing.JFrame {

    Looca looca = new Looca();
    Processador processadorCpu = new Processador();
    Sistema sistema = new Sistema();
    Conexao con = new Conexao();
    JdbcTemplate template = new JdbcTemplate(con.getBanco());

    SitesMaliciosos site = new SitesMaliciosos();

    JSONObject json = new JSONObject();

    Computador pc = new Computador();

    Timer timer = new Timer();
    int delay = 5000;
    int interval = 2000;
    Integer idNav;

    /**
     * Creates new form Memoria
     */
    public Cpu() {
        initComponents();
        setLocationRelativeTo(null);
        //List resultados = template.queryForList("SELECT * FROM cpu");
        //System.out.println("jkfkvfer"+resultados);
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {
                Double valorCpuUsadoConta = processadorCpu.getUso();
                pgbPorcentagemCpu.setValue(valorCpuUsadoConta.intValue());

                Integer processadorFisico = (processadorCpu.getNumeroCpusFisicas().intValue());
                txtProcessadorFisico.setText(String.format("%s ", processadorFisico));

                Integer processadorLogico = (processadorCpu.getNumeroCpusLogicas());
                txtProcessadorL.setText(String.format("%d ", processadorLogico));

                //valorCpuUsado=valorCpuUsado/1000;
                txtCpuUsado.setText(String.format("%.1f ", valorCpuUsadoConta) + "%");

                String insert = "INSERT INTO monitoramento(processadorLogico, processadorFisico, usandoCpu) VALUES (?, ?, ?)";

                template.update(insert, processadorLogico, processadorFisico, valorCpuUsadoConta);

                System.out.println(processadorFisico + processadorLogico + valorCpuUsadoConta);
                List resultados = template.queryForList("SELECT processadorLogico, processadorFisico, usandoCpu  FROM monitoramento");

                pc.setSistemaOperacional(sistema.getSistemaOperacional());
                pc.setTempoDeUso(sistema.getTempoDeAtividade());

                Double tempoDeAtividade = Double.valueOf(pc.getTempoDeUso());
                tempoDeAtividade = tempoDeAtividade / 3600;

                String insertSO = "UPDATE computador  set sistemaOperacional = (?) where idComputador = 1";
                template.update(insertSO, pc.getSistemaOperacional());

                String insertMonitoramento = "INSERT INTO monitoramento (tempoDeUso) values (?)";
                template.update(insertMonitoramento, tempoDeAtividade);
                GerenciadorDeLog registrarLog = new GerenciadorDeLog();
                registrarLog.adicionarLog("Log", "Inseriu os dados da CPU");

                List<SitesMaliciosos> sitesnavegados = template.query("SELECT top 1 url, idNavegacao FROM navegacao order by idNavegacao desc", new BeanPropertyRowMapper(SitesMaliciosos.class));

                for (SitesMaliciosos sitesN : sitesnavegados) {
                    if (idNav == sitesN.getIdNavegacao()) {
                        System.out.println("Nada");
                    } else {
                        idNav = sitesN.getIdNavegacao();
                        System.out.println(idNav);
                        System.out.println(sitesN.getIdNavegacao());
                        for (int i = 0; i < site.getSitesMaliciosos().size(); i++) {

                            if (sitesN.toString().equals(site.getSitesMaliciosos().get(i))) {
                                String insertSite = "INSERT INTO sitesrestritos (url, fkNavegacao)  values (?, ?)";
                                template.update(insertSite, site.getSitesMaliciosos().get(i), sitesN.getIdNavegacao());
                                List<SitesMaliciosos> sitesrestritos = template.query("SELECT top 1 url FROM sitesrestritos order by idSitesRestritos desc", new BeanPropertyRowMapper(SitesMaliciosos.class));
                                try {
                                    if (sitesrestritos.size() > 0) {
                                        for (SitesMaliciosos sitesM : sitesrestritos) {
                                            json.put("text", "Olá, tivemos um registro do seu filho acessando um site restrito, segue o registro: \n \n" + sitesM);
                                            Slack.sendMessage(json);
                                            System.out.println(json);

                                        }
                                    }
                                } catch (Exception e) {
                                    System.out.println("Nenhum site malicioso encontrado :smile:");
                                }
                            }
                        }
                    }
                }
            }
        }, delay, interval);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        btnRam = new javax.swing.JButton();
        btnCpu = new javax.swing.JButton();
        btnDisco = new javax.swing.JButton();
        txtTitulo = new javax.swing.JLabel();
        txtCpu = new javax.swing.JLabel();
        pgbPorcentagemCpu = new javax.swing.JProgressBar();
        jPanel2 = new javax.swing.JPanel();
        txtProcessadoresF = new javax.swing.JLabel();
        txtProcessadorLogico = new javax.swing.JLabel();
        txtUsado = new javax.swing.JLabel();
        txtProcessadorFisico = new javax.swing.JLabel();
        txtProcessadorL = new javax.swing.JLabel();
        txtCpuUsado = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosing(java.awt.event.WindowEvent evt) {
                formWindowClosing(evt);
            }
        });

        jPanel1.setBackground(new java.awt.Color(56, 63, 82));

        btnRam.setBackground(new java.awt.Color(255, 255, 255));
        btnRam.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        btnRam.setText("RAM");
        btnRam.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnRamActionPerformed(evt);
            }
        });

        btnCpu.setBackground(new java.awt.Color(255, 255, 255));
        btnCpu.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        btnCpu.setText("CPU");
        btnCpu.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnCpuActionPerformed(evt);
            }
        });

        btnDisco.setBackground(new java.awt.Color(255, 255, 255));
        btnDisco.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        btnDisco.setText("Disco");
        btnDisco.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnDiscoActionPerformed(evt);
            }
        });

        txtTitulo.setFont(new java.awt.Font("Segoe UI Light", 0, 18)); // NOI18N
        txtTitulo.setForeground(new java.awt.Color(255, 255, 255));
        txtTitulo.setText("MONITORAMENTO DA MÁQUINA");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap(24, Short.MAX_VALUE)
                .addComponent(txtTitulo)
                .addContainerGap())
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(89, 89, 89)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(btnDisco, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnCpu, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnRam, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addGap(45, 45, 45)
                .addComponent(txtTitulo, javax.swing.GroupLayout.PREFERRED_SIZE, 59, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(btnCpu)
                .addGap(18, 18, 18)
                .addComponent(btnRam)
                .addGap(18, 18, 18)
                .addComponent(btnDisco)
                .addGap(86, 86, 86))
        );

        txtCpu.setFont(new java.awt.Font("Segoe UI Light", 0, 18)); // NOI18N
        txtCpu.setText("CPU");

        pgbPorcentagemCpu.setStringPainted(true);

        jPanel2.setBackground(new java.awt.Color(255, 255, 255));

        txtProcessadoresF.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtProcessadoresF.setText("Processadores físicos");

        txtProcessadorLogico.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtProcessadorLogico.setText("Processadores lógicos");

        txtUsado.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtUsado.setText("Usado:");

        txtProcessadorFisico.setText("Carregando...");

        txtProcessadorL.setText("Carregando...");

        txtCpuUsado.setText("Carregando...");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtProcessadoresF)
                    .addComponent(txtProcessadorFisico))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 17, Short.MAX_VALUE)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtProcessadorLogico)
                    .addComponent(txtProcessadorL))
                .addGap(34, 34, 34)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtCpuUsado)
                    .addComponent(txtUsado))
                .addGap(31, 31, 31))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(58, 58, 58)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtProcessadorLogico)
                    .addComponent(txtProcessadoresF)
                    .addComponent(txtUsado))
                .addGap(18, 18, 18)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtProcessadorFisico)
                    .addComponent(txtProcessadorL)
                    .addComponent(txtCpuUsado))
                .addContainerGap(41, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(140, 140, 140)
                                .addComponent(pgbPorcentagemCpu, javax.swing.GroupLayout.PREFERRED_SIZE, 191, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(214, 214, 214)
                                .addComponent(txtCpu)))
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(3, 3, 3)
                        .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(90, Short.MAX_VALUE)
                .addComponent(txtCpu)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(pgbPorcentagemCpu, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(31, 31, 31)
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(76, 76, 76))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnRamActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnRamActionPerformed
        timer.cancel();
        Ram ram = new Ram();
        ram.setVisible(true);
        this.dispose();
        // TODO add your handling code here:
    }//GEN-LAST:event_btnRamActionPerformed

    private void btnCpuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnCpuActionPerformed
        //cpu.setVisible(true);
        // TODO add your handling code here:
    }//GEN-LAST:event_btnCpuActionPerformed

    private void btnDiscoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnDiscoActionPerformed
        timer.cancel();
        Discos disco = new Discos();
        disco.setVisible(true);
        this.dispose();
        // TODO add your handling code here:
    }//GEN-LAST:event_btnDiscoActionPerformed

    private void formWindowClosing(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowClosing
        // TODO add your handling code here:
        GerenciadorDeLog registrarLog = new GerenciadorDeLog();
        registrarLog.adicionarLog("Log", "Fechou a aplicação");
    }//GEN-LAST:event_formWindowClosing

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
 /* try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Cpu.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Cpu.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Cpu.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Cpu.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>
        //</editor-fold>
        /* Create and display the form */
        GerenciadorDeLog registrarLog = new GerenciadorDeLog();
        registrarLog.adicionarLog("Log", "Ligou a tela CPU");
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Cpu().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnCpu;
    private javax.swing.JButton btnDisco;
    private javax.swing.JButton btnRam;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JProgressBar pgbPorcentagemCpu;
    private javax.swing.JLabel txtCpu;
    private javax.swing.JLabel txtCpuUsado;
    private javax.swing.JLabel txtProcessadorFisico;
    private javax.swing.JLabel txtProcessadorL;
    private javax.swing.JLabel txtProcessadorLogico;
    private javax.swing.JLabel txtProcessadoresF;
    private javax.swing.JLabel txtTitulo;
    private javax.swing.JLabel txtUsado;
    // End of variables declaration//GEN-END:variables
}