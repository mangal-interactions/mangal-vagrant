# Deploy virtual box environment with vagrant

# Install

### Prerequirements

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

# Getting ready on `dev`

### Clone the mangal-vagrant repo and associated apps

```bash
git clone --recursive git@github.com:mangal-wg/mangal-vagrant.git
# If you haven't set your own SSH key
git clone --recursive https://github.com/mangal-wg/mangal-vagrant.git
cd coleo-vagrant/dev
```


### Launch the Vm

```
vagrant up --provision
# Ansible will ask the password to desencrypt ./vars/secret.yml
# Then Ansible runs the procedure to setup the VM's environment, install dependencies, pull the apps from gitlab.
vagrant ssh # Reach the vm
```

## Monitoring the load with `pm2`

```bash
# The apps are running at the location /var/mangal/ which belongs to the user: mangal
# To monitor the apps (logs, status etc.)
sudo su - mangal
ls -la
pm2 status
pm2 logs
pm2 monit

# see other pm2 command line: http://pm2.keymetrics.io/docs/usage/quick-start/#cheat-sheet
# logs from nginx at /var/log/nginx
```

### Accessing the database

```bash
vagrant ssh

## Connect to postgreSQL as postgres user
sudo su - postgres
psql -d mangal_dev
```

### Debug - console

If you want to have direct access to the logs for each apps with `nodemon` using `tmux`:

```bash
vagrant ssh
mux
```

# Deploy `staging`

The app will be deploy on the server directly from your computer
Make sure you install ansible on your own computer, then run the following command lines.



### Testing deployment

You can test the deployment script locally before sending it to the staging server.

```bash
git clone --recursive git@github.com:mangal-wg/mangal-vagrant.git
cd mangal-vagrant/staging
vagrant up --provision
```
