package com.mycompany.kangarooproject;

import com.github.britooo.looca.api.core.Looca; //Importando a api Looca
import com.github.britooo.looca.api.group.memoria.Memoria; // Importando a parte da memoria Ram da api Looca
import java.util.Timer; // Import para fazer funcionar o Timer
import java.util.TimerTask; // Import para fazer funcionar algo em um determinado tempo
import java.util.List; // Import para funcionar a lista para o teste de mesa
import org.springframework.jdbc.core.JdbcTemplate; // Import para fazer os comandos do banco no java
import com.github.britooo.looca.api.group.sistema.Sistema;

public class Ram extends javax.swing.JFrame {

    Looca looca = new Looca(); // Chamando a api do professor
    Memoria memoria = looca.getMemoria(); // Chamando o dado de memoria na api
    Sistema sistema = new Sistema();
    Computador pc = new Computador();

    Conexao con = new Conexao(); // Chamando a classe de conexao com o banco local
    JdbcTemplate template = new JdbcTemplate(con.getBanco());// Criando um template do tipo JDBC para poder inserir comandos do banco pelo Script do Java

    Timer timer = new Timer(); // Criando um timer do tipo Timer para colocar um intervalo
    int delay = 5000; // tempo de atraso para executar a tarefa em um intervalo de tempo
    int interval = 2000; // tempo para em que a tarefa será realizada

    //Boolean ContadorTabela = false;
    public Ram() {
        initComponents();
        setLocationRelativeTo(null); // Colocar a tela no meio quando começar
        Computador pc = new Computador();

        timer.scheduleAtFixedRate(new TimerTask() { // Atribuindo para que a tarefa seja executada a um tempo pré determinado
            public void run() {

                Double valorRamUsadaConta = Double.valueOf(memoria.getEmUso()); // Variável responsável por ver a Ram que está em Uso
                Double valorRamTotalConta = Double.valueOf(memoria.getTotal()); // Variável responsável por ver a Ram total
                Double valorRamLivre = Double.valueOf(memoria.getDisponivel()); // Variável responsável por ver a Ram disponível
                Double porcentagemRam = (valorRamUsadaConta / valorRamTotalConta) * 100; // Variável para saber o porcentagem da ram que está sendo usado

                valorRamUsadaConta = valorRamUsadaConta / 1024 / 1024 / 1024;
                valorRamTotalConta = Math.floor(valorRamTotalConta / 1024 / 1024 / 1000);

                String insert = "INSERT INTO monitoramento(totalRam, livreRam, usandoRam) VALUES (?, ?, ?)"; // variável que será chamada para inserir dados na tabela RAM

                template.update(insert, valorRamTotalConta, valorRamLivre, valorRamUsadaConta); // Inserindo os dados na tabela por meio do template.update;
                System.out.println("INSERT: " + insert);
                System.out.println("valorRamLivre: " + valorRamLivre);
                System.out.println("valorRamTotalConta: " + valorRamTotalConta);

                pgbPorcentagemRam.setValue(porcentagemRam.intValue()); // Atribuindo o valor da porcentagem para o progressBar

                Double valorRamTotal = Double.valueOf(memoria.getTotal()); // Variável para pegar a Ram total (por que só com 1 da erro);
                valorRamTotal = valorRamTotal / 1000000000; // Converter de 1.000.000.000 b para 1 Gb
                txtTotalRam.setText(String.format("%.1f Gb", valorRamTotal)); // Setando o valor da Ram total para para o txt

                valorRamLivre = valorRamLivre / 1000000000; // Conversão da Ram livre para Gb
                if (valorRamLivre < 1) { // Se der um valor menor que 1 Gb deve-se converter
                    valorRamLivre *= 1000; // converter para Mb o valor em Gb
                    txtRamLivre.setText(String.format("%.1f Mb", valorRamLivre)); // Setando o valor da Ram livre para o txt
                } else {
                    txtRamLivre.setText(String.format("%.1f Gb", valorRamLivre)); // Setando o valor em Gb para o txt da Ram livre
                }
                Double valorRamUsada = Double.valueOf(memoria.getEmUso()); // Convertendo o valor Long da memoria para Double (para poder caber)
                valorRamUsada = valorRamUsada / 1000000000; // Convertendo o valor da Ram para Gb
                txtRamUsada.setText(String.format("%.1f Gb", valorRamUsada)); // Setando o valor da Ram usada

                System.out.println(valorRamTotalConta + valorRamLivre + valorRamUsadaConta); // Ver se ta pegando os dados
                List resultados = template.queryForList("SELECT totalRam, livreRam, usandoRam FROM monitoramento"); // Ver se ta pegando os dados
                System.out.println(resultados); // Ver se ta pegando os dados
                GerenciadorDeLog registrarLog = new GerenciadorDeLog();
                registrarLog.adicionarLog("Log", "Inserindo dados na Ram");
            }
        }, delay, interval); // Ver se ta pegando os dados
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
        pgbPorcentagemRam = new javax.swing.JProgressBar();
        jPanel2 = new javax.swing.JPanel();
        txtTotal = new javax.swing.JLabel();
        txtLivre = new javax.swing.JLabel();
        txtUsado = new javax.swing.JLabel();
        txtTotalRam = new javax.swing.JLabel();
        txtRamLivre = new javax.swing.JLabel();
        txtRamUsada = new javax.swing.JLabel();
        txtRam = new javax.swing.JLabel();

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
                    .addComponent(btnRam, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnCpu, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addGap(45, 45, 45)
                .addComponent(txtTitulo, javax.swing.GroupLayout.PREFERRED_SIZE, 59, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 74, Short.MAX_VALUE)
                .addComponent(btnCpu)
                .addGap(18, 18, 18)
                .addComponent(btnRam)
                .addGap(18, 18, 18)
                .addComponent(btnDisco)
                .addGap(106, 106, 106))
        );

