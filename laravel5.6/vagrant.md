vagrant
=======


# box
* vagrant box list

* vagrant box add box.json

```json
{
    "name": "devserver",
    "versions": [{
        "version": "5.2.0",
        "providers": [{
            "name": "virtualbox",
            "url": "file:///Users/xudong7930/.vagrant.d/tmp/virtualbox_520.box"
        }]
    }]
}
```

* vagrant box remove "devserver"

# global-status
vagrant global-status
vagrant global-status --prune # clean issue vm

