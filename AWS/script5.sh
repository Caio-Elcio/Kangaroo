#!/bin/bash
sudo rm -r /usr/lib/jvm/java-11-oracle -y
sudo apt-get purge git -y
sudo apt-get update
sudo apt-get install git
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
docker pull openjdk
sudo apt install default-jre -y
sudo apt install default-jdk -y


====================================
#!/bin/bash
sudo rm -r /usr/lib/jvm/java-11-oracle -y
sudo apt-get purge git -y
sudo apt-get update
sudo apt-get install git
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
docker pull openjdk
sudo apt install default-jre -y
sudo apt install default-jdk -y
git clone https://github.com/Luiz-Gustavo-Silva/Kangaroo-SO.git
cd Kangaroo-SO
cd Java
cd Kangaroo
cd target
java -jar Kangaroo-1.0-SNAPSHOT-jar-with-dependencies.jar