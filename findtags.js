/* Author:  koro
 * Version: 1.0
 * LastUpdate: 2010/10/14
 * URL: Azrael (http://zafiel.wingall.com/archives/2010101416301480.php)
 * Twitter: @wg_koro
 */
function findTags(){
    this.obj = document;
    this.html = '';
    this.searchArray = [];
}
findTags.prototype = {
    elem:function(obj){
        if(obj){
            this.obj = obj;
        }
        else{
            this.obj = document;
        }
        return this;
    },

    getClassName:function(o){
        var name;
        try{
            if(window.ActiveXObject){
                if(window.XDomainRequest){
                    name = o.getAttribute('class');
                }
                else{
                    name = o.getAttribute('className');
                }
            }
            else{
                name = o.getAttribute('class');
            }
            return name;
        }
        catch(e){
            return false;
        }
    },

    hCount:function(hash){
       var cnt = 0;
       for(a in hash){
               cnt++;
       }
       return cnt;
    },

    findAllObject:function(obj, tag, attr, solo){
        var str = '';
        var results = new Array();
        try{
            var tags = obj.getElementsByTagName(tag);
            var cnt = tags.length;
            if(cnt == 0){
                if(solo){
                    return false;
                }
                else{
                    return results;
                }
            }

            var hcnt = this.hCount(attr);
            for(var i=0;i<cnt;i++){
                if(hcnt > 0){
                    // Attribute Check
                    for(at in attr){
                        var val = false;
                        if(at == 'class'){
                            val = this.getClassName(tags[i]);
                            str = str + ',' + val;
                        }else{
                            val = tags[i].getAttribute(at);
                        }

                        if(val){
                            if(val == attr[at]){
                                val = true;
                                continue;
                            }else{
                                val = false;
                                break;
                            }
                        }else{
                            break;
                        }
                    }

                    if(val){    // All matched
                        results.push(tags[i]);
                        if(solo){
                            return tags[i];
                        }
                    }
                }
                // No HashPatterns
                else{
                    results.push(tags[i]);
                    if(solo){
                        return tags[i];
                    }
                }
            }
            //alert(str);
            if(solo && results.length==0){
                return false;
            }
            return results;

        }catch(e){
            if(solo){
                return false;
            }
            else{
                return results;
            }
        }
    },

    docfind:function(tag, attr){
        var obj = document;
        var result = this.findAllObject(obj, tag, attr, true);
        if(result){
            this.obj = result;
            this.html = result;
        }
        else{
            this.obj = false;
            this.html = false;
        }
        return this;
    },

    find:function(tag, attr){
        if(this.obj){
            var obj = this.obj;
            var result = this.findAllObject(obj, tag, attr, true);
            if(result){
                this.obj = result;
                this.html = result;
            }
            else{
                this.obj = false;
                this.html = false;
            }
        }
        else{
            this.obj = false;
            this.html = false;
        }
        return this;
    },

    docfindAll:function(tag, attr){
        var obj = document;
        var result = this.findAllObject(obj, tag, attr, false);
        this.html = result;
        return this;
    },

    findAll:function(tag, attr){
        if(this.obj){
            var obj = this.obj;
            var result = this.findAllObject(obj, tag, attr, false);
            this.html = result;
        }
        else{
            var result = new Array();
            this.html = result;
        }
        return this;
    }
}
