function Interface () {
    this.push = function () {};
    this.pop = function () {};
    this.unshift = function() {};
    this.shift = function() {};
    this.toString = function () {};
    this.clearList = function () {};
    this.sort = function () {};
    this.size = function () {};

}


function ARRList() {
    Interface.call(this);
    this.toLinkedList = function () {} ;
    this.collection = [];
    this.length = 0;
}

function LINKList() {
    this.root = {
        head : null,
        tail : null,
        length :0,
    };
    this.createNode = function(){};
    Interface.call(this);
    this.toArrayList = function () {} ;
}

const arrayList = new ARRList();

arrayList.size = function (){
    if(arguments.length > 0) return false;
    return this.length;
};

arrayList.clearList = function () {
    this.length = 0;
    this.collection = [];
};

arrayList.push = function (el) {
    if(arguments.length !== 1) return false;
    this.collection[this.length] = el;
    this.length+=1;
};

arrayList.pop = function () {
    if(arguments.length > 0 || this.size() === 0) return false;
    let interimArray = [];
    for(let i = 0; i < this.length - 1; i++){
        interimArray[i] = this.collection[i];
    }
    this.collection = interimArray;
    this.length-=1;
};

arrayList.unshift = function (el) {
    if(arguments.length !== 1) return false;
    let interimArray = [];

    for (let i = 0; i < this.length; i++){
        interimArray[i+1] = interimArray[i];

    }
    this.collection = interimArray;
    this.collection[0] = el;
    this.length+=1;
};

arrayList.shift = function () {
    if(arguments.length > 0 || this.size() === 0) return false;
    let interimArray = [];

    for (let i = 1; i < this.length; i++){
        interimArray[i-1] = this.collection[i];

    }
    this.collection = interimArray;
    this.length-=1;
    return this.collection;
};

arrayList.toString = function () {
    let tmpString = '';
    for(let i = 0; i < this.size(); i++){
        tmpString += this.collection[i] + ',';
    }
    tmpString = tmpString.substring(0, tmpString.length - 1);

    return tmpString
};

this.sort = function (compare) {
    if (compare) {
        if (typeof compare == "function") {
            for (let i = 0; i < this.size(); i++) {
                for (let j = 0; j < this.size(); j++) {
                    if (j === this.size() - 1)
                        break;
                    if (compare(this.collection[j], this.collection[j + 1]) > 0) {
                        let tmp = this.collection[j + 1];
                        this.collection[j + 1] = this.collection[j];
                        this.collection[j] = tmp;
                    }
                }
            }
        }
        else {
            return false
        }
    }
    else {
        for (let i = 0; i < this.size(); i++) {
            for (let j = 0; j < this.size(); j++) {
                if (j === this.size() - 1)
                    break;
                if (String(this.collection[j]) > String(this.collection[j + 1])) {
                    let tmp = this.collection[j + 1];
                    this.collection[j + 1] = this.collection[j];
                    this.collection[j] = tmp;
                }
            }
        }
    }
};

arrayList.toLinkedList = function () {
    if(arguments.length > 0) return false
    if(!this[0]) return false
    let tmpLList = {
        root: {
            head: null,
            tail: null,
        }
    };

    function createTmpNode(el) {
        return {
            data: el ? el : null,
            prev : null,
            next: null,
        };
    };

    for(let i = 0; i < arrayList.size(); i++){
        let node =  createTmpNode(arrayList.collection[i]);
        if(!tmpLList.root.head){
            tmpLList.root.head = node;
            tmpLList.root.tail = node;
        }else{
            node.prev = tmpLList.root.tail;
            tmpLList.root.tail.next = node;
            tmpLList.root.tail = node;
            node.next = tmpLList.root;
        }
    }
    return tmpLList
};




const linkedList = new LINKList();

linkedList.clearList = function(){
    this.root = {
        head: null,
        tail: null,
        length: 0,
    }
}
linkedList.createNode = function (el) {
    return {
        data: el ? el : null,
        prev : null,
        next: null,
    };
};

linkedList.size = function () {
    if(arguments.length > 0) return false;
    return this.root.length;
};

linkedList.push = function (el) {
    if(arguments.length !== 1) return false;
    let node =  this.createNode(el);

    if(!this.root.head){
        this.root.head = node;
        this.root.tail = node;
    }else{
        node.prev = this.root.tail;
        this.root.tail.next = node;
        this.root.tail = node;
        node.next = this.root;
    }
    this.root.length++;
};
linkedList.pop = function () {
    if(arguments.length > 0 || this.root.head === null) return false;
    this.root.tail.prev.next = this.root;
    this.root.length--;
};

linkedList.unshift = function (el){
    if(arguments.length > 1 || arguments.length < 1) return false;
    let node = this.createNode(el);

    if(!this.root.head){
        this.root.head = node;
        this.root.tail = node;
    }else{
        node.prev = this.root;
        this.root.head.prev = node;
        node.next = this.root.head;
        this.root.head = node;
        this.root.tail.next = this.root;
    }
    this.root.length++
};

linkedList.shift = function(){
    if(arguments.length > 0 ) return false;
    if(this.root.head === null) return false;
    let tmpList = this.root.head.next;
    this.root.head = tmpList;
    this.root.length--;
};

linkedList.toString = function(){
    if(arguments.length > 0) return false;
    let tmpString = '';
    let tmpNoda = this.root.head;
    while(tmpNoda.next !== this.root){
        tmpString += tmpNoda.data + ',';
        tmpNoda = tmpNoda.next;
    }

    tmpString = tmpString.substring(0, tmpString.length - 1);

    return tmpString
};

linkedList.sort = function(compare){
    if (compare) {
        if (typeof compare == "function") {

            for (let i = 0; i < this.root.length; i++) {

                let tmpNoda = this.root.head;
                for (let j = 0; j < this.root.length; j++) {

                    if (tmpNoda.next === null) break;
                    if (compare(tmpNoda.data, tmpNoda.next.data) > 0) {
                        let tmp = tmpNoda.data;
                        tmpNoda.data = tmpNoda.next.data;
                        tmpNoda.next.data = tmp;
                    }
                    tmpNoda = tmpNoda.next;
                }
            }
        }
        else {
            return false
        }
    } else {
        for (let i = 0; i < this.root.length; i++) {
            let tmpNoda = this.root.head;

            for (let j = 0; j < this.root.length; j++) {

                if (tmpNoda.next === null) break;
                if (String(tmpNoda.data) > String(tmpNoda.next.data)) {
                    let tmp = tmpNoda.data;
                    tmpNoda.data = tmpNoda.next.data;
                    tmpNoda.next.data = tmp;
                }

                tmpNoda = tmpNoda.next
            }
        }
    }
};

linkedList.toArrayList = function(){
    if (arguments.length > 0) return false;
    if(this.root.head === null) return false;
    let node = this.root.head;
    let tmpArray = [];
    let i = 0;
    while(node.next !== this.root){
        tmpArray[i] = node.data;
        node = node.next;
        i++;
    }

    return tmpArray;
};





