#!/bin/bash --login

cd /vagrant

sudo -E apt-get install build-essential -y
sudo -E apt-get install git -y

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo -E apt-get install nodejs -y

#https://docs.npmjs.com/getting-started/fixing-npm-permissions
mkdir /home/vagrant/npm-global
npm config set prefix '/home/vagrant/npm-global'
echo "export PATH=/home/vagrant/npm-global/bin:$PATH" >> /home/vagrant/.profile
source /home/vagrant/.profile

sudo npm install -g bower -–no-bin-links

#wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh

echo "cd /vagrant" >> /home/vagrant/.bashrc
