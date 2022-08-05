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

const LOADING_DISPLAY_NONE = {
    display: "none"
};
const LOADING_DISPLAY_BLOCK = {
    display: "block"
};


module.exports = { consoleLogInfo, consoleLogDebug, consoleLogError, stringIsEmpty, LOADING_DISPLAY_NONE, LOADING_DISPLAY_BLOCK  };