        pgbPorcentagemRam.setStringPainted(true);

        jPanel2.setBackground(new java.awt.Color(255, 255, 255));

        txtTotal.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtTotal.setText("Total:");

        txtLivre.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtLivre.setText("Livre:");

        txtUsado.setFont(new java.awt.Font("Segoe UI Light", 0, 16)); // NOI18N
        txtUsado.setText("Usado:");

        txtTotalRam.setText("Carregando...");

        txtRamLivre.setText("Carregando...");

        txtRamUsada.setText("Carregando...");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(50, 50, 50)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtTotal)
                    .addComponent(txtTotalRam))
                .addGap(111, 111, 111)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtLivre)
                    .addComponent(txtRamLivre))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 25, Short.MAX_VALUE)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtUsado)
                    .addComponent(txtRamUsada))
                .addGap(70, 70, 70))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(58, 58, 58)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtLivre)
                    .addComponent(txtTotal)
                    .addComponent(txtUsado))
                .addGap(18, 18, 18)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtTotalRam)
                    .addComponent(txtRamLivre)
                    .addComponent(txtRamUsada))
                .addContainerGap(41, Short.MAX_VALUE))
        );

        txtRam.setFont(new java.awt.Font("Segoe UI Light", 0, 18)); // NOI18N
        txtRam.setText("RAM");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(pgbPorcentagemRam, javax.swing.GroupLayout.PREFERRED_SIZE, 191, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(137, 137, 137))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(214, 214, 214)
                        .addComponent(txtRam)
                        .addContainerGap())
                    .addGroup(layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(txtRam)
                .addGap(18, 18, 18)
                .addComponent(pgbPorcentagemRam, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(31, 31, 31)
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(86, 86, 86))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnRamActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnRamActionPerformed
        // TODO add your handling code here:
        timer.cancel();
        Ram ram = new Ram(); // Chamando a classe RAM
        ram.setVisible(true); // Deixando a tela da RAM visivel
        //this.dispose(); // Fechar a tela atual
    }//GEN-LAST:event_btnRamActionPerformed

    private void btnCpuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnCpuActionPerformed
        // TODO add your handling code here:
        timer.cancel();
        Cpu cpu = new Cpu(); // Chamando a classe CPU
        cpu.setVisible(true); // Deixando a tela da CPU visivel
        this.dispose(); // Fechar a tela atual
    }//GEN-LAST:event_btnCpuActionPerformed

    private void btnDiscoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnDiscoActionPerformed
        timer.cancel();
        Discos disco = new Discos(); // Chamando a classe Discos
        disco.setVisible(true); // Deixando a tela do Disco visível
        this.dispose(); // Fechando a tela atual
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
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Ram.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Ram.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Ram.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Ram.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>
        //</editor-fold>
        GerenciadorDeLog registrarLog = new GerenciadorDeLog();
        registrarLog.adicionarLog("Log", "Ligou a tela de Ram");
        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Ram().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnCpu;
    private javax.swing.JButton btnDisco;
    private javax.swing.JButton btnRam;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JProgressBar pgbPorcentagemRam;
    private javax.swing.JLabel txtLivre;
    private javax.swing.JLabel txtRam;
    private javax.swing.JLabel txtRamLivre;
    private javax.swing.JLabel txtRamUsada;
    private javax.swing.JLabel txtTitulo;
    private javax.swing.JLabel txtTotal;
    private javax.swing.JLabel txtTotalRam;
    private javax.swing.JLabel txtUsado;
    // End of variables declaration//GEN-END:variables
}
