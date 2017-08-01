## Making mangal as portable applications

### Purpose

Launching Mangal applications might be difficult as these required

#### Install virtualization tools

```bash
# Virtual Box
yum install VirtualBox-5.1
# Vagrant
wget https://releases.hashicorp.com/vagrant/1.9.7/vagrant_1.9.7_x86_64.rpm?_ga=2.84851217.96389612.1501508263-357158161.1501087142
yum install vagrant_1.9.7_x86_64.rpm
```

#### Getting started

```bash
git clone https://github.com/mangal-wg/mangal-vagrant.git
cd mangal-vagrant/backend
vagrant up
```

Three command lines to deploy the entire stack: install and configure an Ubuntu 16.04 virtual machine with postgresql, postgis, nodeJS, pm2, nginx and the mangal apps (orcid-oauth2 and mangal-api).
