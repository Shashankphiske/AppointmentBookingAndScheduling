interface activity {
    log (message : any) : void;
}

class logActivityClass implements activity {
    log ( message : any) {
        console.log(`Activity Log : ${message}`);
    }
}

class logErrorClass implements activity {
    log (message : any) {
        console.log(`Error Log : ${message}`);
    }
}

export { logErrorClass, logActivityClass };