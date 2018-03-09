# Deploy virtual box environment with vagrant

## Prerequirements

- VirtualBox (v5.1)
- Vagrant (v1.9.x)
- Ansible (Latest version)

### Installation on Linux

```bash
# Virtual Box
yum install VirtualBox-5.1
# Vagrant
wget https://releases.hashicorp.com/vagrant/1.9.7/vagrant_1.9.7_x86_64.rpm?_ga=2.84851217.96389612.1501508263-357158161.1501087142
yum install vagrant_1.9.7_x86_64.rpm
# Ansible
yum install ansible
```

### Installation on Mac OSX

```bash
brew install virtualbox
brew install vagrant
brew install ansible
```

### Getting ready

```bash
git clone git@depot.ielab.usherbrooke.ca:ielab/coleo-vagrant.git
# If you haven't set your own SSH key
git clone https://YOUR_CIP@depot.ielab.usherbrooke.ca/ielab/coleo-vagrant.git

cd coleo-vagrant/staging
vagrant up --provision
# Ansible will ask the password to desencrypt ./vars/secret.yml
# Then Ansible runs the procedure to setup the VM's environment, install dependencies, pull the apps from gitlab.
```


## Connect to the VM

```bash
vagrant ssh

# The apps are running at the location /var/coleo/ which belongs to the user: coleo
# To monitor the apps (logs, status etc.)
sudo su - coleo
ls -la
pm2 status
pm2 logs
pm2 monit

# see other pm2 command line: http://pm2.keymetrics.io/docs/usage/quick-start/#cheat-sheet
# logs from nginx at /var/log/nginx

## Connect to postgreSQL as postgres user
sudo su - postgres
psql -d coleo_dev

```

## The Single Page Application

Open the SAP at `http://localhost:8080/portal`

# Log in (nothing sensitive here)

- user: s.vissault@yahoo.for
- pwd: 2bchanged

