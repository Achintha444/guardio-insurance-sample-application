function consoleLogInfo(title,message){
    console.log(`\n INFO : ${title} : ${JSON.stringify(message,null,'\t')}`);
}

function consoleLogDebug(title,message){
    console.log(`\n DEBUG : ${title} : ${JSON.stringify(message,null,'\t')}`);
}

function consoleLogError(title,message){
    console.log(`\n ERROR : ${title} : ${JSON.stringify(message,null,'\t')}`);
}

function stringIsEmpty(str){
    return (str === "");
}

module.exports = { consoleLogInfo, consoleLogDebug, consoleLogError, stringIsEmpty  };