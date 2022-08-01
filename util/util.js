function consoleLogInfo(title,message){
    console.log(`\n INFO : ${title} : ${JSON.stringify(message)}`);
}

function consoleLogDebug(title,message){
    console.log(`\n DEBUG : ${title} : ${JSON.stringify(message)}`);
}

function consoleLogError(title,message){
    console.log(`\n ERROR : ${title} : ${JSON.stringify(message)}`);
}

module.exports = { consoleLogInfo, consoleLogDebug, consoleLogError  };